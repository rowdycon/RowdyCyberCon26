import { db } from "..";
import { scans, userCommonData } from "../schema";
import { sql } from "drizzle-orm";

export async function getUsersWithPoints() {
	return await await db
		.select({
			userId: scans.userID,
			firstName: userCommonData.firstName,
			lastName: userCommonData.lastName,
			points: sql<number>`SUM(${scans.count})`,
		})
		.from(scans)
		.innerJoin(
			userCommonData,
			sql`${scans.userID} = ${userCommonData.clerkID}`,
		)
		.groupBy(
			scans.userID,
			userCommonData.firstName,
			userCommonData.lastName,
		);
}
