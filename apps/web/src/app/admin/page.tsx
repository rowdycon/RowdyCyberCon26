import { headers } from "next/headers";
import { Overview } from "@/components/admin/landing/Overview";
import {
	Card,
	CardHeader,
	CardContent,
	CardTitle,
	CardDescription,
} from "@/components/shadcn/ui/card";
import { Users, UserCheck, User2, TimerReset, MailCheck } from "lucide-react";
import type { User } from "db/types";
import { getAllUsers } from "db/functions";
import Link from "next/link";
import { formatInTimeZone } from "date-fns-tz";
import { getClientTimeZone } from "@/lib/utils/client/shared";
import { getCurrentUser } from "@/lib/utils/server/user";

export default async function Page() {
	const adminUser = await getCurrentUser();

	const allUsers = (await getAllUsers()) ?? [];

	const {
		rsvpCount,
		checkinCount,
		recentSignupCount,
		recentRegisteredUsers,
	} = getRecentRegistrationData(allUsers);

	const requestHeaders = headers();
	const vercelTimezone = requestHeaders.get("x-vercel-ip-timezone");
	const timezone = getClientTimeZone(vercelTimezone ?? "UTC");

	return (
		<div className="mx-auto w-full max-w-7xl px-4">
			<div className="w-full">
				<h2 className="text-lg font-bold md:text-xl">Welcome,</h2>
				<h1 className="text-3xl font-black text-hackathon md:text-4xl lg:text-5xl">
					{adminUser.firstName}
				</h1>
			</div>

			{/* Stats Grid - Responsive: 1 col mobile, 2 cols tablet, 4 cols desktop */}
			<div className="grid grid-cols-1 gap-4 pt-6 sm:grid-cols-2 md:pt-8 lg:grid-cols-4 lg:pt-10">
				<Card className="bg-panel">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Registrations
						</CardTitle>
						<User2 className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{allUsers.length}
						</div>
					</CardContent>
				</Card>
				<Card className="bg-panel">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Teams
						</CardTitle>
						<Users className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{0}</div>
					</CardContent>
				</Card>
				<Card className="bg-panel">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							RSVPs
						</CardTitle>
						<MailCheck className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{rsvpCount}</div>
					</CardContent>
				</Card>
				<Card className="bg-panel">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Check-ins
						</CardTitle>
						<UserCheck className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{checkinCount}</div>
					</CardContent>
				</Card>
			</div>

			{/* Chart and Recent Users - Responsive: 1 col mobile, 3 cols desktop */}
			<div className="grid grid-cols-1 gap-4 py-4 lg:grid-cols-3">
				<Card className="bg-panel lg:col-span-2">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<div>
							<CardTitle className="md:text-md text-base font-bold">
								Registrations
							</CardTitle>
							<CardDescription className="text-xs md:text-sm">
								{Object.values(recentSignupCount).reduce(
									(a, b) => a + b,
									0,
								)}{" "}
								new registrations have occurred in the past 7
								days.
							</CardDescription>
						</div>
						<User2 className="hidden h-4 w-4 text-muted-foreground sm:block" />
					</CardHeader>
					<CardContent>
						<Overview rawData={recentSignupCount} />
					</CardContent>
				</Card>
				<Card className="bg-panel">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<div>
							<CardTitle className="md:text-md text-base font-bold">
								Recent Registrations
							</CardTitle>
						</div>
						<TimerReset className="hidden h-4 w-4 text-muted-foreground sm:block" />
					</CardHeader>
					<CardContent>
						<div className="flex flex-col space-y-2">
							{recentRegisteredUsers.map((user) => (
								<div
									key={user.clerkID}
									className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between"
								>
									<Link
										href={`/admin/users/${user.clerkID}`}
										className="font-medium hover:underline"
									>
										{user.firstName} {user.lastName}
									</Link>
									<span className="text-xs text-gray-500 sm:text-sm">
										{formatInTimeZone(
											user.signupTime,
											timezone,
											"MMM dd h:mm a",
										)}
									</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

function getRecentRegistrationData(users: User[]) {
	type DateNumberMap = { [key: string]: number };

	let rsvpCount = 0;
	let checkinCount = 0;

	const recentRegisteredUsers: User[] = [];
	let recentRegisteredUsersCount = 0;
	let recentSignupCount: DateNumberMap = {};

	for (let i = 0; i < 7; i++) {
		// Create a new date object for each day
		const date = new Date();
		date.setDate(date.getDate() - i);

		// Format the date as YYYY-MM-DD
		const dateString = date.toISOString().split("T")[0];

		// Assign a default value, e.g., 0
		recentSignupCount[dateString] = 0;
	}

	for (const user of users) {
		if (user.isRSVPed) rsvpCount++;
		if (user.checkinTimestamp) checkinCount++;

		const stamp = user.signupTime.toISOString().split("T")[0];

		if (recentSignupCount[stamp] != undefined) {
			if (recentRegisteredUsersCount < 10) {
				recentRegisteredUsers.push(user);
				recentRegisteredUsersCount++;
			}
			recentSignupCount[stamp]++;
		}
	}

	return {
		rsvpCount,
		checkinCount,
		recentSignupCount,
		recentRegisteredUsers,
	};
}
