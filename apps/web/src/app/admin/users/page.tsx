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
		<div className="mx-auto max-w-7xl px-5">
			<div className="mb-5 flex w-full justify-between">
				<div className="flex flex-col items-start justify-start">
					<h2 className="text-3xl font-bold tracking-tight">Users</h2>
					<p className="text-sm text-muted-foreground">
						Total Users: {userData.length}
					</p>
				</div>
				<div className="flex items-center justify-end">
					<a download href="/api/admin/export">
						<Button className="flex gap-x-1">
							<FolderInput />
							<span>Export</span>
						</Button>
					</a>
				</div>
			</div>
			<div className="w-full rounded-sm p-4">
				<DataTable columns={columns} data={userData} />
			</div>
			<div className="flex w-full min-w-0 justify-center">
				<div className="w-full min-w-0 overflow-x-auto"></div>
			</div>
		</div>
	);
}

export const revalidate = 10;
