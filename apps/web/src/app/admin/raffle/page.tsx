"use server";

import { getUsersWithPoints } from "db/functions";
import { userHasPermission } from "@/lib/utils/server/admin";
import { PermissionType } from "@/lib/constants/permission";
import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/utils/server/user";
import { RaffleClient } from "@/components/admin/RaffleClient";

export default async function Page() {
	const user = await getCurrentUser();

	if (!userHasPermission(user, PermissionType.VIEW_RAFFLE)) {
		return notFound();
	}

	const usersWithPoints = await getUsersWithPoints();

	return <RaffleClient participants={usersWithPoints} />;
}
