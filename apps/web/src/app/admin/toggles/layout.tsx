import ToggleItem from "@/components/admin/toggles/ToggleItem";
import Restricted from "@/components/Restricted";
import { PermissionType } from "@/lib/constants/permission";
import { userHasPermission } from "@/lib/utils/server/admin";
import { getCurrentUser } from "@/lib/utils/server/user";
import { notFound } from "next/navigation";
import { Separator } from "@/components/shadcn/ui/separator";

interface ToggleLayoutProps {
	children: React.ReactNode;
}

export default async function Layout({ children }: ToggleLayoutProps) {
	const user = await getCurrentUser();

	if (!userHasPermission(user, PermissionType.MANAGE_NAVLINKS))
		return notFound();

	return (
		<div className="mx-auto max-w-5xl px-3 py-4">
			<div className="flex flex-col gap-4 md:flex-row md:gap-6">
				{/* Sidebar */}
				<div className="flex gap-2 overflow-x-auto rounded-md border-card bg-panel p-3 md:w-56 md:flex-col md:overflow-visible md:p-4">
					<ToggleItem name="Toggles" path="/admin/toggles" />

					<Separator className="hidden bg-card md:block" />

					<ToggleItem
						name="Landing Page"
						path="/admin/toggles/landing"
					/>

					<Separator className="hidden bg-card md:block" />

					<Restricted
						permissions={[PermissionType.MANAGE_REGISTRATION]}
						user={user}
					>
						<ToggleItem
							name="Registration & RSVP"
							path="/admin/toggles/registration"
						/>
					</Restricted>
				</div>

				{/* Main content */}
				<div className="min-w-0 flex-1">{children}</div>
			</div>
		</div>
	);
}
