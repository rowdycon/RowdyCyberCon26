import { getLocalTimeZone } from "@internationalized/date";
import ScheduleTimeline from "../dash/schedule/schedule-timeline";
import { getAllEvents } from "db/functions";

export default async function Page() {
	const sched = await getAllEvents();
	const userTimeZone = getLocalTimeZone();

	return (
		<div className="mt-10 space-y-6 px-4 sm:px-6">
			<h1 className="mx-auto max-w-6xl text-center text-3xl font-black sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
				Schedule
			</h1>

			<ScheduleTimeline schedule={sched} timezone={userTimeZone} />
		</div>
	);
}

export const revalidate = 60;
