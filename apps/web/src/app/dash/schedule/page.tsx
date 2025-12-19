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
		<>
			<h1 className="mx-auto my-4 w-11/12 text-4xl font-black sm:my-6 sm:w-5/6 sm:text-5xl md:my-8 md:w-3/4 md:text-6xl lg:text-7xl xl:text-8xl">
				Schedule
			</h1>
			<ScheduleTimeline schedule={sched} timezone={userTimeZone} />
		</>
	);
}

export const revalidate = 60;
