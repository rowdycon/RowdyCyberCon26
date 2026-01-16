import { Badge } from "@/components/shadcn/ui/badge";
import { type EventType as Event } from "@/lib/types/events";
import { cn } from "@/lib/utils/client/cn";
import c from "config";
import { formatInTimeZone } from "date-fns-tz";
import Link from "next/link";
import { Fragment } from "react";

type EventRowProps = { event: Event; userTimeZone: string };
type ScheduleTimelineProps = {
	schedule: Event[];
	timezone: string;
};

const daysOfWeek = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

function splitByDay(schedule: Event[]) {
	const days: Map<string, Event[]> = new Map<string, Event[]>();
	schedule.forEach((event) => {
		const day = daysOfWeek[event.startTime.getDay()];
		if (days.get(day)) {
			days.get(day)?.push(event);
		} else {
			days.set(day, [event]);
		}
	});
	return days;
}

export default function ScheduleTimeline({
	schedule,
	timezone,
}: ScheduleTimelineProps) {
	return (
		<div className="mx-auto mt-6 max-w-6xl overflow-x-auto">
			<table className="w-full border-collapse">
				<tbody>
					{Array.from(splitByDay(schedule).entries()).map(
						([dayName, arr], idx) => (
							<Fragment key={idx}>
								<tr key={dayName} className="align-middle">
									<td className="hidden sm:table-cell"></td>

									<td
										className="hidden w-1 sm:table-cell"
										style={{
											backgroundColor:
												"hsl(var(--secondary))",
										}}
									/>

									<td className="pb-4 pt-8">
										<h2 className="border-b pb-3 text-2xl font-black sm:ml-16 sm:text-4xl md:text-5xl">
											{dayName}
										</h2>
									</td>
								</tr>

								{arr.map((event) => (
									<EventRow
										key={event.id}
										event={event}
										userTimeZone={timezone}
									/>
								))}
							</Fragment>
						),
					)}
				</tbody>
			</table>
		</div>
	);
}

export function EventRow({ event, userTimeZone }: EventRowProps) {
	const startTimeFormatted = formatInTimeZone(
		event.startTime,
		userTimeZone,
		"hh:mm a",
	);

	const endTimeFormatted = formatInTimeZone(
		event.endTime,
		userTimeZone,
		"h:mm a",
	);

	const currentTime = new Date();
	const isLive = event.startTime < currentTime && event.endTime > currentTime;

	const href = `/schedule/${event.id}`;
	const color = (c.eventTypes as Record<string, string>)[event.type];

	return (
		<Link href={href} legacyBehavior>
			<tr className="group cursor-pointer border-b last:border-b-0 sm:border-none">
				{/* Time */}
				<td className="text-md hidden pr-4 text-right align-middle font-medium text-muted-foreground sm:table-cell">
					{startTimeFormatted}
					<span className="mx-0.5 opacity-60">-</span>
					{endTimeFormatted}
				</td>

				{/* Timeline dot */}
				<td
					className="relative hidden h-20 w-1 sm:table-cell"
					style={{
						background: `radial-gradient(circle, ${color} 0%, hsl(var(--secondary)) 99%)`,
					}}
				>
					<div
						className={cn(
							"absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full",
							isLive && "animate-pulse",
						)}
						style={{ backgroundColor: color }}
					/>
				</td>

				{/* Content */}
				<td className="py-4 sm:pl-8">
					<div className="space-y-1">
						{/* Mobile time */}
						<p className="text-sm font-medium text-muted-foreground sm:hidden">
							{startTimeFormatted}
							<span className="mx-0.5 opacity-60">-</span>
							{endTimeFormatted}
						</p>

						<div className="flex flex-wrap items-center gap-2 text-lg font-semibold sm:text-2xl">
							{event.title}
							<Badge
								variant="outline"
								className="text-xs"
								style={{ borderColor: color }}
							>
								{event.type}
							</Badge>
						</div>
					</div>
				</td>
			</tr>
		</Link>
	);
}
