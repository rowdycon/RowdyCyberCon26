import c from "config";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/shadcn/ui/button";
import DashNavItem from "@/components/dash/shared/DashNavItem";
import FullScreenMessage from "@/components/shared/FullScreenMessage";
import ProfileButton from "@/components/shared/ProfileButton";
import React, { Suspense } from "react";
import ClientToast from "@/components/shared/ClientToast";
import { isUserAdmin, userHasPermission } from "../../lib/utils/server/admin";
import { PermissionType } from "@/lib/constants/permission";
import { getCurrentUser } from "@/lib/utils/server/user";
import { Menu } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetTrigger,
} from "@/components/shadcn/ui/sheet";

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
		<>
			<ClientToast duration={2500} position="top-right" />
			<div className="fixed z-20 grid h-16 w-full grid-cols-2 bg-nav px-3 sm:px-5">
				<div className="flex items-center gap-x-2 sm:gap-x-4">
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
				</div>
				<div className="hidden items-center justify-end gap-x-2 lg:flex lg:gap-x-4">
					<Link href={"/"}>
						<Button
							variant={"outline"}
							className="bg-nav hover:bg-background"
						>
							Home
						</Button>
					</Link>
					<Link href={c.links.guide}>
						<Button
							variant={"outline"}
							className="bg-nav hover:bg-background"
						>
							Survival Guide
						</Button>
					</Link>
					<Link href={c.links.discord}>
						<Button
							variant={"outline"}
							className="bg-nav hover:bg-background"
						>
							Discord
						</Button>
					</Link>
					<ProfileButton />
				</div>
				<div className="flex items-center justify-end gap-x-2 lg:hidden">
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="bg-nav hover:bg-background"
							>
								<Menu className="h-5 w-5" />
								<span className="sr-only">Toggle menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent
							side="right"
							className="w-64 bg-[#c0c0c0]"
						>
							<div className="flex flex-col gap-4 pt-8">
								<Link href={"/"}>
									<Button
										variant={"outline"}
										className="w-full justify-start"
									>
										Home
									</Button>
								</Link>
								<Link href={c.links.guide}>
									<Button
										variant={"outline"}
										className="w-full justify-start"
									>
										Survival Guide
									</Button>
								</Link>
								<Link href={c.links.discord}>
									<Button
										variant={"outline"}
										className="w-full justify-start"
									>
										Discord
									</Button>
								</Link>
								<div className="pt-4">
									<ProfileButton />
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
			<div className="fixed z-20 mt-16 flex h-12 w-full overflow-x-auto border-b border-b-border bg-nav px-3 sm:px-5">
				<div className="flex items-center gap-x-1 sm:gap-x-2">
					{adminNavItems.map(([name, path]) => (
						<DashNavItem key={name} name={name} path={path} />
					))}
				</div>
			</div>
			<Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
		</>
	);
}
