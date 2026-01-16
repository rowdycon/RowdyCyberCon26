import Image from "next/image";
import { Button } from "@/components/shadcn/ui/button";
import { Badge } from "@/components/shadcn/ui/badge";
import { Info, CalendarCheck } from "lucide-react";
import Link from "next/link";
import UpdateRoleDialog from "@/components/admin/users/UpdateRoleDialog";
import {
	AccountInfo,
	PersonalInfo,
	ProfileInfo,
} from "@/components/admin/users/ServerSections";
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from "@/components/shadcn/ui/dropdown-menu";
import { notFound } from "next/navigation";
import { userHasPermission } from "@/lib/utils/server/admin";
import ApproveUserButton from "@/components/admin/users/ApproveUserButton";
import c from "config";
import { getHacker, getUser } from "db/functions";
import BanUserDialog from "@/components/admin/users/BanUserDialog";
import { db, eq } from "db";
import { bannedUsers } from "db/schema";
import RemoveUserBanDialog from "@/components/admin/users/RemoveUserBanDialog";
import { PermissionType } from "@/lib/constants/permission";
import Restricted from "@/components/Restricted";
import { getCurrentUser } from "@/lib/utils/server/user";

export default async function Page({ params }: { params: { slug: string } }) {
	const admin = await getCurrentUser();
	if (!userHasPermission(admin, PermissionType.VIEW_USERS)) return notFound();

	const subject = await getHacker(params.slug);

	if (!subject) {
		return <p className="text-center font-bold">User Not Found</p>;
	}

	const roles = await db.query.roles.findMany({
		columns: { id: true, name: true },
	});

	const banInstance = await db.query.bannedUsers.findFirst({
		where: eq(bannedUsers.userID, subject.clerkID),
	});

	return (
		<main className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6 lg:px-8">
			{!!banInstance && (
				<div className="sticky top-0 z-50 -mx-4 mb-4 w-screen bg-destructive p-3 text-center text-sm sm:-mx-6 sm:w-auto sm:rounded-md lg:-mx-8">
					<strong>This user has been suspended:</strong>{" "}
					{banInstance.reason}
				</div>
			)}

			<div className="mb-6 grid w-full grid-cols-1 gap-4 sm:mb-8 lg:grid-cols-3">
				{/* Title */}
				<div className="flex items-center justify-center sm:justify-start">
					<h2 className="flex items-center gap-x-2 text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
						<Info className="h-5 w-5 sm:h-6 sm:w-6" />
						User Info
					</h2>
				</div>

				{/* Desktop Actions */}
				<div className="hidden items-center justify-evenly gap-x-2 lg:col-span-2 lg:flex">
					<Link
						href={`/@${subject.hackerTag}`}
						target="_blank"
						className="w-full"
					>
						<Button variant="outline" size="sm" className="w-full">
							Hacker Profile
						</Button>
					</Link>

					<Link href={`mailto:${subject.email}`} className="w-full">
						<Button variant="outline" size="sm" className="w-full">
							Email Hacker
						</Button>
					</Link>

					<Restricted
						user={admin}
						permissions={PermissionType.CHANGE_USER_ROLES}
						targetRolePosition={subject.role.position}
						position="higher"
					>
						<UpdateRoleDialog
							name={`${subject.firstName} ${subject.lastName}`}
							currentRoleId={subject.role_id}
							userID={subject.clerkID}
							roles={roles}
						/>
					</Restricted>

					<Restricted
						user={admin}
						permissions={PermissionType.BAN_USERS}
						targetRolePosition={subject.role.position}
						position="higher"
					>
						{!!banInstance ? (
							<RemoveUserBanDialog
								name={`${subject.firstName} ${subject.lastName}`}
								reason={banInstance.reason!}
								userID={subject.clerkID}
							/>
						) : (
							<BanUserDialog
								name={`${subject.firstName} ${subject.lastName}`}
								userID={subject.clerkID}
							/>
						)}
					</Restricted>

					{(c.featureFlags.core.requireUsersApproval as boolean) && (
						<ApproveUserButton
							userIDToUpdate={subject.clerkID}
							currentApproval={subject.isApproved}
						/>
					)}
				</div>

				{/* Tablet Actions - Horizontal Buttons */}
				<div className="hidden grid-cols-2 gap-2 sm:grid lg:hidden">
					<Link
						href={`/@${subject.hackerTag}`}
						target="_blank"
						className="w-full"
					>
						<Button variant="outline" size="sm" className="w-full">
							Hacker Profile
						</Button>
					</Link>

					<Link href={`mailto:${subject.email}`} className="w-full">
						<Button variant="outline" size="sm" className="w-full">
							Email Hacker
						</Button>
					</Link>

					<Restricted
						user={admin}
						permissions={PermissionType.CHANGE_USER_ROLES}
						targetRolePosition={subject.role.position}
						position="higher"
					>
						<UpdateRoleDialog
							name={`${subject.firstName} ${subject.lastName}`}
							currentRoleId={subject.role_id}
							userID={subject.clerkID}
							roles={roles}
						/>
					</Restricted>

					<Restricted
						user={admin}
						permissions={PermissionType.BAN_USERS}
						targetRolePosition={subject.role.position}
						position="higher"
					>
						{!!banInstance ? (
							<RemoveUserBanDialog
								name={`${subject.firstName} ${subject.lastName}`}
								reason={banInstance.reason!}
								userID={subject.clerkID}
							/>
						) : (
							<BanUserDialog
								name={`${subject.firstName} ${subject.lastName}`}
								userID={subject.clerkID}
							/>
						)}
					</Restricted>

					{(c.featureFlags.core.requireUsersApproval as boolean) && (
						<div className="col-span-2">
							<ApproveUserButton
								userIDToUpdate={subject.clerkID}
								currentApproval={subject.isApproved}
							/>
						</div>
					)}
				</div>

				{/* Mobile Actions */}
				<div className="flex flex-col gap-2 sm:hidden">
					<div className="flex gap-2">
						<Link
							href={`/@${subject.hackerTag}`}
							target="_blank"
							className="flex-1"
						>
							<Button
								variant="outline"
								size="sm"
								className="w-full"
							>
								Profile
							</Button>
						</Link>

						<Link
							href={`mailto:${subject.email}`}
							className="flex-1"
						>
							<Button
								variant="outline"
								size="sm"
								className="w-full"
							>
								Email
							</Button>
						</Link>
					</div>

					<div className="flex gap-2">
						<Restricted
							user={admin}
							permissions={PermissionType.CHANGE_USER_ROLES}
							targetRolePosition={subject.role.position}
							position="higher"
						>
							<UpdateRoleDialog
								name={`${subject.firstName} ${subject.lastName}`}
								currentRoleId={subject.role_id}
								userID={subject.clerkID}
								roles={roles}
							/>
						</Restricted>

						<Restricted
							user={admin}
							permissions={PermissionType.BAN_USERS}
							targetRolePosition={subject.role.position}
							position="higher"
						>
							{!!banInstance ? (
								<RemoveUserBanDialog
									name={`${subject.firstName} ${subject.lastName}`}
									reason={banInstance.reason!}
									userID={subject.clerkID}
								/>
							) : (
								<BanUserDialog
									name={`${subject.firstName} ${subject.lastName}`}
									userID={subject.clerkID}
								/>
							)}
						</Restricted>

						{(c.featureFlags.core
							.requireUsersApproval as boolean) && (
							<ApproveUserButton
								userIDToUpdate={subject.clerkID}
								currentApproval={subject.isApproved}
							/>
						)}
					</div>
				</div>
			</div>

			<div className="mt-6 grid w-full grid-cols-1 gap-6 sm:mt-8 sm:gap-8 lg:grid-cols-3">
				{/* Sidebar */}
				<div className="flex flex-col items-center lg:items-start">
					<div className="relative aspect-square w-32 overflow-hidden rounded-full sm:w-40 lg:w-full lg:max-w-[220px]">
						<Image
							className="object-cover"
							fill
							src={subject.profilePhoto}
							alt={`Profile Photo for ${subject.firstName} ${subject.lastName}`}
						/>
					</div>

					<h1 className="mt-4 text-center text-xl font-semibold sm:text-2xl lg:text-left lg:text-3xl">
						{subject.firstName} {subject.lastName}
					</h1>

					<h2 className="text-center font-mono text-sm text-muted-foreground sm:text-base lg:text-left">
						@{subject.hackerTag}
					</h2>

					<div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
						<Badge className="text-xs sm:text-sm">
							Joined{" "}
							{subject.signupTime
								.toDateString()
								.split(" ")
								.slice(1)
								.join(" ")}
						</Badge>

						{subject.isRSVPed && (
							<Badge className="bg-gradient-to-r from-teal-400 to-blue-500 text-xs sm:text-sm">
								<CalendarCheck className="mr-1 h-3 w-3" />
								RSVP
							</Badge>
						)}
					</div>
				</div>

				{/* Content */}
				<div className="space-y-4 overflow-x-hidden sm:space-y-6 lg:col-span-2">
					<PersonalInfo user={subject} />
					<ProfileInfo user={subject} />
					<AccountInfo user={subject} />
				</div>
			</div>
		</main>
	);
}
