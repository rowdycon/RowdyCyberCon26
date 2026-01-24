import { notFound } from "next/navigation";
import Image from "next/image";
import RoleBadge from "@/components/dash/shared/RoleBadge";
import { Balancer } from "react-wrap-balancer";
import Link from "next/link";
import { Globe } from "lucide-react";
import { GitHubIcon, LinkedinIcon } from "@/components/landing/FooterIcons";
import Navbar from "@/components/shared/Navbar";
import { getHackerByTag } from "db/functions";
import WinTitleBar from "@/components/shared/WinTitleBar";

export default async function ({ params }: { params: { tag: string } }) {
	if (!params.tag || params.tag.length <= 1) return notFound();

	const user = await getHackerByTag(params.tag);
	if (!user) return notFound();

	return (
		<>
			<Navbar />
			<div className="min-h-screen w-full overflow-x-hidden px-4 py-12">
				{/* Floating icons background */}
				<div className="pointer-events-none fixed inset-0 opacity-5">
					{[...Array(12)].map((_, i) => (
						<div
							key={i}
							className="absolute animate-pulse"
							style={{
								left: `${(i * 17) % 100}%`,
								top: `${(i * 23) % 100}%`,
								fontSize: "24px",
								animationDelay: `${i * 0.3}s`,
							}}
						>
							👤
						</div>
					))}
				</div>

				{/* Main window container */}
				<div className="relative z-10 mx-auto max-w-4xl">
					<div className="win98-window">
						{/* Title bar */}
						<WinTitleBar
							title={`👤 ${user.firstName} ${user.lastName} - Properties`}
						/>

						{/* Window content */}
						<div className="p-2">
							{/* Tabs */}
							<div className="mb-2 flex border-b-2 border-white">
								<button className="win98-btn">General</button>
								<button className="win98-btn">Contact</button>
								<button className="win98-btn">Details</button>
							</div>

							{/* Tab content */}
							<div className="win98-inset min-h-[400px] bg-white p-4">
								<div className="grid gap-6 md:grid-cols-[200px_1fr]">
									{/* Left column - Profile picture and basic info */}
									<div className="flex flex-col items-center">
										{/* Profile picture with Windows 98 frame */}
										<div
											className="mb-3 border-2 bg-white p-1"
											style={{
												borderTopColor: "#808080",
												borderLeftColor: "#808080",
												borderRightColor: "#ffffff",
												borderBottomColor: "#ffffff",
											}}
										>
											<div className="relative h-40 w-40 overflow-hidden">
												<Image
													fill
													src={user.profilePhoto}
													alt={`@${user.hackerTag}'s Profile Photo`}
													className="pixelated object-cover"
													style={{
														imageRendering:
															"pixelated",
													}}
												/>
											</div>
										</div>

										{/* Name label */}
										<div className="mb-2 w-full text-center">
											<label className="text-xs text-black">
												Name:
											</label>
											<div
												className="mt-1 border bg-white px-2 py-1 text-sm"
												style={{
													borderTopColor: "#808080",
													borderLeftColor: "#808080",
													borderRightColor: "#ffffff",
													borderBottomColor:
														"#ffffff",
												}}
											>
												{user.firstName} {user.lastName}
											</div>
										</div>

										{/* Username label */}
										<div className="mb-2 w-full text-center">
											<label className="text-xs text-black">
												Username:
											</label>
											<div
												className="mt-1 flex items-center justify-center gap-1 border bg-white px-2 py-1"
												style={{
													borderTopColor: "#808080",
													borderLeftColor: "#808080",
													borderRightColor: "#ffffff",
													borderBottomColor:
														"#ffffff",
												}}
											>
												<span className="font-mono text-sm">
													@{user.hackerTag}
												</span>
											</div>
										</div>

										{/* Role badge */}
										<div className="mt-2">
											<RoleBadge role={user.role} />
										</div>
									</div>

									{/* Right column - Details */}
									<div className="space-y-4">
										{/* About section */}
										<div>
											<div className="mb-2 flex items-center gap-2">
												<span className="text-sm">
													📝
												</span>
												<label className="text-sm font-bold text-black">
													About:
												</label>
											</div>
											<div
												className="win98-inset min-h-[100px] bg-white p-2 text-sm"
												style={{
													maxHeight: "150px",
													overflowY: "auto",
												}}
											>
												<Balancer>{user.bio}</Balancer>
											</div>
										</div>

										{/* Skills section */}
										{user.skills &&
										(user.skills as string[]).length > 0 ? (
											<div>
												<div className="mb-2 flex items-center gap-2">
													<span className="text-sm">
														⚙️
													</span>
													<label className="text-sm font-bold text-black">
														Skills:
													</label>
												</div>
												<div className="flex flex-wrap gap-1">
													{(
														user.skills as string[]
													).map((skill, i) => (
														<span
															key={i}
															className="border bg-card px-2 py-1 text-xs"
															style={{
																borderTopColor:
																	"#ffffff",
																borderLeftColor:
																	"#ffffff",
																borderRightColor:
																	"#808080",
																borderBottomColor:
																	"#808080",
															}}
														>
															{skill}
														</span>
													))}
												</div>
											</div>
										) : null}

										{/* Contact links section */}
										<div>
											<div className="mb-2 flex items-center gap-2">
												<span className="text-sm">
													🔗
												</span>
												<label className="text-sm font-bold text-black">
													Links:
												</label>
											</div>
											<div className="space-y-2">
												{user.hackerData.GitHub &&
													user.hackerData.GitHub
														.length > 0 && (
														<Link
															href={
																"https://github.com/" +
																user.hackerData
																	.GitHub
															}
															target="_blank"
															className="flex items-center gap-2 border bg-white px-2 py-1.5 text-sm hover:bg-[#000080] hover:text-white"
															style={{
																borderTopColor:
																	"#808080",
																borderLeftColor:
																	"#808080",
																borderRightColor:
																	"#ffffff",
																borderBottomColor:
																	"#ffffff",
															}}
														>
															<GitHubIcon className="h-4 w-4" />
															<span className="underline">
																{
																	user
																		.hackerData
																		.GitHub
																}
															</span>
														</Link>
													)}
												{user.hackerData.LinkedIn &&
													user.hackerData.LinkedIn
														.length > 0 && (
														<Link
															href={
																"https://linkedin.com/in/" +
																user.hackerData
																	.LinkedIn
															}
															target="_blank"
															className="flex items-center gap-2 border bg-white px-2 py-1.5 text-sm hover:bg-[#000080] hover:text-white"
															style={{
																borderTopColor:
																	"#808080",
																borderLeftColor:
																	"#808080",
																borderRightColor:
																	"#ffffff",
																borderBottomColor:
																	"#ffffff",
															}}
														>
															<LinkedinIcon className="h-4 w-4" />
															<span className="underline">
																{
																	user
																		.hackerData
																		.LinkedIn
																}
															</span>
														</Link>
													)}
												{user.hackerData
													.PersonalWebsite &&
													user.hackerData
														.PersonalWebsite
														.length > 0 && (
														<Link
															href={
																user.hackerData.PersonalWebsite.startsWith(
																	"http",
																) ||
																user.hackerData.PersonalWebsite.startsWith(
																	"https",
																)
																	? user
																			.hackerData
																			.PersonalWebsite
																	: "https://" +
																		user
																			.hackerData
																			.PersonalWebsite
															}
															target="_blank"
															className="flex items-center gap-2 border bg-white px-2 py-1.5 text-sm hover:bg-[#000080] hover:text-white"
															style={{
																borderTopColor:
																	"#808080",
																borderLeftColor:
																	"#808080",
																borderRightColor:
																	"#ffffff",
																borderBottomColor:
																	"#ffffff",
															}}
														>
															<Globe className="h-4 w-4" />
															<span className="underline">
																{user.hackerData.PersonalWebsite.replace(
																	"https://",
																	"",
																).replace(
																	"http://",
																	"",
																)}
															</span>
														</Link>
													)}
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Bottom buttons */}
							<div className="mt-3 flex justify-end gap-2">
								<button className="win98-btn px-6">OK</button>
								<button className="win98-btn px-6">
									Cancel
								</button>
								<button className="win98-btn px-6">
									Apply
								</button>
							</div>
						</div>
					</div>
				</div>

				{/* Desktop-style file icon decoration */}
				<div className="fixed bottom-8 left-8 hidden md:block">
					<div className="flex cursor-pointer flex-col items-center">
						<div className="mb-1 text-4xl">💾</div>
						<div className="text-xs">User Profile</div>
					</div>
				</div>
			</div>
		</>
	);
}
