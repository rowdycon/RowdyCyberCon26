import ScheduleTimeline from "./schedule-timeline";
import { getAllEvents } from "db/functions";
import { getClientTimeZone } from "@/lib/utils/client/shared";
import { headers } from "next/headers";

export default async function Page() {
	const requestHeaders = headers();
	const vercelTimezone = requestHeaders.get("x-vercel-ip-timezone");
	const sched = await getAllEvents();
	const userTimeZone = getClientTimeZone(vercelTimezone ?? "UTC");

	return (
		<div className="space-y-6 px-4 sm:px-6">
			<h1 className="mx-auto max-w-6xl text-3xl font-black sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
				Schedule
			</h1>

			<ScheduleTimeline schedule={sched} timezone={userTimeZone} />
		</div>
	);
}

export const revalidate = 60;
