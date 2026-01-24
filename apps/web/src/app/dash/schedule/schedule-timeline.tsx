import { Badge } from "@/components/shadcn/ui/badge";
import { type EventType as Event } from "@/lib/types/events";
import { cn } from "@/lib/utils/client/cn";
import c from "config";
import { formatInTimeZone } from "date-fns-tz";
import Link from "next/link";
import { Fragment, ReactNode } from "react";

const daysOfWeek = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

type ScheduleTimelineProps = {
	schedule: Event[];
	timezone: string;
};

export default function ScheduleTimeline({
	schedule,
	timezone,
}: ScheduleTimelineProps) {
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

	return (
		<div className="mx-auto mt-5 w-3/4 justify-center">
			<table className="w-full md:flex md:flex-col md:items-center md:justify-center">
				<tbody>
					{Array.from(splitByDay(schedule).entries()).map(
						([dayName, arr]): ReactNode => (
							<Fragment key={dayName + " title"}>
								<tr className="py-8">
									<td className="hidden md:block"></td>
									<td
										className="w-1"
										style={{
											background: `radial-gradient(circle, hsl(var(--background)) 0%, hsl(var(--secondary)) 90%)`,
											backgroundColor: `hsl(var(--secondary))`,
										}}
									></td>
									<td>
										<h2 className="w-7/8 ms:w-full ml-16 border-b py-4 text-4xl font-black md:text-6xl">
											{dayName}
										</h2>
									</td>
								</tr>
								{arr?.map(
									(event): ReactNode => (
										<EventRow
											key={String(event.id)}
											event={event}
											userTimeZone={timezone}
										/>
									),
								)}
							</Fragment>
						),
					)}
				</tbody>
			</table>
		</div>
	);
}

type EventRowProps = { event: Event; userTimeZone: string };
export function EventRow({ event, userTimeZone }: EventRowProps) {
	const startTimeFormatted = formatInTimeZone(
		event.startTime,
		userTimeZone,
		"hh:mm a",
		{
			useAdditionalDayOfYearTokens: true,
		},
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
			<tr className="cursor-pointer text-center text-xl text-foreground">
				<td className="my-auto hidden h-20 flex-col justify-center pr-16 align-middle md:flex">
					<span>
						<span className="text-nowrap">{`${startTimeFormatted}`}</span>
						{" - "}
						<span className="text-nowrap">{`${endTimeFormatted}`}</span>
					</span>
				</td>
				<td
					className={"relative my-4 h-20 w-1 md:my-auto"}
					style={{
						background: `radial-gradient(circle, ${color} 0%, hsl(var(--secondary)) 99%)`,
						// backgroundColor: color,
					}}
				>
					{isLive ? (
						<div
							className={cn(
								"pulsatingDot absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full",
							)}
							style={{
								backgroundColor: color,
							}}
						/>
					) : (
						<div
							className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full"
							style={{
								backgroundColor: color,
							}}
						>
							<div className="absolute inset-1 h-2 w-2 rounded-full bg-background"></div>
						</div>
					)}
				</td>
				<td className="py-4 pl-16">
					<div className="flex flex-wrap items-center text-left">
						<div className="flex flex-shrink items-center gap-x-2 text-xl font-black sm:text-3xl sm:font-normal">
							{event.title}
							<Badge
								variant={"outline"}
								className="h-fit"
								style={{
									borderColor: color,
								}}
							>
								<p className="text-sm">{event.type}</p>
							</Badge>
						</div>
					</div>
					<p className="block text-left md:hidden">
						<span className="text-nowrap">{`${startTimeFormatted}`}</span>
						{" - "}
						<span className="text-nowrap">{`${endTimeFormatted}`}</span>
					</p>
				</td>
			</tr>
		</Link>
	);
}
