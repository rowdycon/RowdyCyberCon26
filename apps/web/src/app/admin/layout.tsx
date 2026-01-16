import c from "config";
import Image from "next/image";
import Link from "next/link";
import DashNavItem from "@/components/dash/shared/DashNavItem";
import FullScreenMessage from "@/components/shared/FullScreenMessage";
import React, { Suspense } from "react";
import ClientToast from "@/components/shared/ClientToast";
import { isUserAdmin, userHasPermission } from "../../lib/utils/server/admin";
import { PermissionType } from "@/lib/constants/permission";
import { getCurrentUser } from "@/lib/utils/server/user";
import ProfileButton from "@/components/shared/ProfileButton";

interface AdminLayoutProps {
	children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
	const user = await getCurrentUser();

	if (!isUserAdmin(user)) {
		console.log("Denying admin access to user", user);
		return (
			<FullScreenMessage
				title="Access Denied"
				message="You are not an admin. If you belive this is a mistake, please contact a administrator."
			/>
		);
	}

	const adminNavItems = Object.entries(c.dashPaths.admin).filter(([name]) => {
		// Gate specific admin nav items by permission
		if (
			name === "Users" &&
			!userHasPermission(user, PermissionType.VIEW_USERS)
		)
			return false;
		if (
			name === "Events" &&
			!userHasPermission(user, PermissionType.VIEW_EVENTS)
		)
			return false;
		if (
			name === "Roles" &&
			!userHasPermission(user, PermissionType.VIEW_ROLES)
		)
			return false;
		if (
			name === "Toggles" &&
			!userHasPermission(user, PermissionType.MANAGE_NAVLINKS)
		)
			return false;
		return true;
	});

	return (
		<div className="max-w-[100vw]">
			<ClientToast duration={2500} position="top-right" />

			<div className="m-5 flex items-center justify-between">
				<Link
					href={"/"}
					className="mr-2 flex items-center gap-x-2 sm:mr-5"
				>
					<Image
						src={c.icon.svg}
						alt={c.hackathonName + " Logo"}
						width={32}
						height={32}
						className="h-6 w-6 sm:h-8 sm:w-8"
					/>
					<div className="h-[45%] w-[2px] rotate-[25deg] bg-muted-foreground" />
					<h2 className="text-sm font-bold tracking-tight sm:text-base">
						Admin
					</h2>
				</Link>
				<ProfileButton />
			</div>

			<div className="h-12 w-full max-w-[100vw] overflow-x-auto border-b border-b-border bg-background px-3 sm:px-5">
				<div className="flex items-center gap-x-1 sm:gap-x-2">
					{adminNavItems.map(([name, path]) => (
						<DashNavItem key={name} name={name} path={path} />
					))}
				</div>
			</div>

			<div className="mt-10 w-full md:mt-20">
				<Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
			</div>
		</div>
	);
}
