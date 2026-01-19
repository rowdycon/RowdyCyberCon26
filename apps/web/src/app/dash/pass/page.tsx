import QRCode from "react-qr-code";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import c from "config";
import { format } from "date-fns";
import TiltWrapper from "@/components/dash/shared/TiltWrapper";
import { createQRpayload } from "@/lib/utils/shared/qr";
import {
	Drawer,
	DrawerContent,
	DrawerTrigger,
} from "@/components/shadcn/ui/drawer";
import { getHacker } from "db/functions";
import { Hacker } from "db/types";

interface EventPassProps {
	user: Hacker;
	clerk: NonNullable<Awaited<ReturnType<typeof currentUser>>>;
	qrPayload: string;
	guild: string;
}

export default async function Page() {
	const user = await currentUser();
	if (!user) return null;

	const userDbRecord = await getHacker(user.id);
	if (!userDbRecord) return null;

	const qrPayload = createQRpayload({
		userID: user.id,
		createdAt: new Date(),
	});
	const guild = Object.keys(c.groups)[userDbRecord.hackerData.group];

	return (
		<div className="flex min-h-[calc(100vh-7rem)] items-center justify-center px-4 py-12">
			{/* Floating Win98 icons background */}
			<div className="pointer-events-none fixed inset-0 opacity-5">
				{[...Array(20)].map((_, i) => (
					<div
						key={i}
						className="absolute animate-pulse"
						style={{
							left: `${(i * 13) % 100}%`,
							top: `${(i * 19) % 100}%`,
							fontSize: "32px",
							animationDelay: `${i * 0.2}s`,
						}}
					>
						{["💾", "📁", "🖥️", "📧", "🌐"][i % 5]}
					</div>
				))}
			</div>

			<TiltWrapper>
				<EventPass
					user={userDbRecord}
					qrPayload={qrPayload}
					clerk={user}
					guild={guild}
				/>
			</TiltWrapper>
		</div>
	);
}

function EventPass({ qrPayload, user, clerk, guild }: EventPassProps) {
	return (
		<div className="relative">
			{/* Lanyard hole at top */}
			<div
				className="absolute left-1/2 top-0 z-10 h-12 w-12 -translate-x-1/2 -translate-y-6 rounded-full border-4 border-[#808080] bg-background"
				style={{
					boxShadow:
						"inset 2px 2px 4px rgba(0,0,0,0.3), 2px 2px 4px rgba(0,0,0,0.2)",
				}}
			/>

			{/* Main ID Badge */}
			<div className="win98-window w-[380px] max-w-[95vw]">
				{/* Title bar */}
				<div className="win98-titlebar">
					<div className="flex items-center gap-1">
						<Image
							src={c.icon.svg}
							height={14}
							width={14}
							alt=""
							className="pixelated"
						/>
						<span>Security Credentials</span>
					</div>
					<div className="flex">
						<button className="win98-titlebar-btn">_</button>
						<button className="win98-titlebar-btn">□</button>
						<button className="win98-titlebar-btn">×</button>
					</div>
				</div>

				{/* Content */}
				<div className="bg-background p-3">
					{/* Header section with gradient */}
					<div
						className="mb-3 border-2 p-3"
						style={{
							background:
								"linear-gradient(135deg, #000080 0%, #1084d0 100%)",
							borderTopColor: "#404040",
							borderLeftColor: "#404040",
							borderRightColor: "#ffffff",
							borderBottomColor: "#ffffff",
						}}
					>
						<div className="flex items-center justify-between">
							<div>
								<h2 className="text-lg font-bold text-white">
									{c.hackathonName}
								</h2>
								<p className="font-mono text-xs text-white/90">
									{c.itteration}
								</p>
							</div>
							<div className="text-right">
								<p className="font-mono text-xs text-white/90">
									{format(c.startDate, "MMM d, yyyy")}
								</p>
								<p className="font-mono text-xs text-white/90">
									{format(c.startDate, "h:mm a")}
								</p>
							</div>
						</div>
					</div>

					{/* ID Card Content */}
					<div className="win98-inset bg-white p-3">
						<div className="grid gap-4 md:grid-cols-[140px_1fr]">
							{/* Left - Photo */}
							<div className="flex flex-col items-center">
								<div
									className="mb-2 border-2 bg-[#c0c0c0] p-1"
									style={{
										borderTopColor: "#808080",
										borderLeftColor: "#808080",
										borderRightColor: "#ffffff",
										borderBottomColor: "#ffffff",
									}}
								>
									<Image
										src={clerk.imageUrl}
										alt={`${user.firstName}'s Profile Picture`}
										width={120}
										height={120}
										className="pixelated"
										style={{ imageRendering: "pixelated" }}
									/>
								</div>

								{/* Security level badge */}
								<div
									className="w-full border bg-[#000080] py-1 text-center"
									style={{
										borderTopColor: "#1084d0",
										borderLeftColor: "#1084d0",
										borderRightColor: "#000060",
										borderBottomColor: "#000060",
									}}
								>
									<span className="font-mono text-xs font-bold text-white">
										{guild}
									</span>
								</div>
							</div>

							{/* Right - Info */}
							<div className="space-y-2">
								{/* Name field */}
								<div>
									<label className="text-xs font-bold text-black">
										NAME:
									</label>
									<div
										className="mt-0.5 border bg-white px-2 py-1"
										style={{
											borderTopColor: "#808080",
											borderLeftColor: "#808080",
											borderRightColor: "#ffffff",
											borderBottomColor: "#ffffff",
										}}
									>
										<span className="text-sm font-bold uppercase">
											{user.firstName} {user.lastName}
										</span>
									</div>
								</div>

								{/* Username field */}
								<div>
									<label className="text-xs font-bold text-black">
										USER ID:
									</label>
									<div
										className="mt-0.5 border bg-white px-2 py-1 font-mono"
										style={{
											borderTopColor: "#808080",
											borderLeftColor: "#808080",
											borderRightColor: "#ffffff",
											borderBottomColor: "#ffffff",
										}}
									>
										<span className="text-sm">
											@{user.hackerTag}
										</span>
									</div>
								</div>

								{/* Location field */}
								<div>
									<label className="text-xs font-bold text-black">
										LOCATION:
									</label>
									<div
										className="mt-0.5 border bg-white px-2 py-1 font-mono"
										style={{
											borderTopColor: "#808080",
											borderLeftColor: "#808080",
											borderRightColor: "#ffffff",
											borderBottomColor: "#ffffff",
										}}
									>
										<span className="text-sm">
											{c.prettyLocation}
										</span>
									</div>
								</div>

								{/* Access level */}
								<div className="flex items-center gap-2 pt-1">
									<div
										className="h-3 w-3 bg-[#00ff00]"
										style={{
											boxShadow: "0 0 8px #00ff00",
										}}
									/>
									<span className="font-mono text-xs text-black">
										ACCESS GRANTED
									</span>
								</div>
							</div>
						</div>

						{/* Divider */}
						<div className="my-3 border-b-2 border-t-2 border-b-white border-t-[#808080]" />

						{/* Bottom section with QR and logo */}
						<div className="flex items-center justify-between">
							{/* Logo and branding */}
							<div className="flex items-center gap-2">
								<div
									className="border-2 bg-[#c0c0c0] p-2"
									style={{
										borderTopColor: "#ffffff",
										borderLeftColor: "#ffffff",
										borderRightColor: "#808080",
										borderBottomColor: "#808080",
									}}
								>
									<Image
										src={c.icon.svg}
										height={50}
										width={50}
										alt=""
										className="pixelated"
									/>
								</div>
								<div>
									<p className="text-xs font-bold">
										{c.hackathonName}
									</p>
									<p className="font-mono text-xs text-gray-600">
										OFFICIAL CREDENTIAL
									</p>
								</div>
							</div>

							{/* QR Code */}
							<Drawer>
								<DrawerTrigger asChild>
									<button
										className="cursor-pointer border-2 bg-white p-2 transition-all hover:scale-105"
										style={{
											borderTopColor: "#808080",
											borderLeftColor: "#808080",
											borderRightColor: "#ffffff",
											borderBottomColor: "#ffffff",
										}}
									>
										<QRCode
											className="h-20 w-20"
											bgColor="#ffffff"
											fgColor="#000080"
											value={qrPayload}
										/>
									</button>
								</DrawerTrigger>
								<DrawerContent className="flex h-[90%] w-full items-center justify-center bg-[#c0c0c0] focus-visible:outline-none">
									<div className="win98-window max-w-md">
										<div className="win98-titlebar">
											<span>Scan QR Code</span>
											<button className="win98-titlebar-btn">
												×
											</button>
										</div>
										<div className="bg-white p-8">
											<QRCode
												className="h-full w-full"
												bgColor="#ffffff"
												fgColor="#000080"
												value={qrPayload}
											/>
										</div>
									</div>
								</DrawerContent>
							</Drawer>
						</div>
					</div>

					{/* Status bar at bottom */}
					<div className="mt-3 flex border">
						<div className="flex flex-1 items-center gap-2 px-2 py-0.5">
							<span className="text-xs">✓</span>
							<span className="text-xs">Valid Credential</span>
						</div>
						<div>
							<span className="px-2 py-0.5 text-xs">
								ID: {user.hackerTag}
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Security hologram effect overlay */}
			<div
				className="pointer-events-none absolute inset-0 opacity-10"
				style={{
					background: `repeating-linear-gradient(
						45deg,
						transparent,
						transparent 10px,
						rgba(0, 0, 128, 0.1) 10px,
						rgba(0, 0, 128, 0.1) 20px
					)`,
				}}
			/>
		</div>
	);
}
