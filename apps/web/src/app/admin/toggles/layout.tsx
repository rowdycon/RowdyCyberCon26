import ToggleItem from "@/components/admin/toggles/ToggleItem";
import Restricted from "@/components/Restricted";
import { PermissionType } from "@/lib/constants/permission";
import { userHasPermission } from "@/lib/utils/server/admin";
import { getCurrentUser } from "@/lib/utils/server/user";
import { notFound } from "next/navigation";

interface ToggleLayoutProps {
	children: React.ReactNode;
}

export default async function Layout({ children }: ToggleLayoutProps) {
	const user = await getCurrentUser();

	if (!userHasPermission(user, PermissionType.MANAGE_NAVLINKS))
		return notFound();

	return (
		<div className="mx-3 flex max-w-5xl flex-col gap-4 px-4 md:mx-auto md:flex-row md:gap-x-6">
			{/* Sidebar */}
			<div className="flex shrink-0 flex-row gap-2 md:w-56 md:flex-col">
				<ToggleItem name="Toggles" path="/admin/toggles" />
				<ToggleItem name="Landing Page" path="/admin/toggles/landing" />

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
	);
}
