import c from "config";
import Image from "next/image";

import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import DashNavItem from "@/components/dash/shared/DashNavItem";
import { redirect } from "next/navigation";
import ClientToast from "@/components/shared/ClientToast";

import { TRPCReactProvider } from "@/trpc/react";
import { getUser } from "db/functions";
import ProfileButton from "@/components/shared/ProfileButton";

interface DashLayoutProps {
	children: React.ReactNode;
}

export default async function DashLayout({ children }: DashLayoutProps) {
	const clerkUser = await currentUser();

	if (!clerkUser || (await getUser(clerkUser.id)) == undefined) {
		return redirect("/register");
	}

	const user = await getUser(clerkUser.id);
	if (!user) return redirect("/register");

	if (
		(c.featureFlags.core.requireUsersApproval as boolean) === true &&
		user.isApproved === false
	) {
		return redirect("/i/approval");
	}

	return (
		<>
			<TRPCReactProvider>
				<ClientToast />
				<div className="m-5 flex items-center justify-between">
					<div className="flex items-center gap-x-4">
						<Link href="/">
							<Image
								src={c.icon.svg}
								alt={c.hackathonName + " Logo"}
								width={32}
								height={32}
							/>
						</Link>

						<div className="h-[45%] w-[2px] rotate-[25deg] bg-muted-foreground" />
						<h2 className="font-bold tracking-tight">Dashboard</h2>
					</div>
					<ProfileButton />
				</div>
				<div className="flex h-12 w-full border-b border-b-border bg-nav px-5">
					{Object.entries(c.dashPaths.dash).map(([name, path]) => (
						<DashNavItem key={name} name={name} path={path} />
					))}
				</div>
				<div className="mt-10">{children}</div>
			</TRPCReactProvider>
		</>
	);
}
