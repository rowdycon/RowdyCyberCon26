import { DataTable } from "@/components/admin/users/UserDataTable";
import { columns } from "@/components/admin/users/UserColumns";
import { Button } from "@/components/shadcn/ui/button";
import { FolderInput } from "lucide-react";
import { getAllUsers } from "db/functions";
import { notFound } from "next/navigation";
import { userHasPermission } from "@/lib/utils/server/admin";
import { PermissionType } from "@/lib/constants/permission";
import { getCurrentUser } from "@/lib/utils/server/user";

export default async function Page() {
	const user = await getCurrentUser();
	if (!userHasPermission(user, PermissionType.VIEW_USERS)) return notFound();

	const userData = await getAllUsers();

	return (
		<div className="mx-auto w-full max-w-7xl px-4 pt-32 sm:px-6 md:pt-40 lg:px-8">
			<div className="mb-4 sm:mb-6 lg:mb-8">
				<div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div className="flex items-center">
						<div>
							<h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
								Users
							</h2>
							<p className="mt-1 text-xs text-muted-foreground sm:text-sm">
								Total Users: {userData.length}
							</p>
						</div>
					</div>
					<div className="flex items-center">
						<a
							download
							href="/api/admin/export"
							className="w-full sm:w-auto"
						>
							<Button className="flex w-full gap-x-1.5 sm:w-auto sm:gap-x-2">
								<FolderInput className="h-4 w-4" />
								<span>Export</span>
							</Button>
						</a>
					</div>
				</div>
			</div>
			<div className="flex w-full justify-center">
				{userData && userData.length > 0 ? (
					<div className="w-full overflow-x-auto">
						<DataTable columns={columns} data={userData} />
					</div>
				) : (
					<div className="flex w-full items-center justify-center py-12">
						<h1 className="text-lg text-muted-foreground sm:text-xl">
							No Results :(
						</h1>
					</div>
				)}
			</div>
		</div>
	);
}

export const revalidate = 10;
