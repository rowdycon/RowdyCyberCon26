"use server";

import { volunteerAction } from "@/lib/safe-action";
import { z } from "zod";
import { db, sql } from "db";
import { scans, userCommonData, bannedUsers } from "db/schema";
import { eq, and } from "db/drizzle";
import { userHasPermission } from "@/lib/utils/server/admin";
import { PermissionType } from "@/lib/constants/permission";

export const createScan = volunteerAction
	.schema(
		z.object({
			eventID: z.number(),
			userID: z.string(),
			creationTime: z.date(),
			countToSet: z.number(),
		}),
	)
	.action(
		async ({
			parsedInput: { eventID, userID, creationTime, countToSet },
			ctx: { user, userId },
		}) => {
			await db.insert(scans).values({
				userID: userID,
				updatedAt: creationTime,
				count: countToSet,
				eventID: eventID,
			});

			return { success: true };
		},
	);
export const getScan = volunteerAction
	.schema(z.object({ eventID: z.number(), userID: z.string() }))
	.action(
		async ({
			parsedInput: { eventID, userID },
			ctx: { user, userId: adminUserID },
		}) => {
			if (!userHasPermission(user, PermissionType.CHECK_IN)) {
				throw new Error("You do not have permission to view scans.");
			}

			const scan = await db.query.scans.findFirst({
				where: and(
					eq(scans.eventID, eventID),
					eq(scans.userID, userID),
				),
			});
			return scan;
		},
	);

// Schema will be moved over when rewrite of the other scanner happens
const checkInUserSchema = z.object({
	userID: z.string(),
	QRTimestamp: z
		.number()
		.positive()
		.refine((timestamp) => {
			return Date.now() - timestamp < 5 * 60 * 1000;
		}, "QR Code has expired. Please tell user refresh the QR Code"),
});

export const checkInUserToHackathon = volunteerAction
	.schema(checkInUserSchema)
	.action(async ({ parsedInput: { userID }, ctx: { user } }) => {
		if (!userHasPermission(user, PermissionType.CHECK_IN)) {
			throw new Error("You do not have permission to check in users.");
		}

		// Set checkinTimestamp
		await db
			.update(userCommonData)
			.set({ checkinTimestamp: sql`(current_timestamp)` })
			.where(eq(userCommonData.clerkID, userID));
	});

export const isUserBanned = async (userId: string) => {
	const banInstance = await db.query.bannedUsers.findFirst({
		where: eq(bannedUsers.userID, userId),
	});
	return !!banInstance;
};
