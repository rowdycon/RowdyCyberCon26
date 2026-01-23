import c from "config";
import { Badge } from "@/components/shadcn/ui/badge";
import Balancer from "react-wrap-balancer";
import { formatInTimeZone } from "date-fns-tz";
import { Event } from "db/types";
import { getLocalTimeZone } from "@internationalized/date";

export default function EventFull({ event }: { event: Event }) {
	const userTimeZone = getLocalTimeZone();

	return (
		<div className="relative w-full overflow-x-hidden">
			<div
				className="absolute top-0 h-[30vh] max-h-[320px] w-full opacity-10 dark:opacity-50 sm:h-[40vh] sm:max-h-[400px]"
				style={{
					backgroundImage: `linear-gradient(180deg, ${
						(c.eventTypes as Record<string, string>)[event.type] ||
						c.eventTypes.Other
					}, transparent)`,
				}}
			/>

			<div className="relative z-10 mx-auto min-h-[calc(100vh-7rem)] w-full max-w-3xl px-4 pt-[12vh] sm:px-6 sm:pt-[14vh] lg:px-0">
				<div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1">
					<Badge
						className="text-xs sm:text-sm"
						variant="outline"
						style={{
							borderColor:
								(c.eventTypes as Record<string, string>)[
									event.type
								] || c.eventTypes.Other,
						}}
					>
						{event.type}
					</Badge>

					<p className="text-xs font-bold sm:text-sm">
						{`${formatInTimeZone(
							event.startTime,
							userTimeZone,
							"EEEE MMMM do",
						)}, ${formatInTimeZone(
							event.startTime,
							userTimeZone,
							"h:mm a",
						)} - ${formatInTimeZone(
							event.endTime,
							userTimeZone,
							"h:mm a",
						)}`}
					</p>
				</div>

				<h1 className="mb-3 text-4xl font-black leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
					<Balancer>{event.title}</Balancer>
				</h1>

				<h2 className="mb-12 text-base font-bold sm:mb-16 sm:text-lg">
					Hosted by {event.host}
				</h2>

				<h3 className="mb-2 text-sm font-bold sm:text-base">
					Location:{" "}
					<span className="font-normal">{event.location}</span>
				</h3>

				<h3 className="mb-2 text-sm font-bold sm:text-base">
					Description:
				</h3>
				<p className="text-sm leading-relaxed sm:text-base">
					<Balancer>{event.description}</Balancer>
				</p>
			</div>
		</div>
	);
}
