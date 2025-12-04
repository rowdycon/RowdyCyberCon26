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
			<h1 className="mx-auto my-8 w-3/4 text-8xl font-black">Schedule</h1>
			<ScheduleTimeline schedule={sched} timezone={userTimeZone} />
		</>
	);
}

export const runtime = "edge";
export const revalidate = 60;
