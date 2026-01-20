import Link from "next/link";
import Image from "next/image";
import c from "config";
import ProfileButton from "./ProfileButton";
import { currentUser } from "@clerk/nextjs/server";
import NavBarLinksGrouper from "./NavBarLinksGrouper";
import { getUser } from "db/functions";
import WinTitleBar from "./WinTitleBar";

interface NavbarProps {
	className?: string;
}

export default async function Navbar({ className }: NavbarProps) {
	const user = await currentUser();
	const registrationIsComplete =
		user != null && (await getUser(user.id)) != undefined;

	return (
		<div className="sticky top-0 z-50">
			{/* Title bar */}
			<WinTitleBar
				title={`${c.hackathonName} - [Internet Explorer]`}
				imagePath={c.icon.svg}
			/>

			{/* Menu bar */}
			<div
				className={`h-10 w-full border-b bg-card ${className || ""}`}
				style={{
					borderBottomColor: "#808080",
					boxShadow: "inset 0 -1px 0 #ffffff",
				}}
			>
				<div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-1 lg:max-w-full lg:px-2">
					{/* Left - Menu items */}
					<div className="flex items-center">
						{/* File-style menu items */}
						<Link href="/" className="group relative">
							<div className="px-2 py-1 text-xs text-black">
								<span className="p-2 hover:bg-[#000080] hover:text-white">
									<span className="underline">F</span>ile
								</span>
								<span className="p-2 hover:bg-[#000080] hover:text-white">
									<span className="underline">E</span>dit
								</span>
								<span className="p-2 hover:bg-[#000080] hover:text-white">
									<span className="underline">V</span>iew
								</span>
								<span className="p-2 hover:bg-[#000080] hover:text-white">
									<span className="underline">T</span>ools
								</span>
								<span className="p-2 hover:bg-[#000080] hover:text-white">
									<span className="underline">H</span>elp
								</span>
							</div>
						</Link>
					</div>

					{/* Right - Action buttons and profile */}
					<div className="flex items-center gap-1">
						<div className="hidden text-xs md:flex">
							<NavBarLinksGrouper />
						</div>
						<div className="mx-1 hidden h-5 w-[2px] border-l border-r border-l-[#808080] border-r-[#ffffff] md:block" />

						{/* Toolbar buttons */}
						<div className="mr-2 hidden items-center gap-0.5 md:flex">
							{user ? (
								<Link
									href={
										registrationIsComplete
											? "/dash"
											: "/register"
									}
								>
									<button className="win98-btn flex h-8 items-center gap-x-2">
										<span className="text-sm">
											{registrationIsComplete
												? "📊"
												: "📝"}
										</span>
										<span className="text-xs">
											{registrationIsComplete
												? "Dashboard"
												: "Register"}
										</span>
									</button>
								</Link>
							) : (
								<>
									<Link href="/sign-in">
										<button className="win98-btn flex h-8 items-center">
											<span className="text-sm">🔑</span>
											<span className="text-xs text-black">
												Sign In
											</span>
										</button>
									</Link>
									<Link href="/register">
										<button className="win98-btn flex h-8 items-center">
											<span className="text-sm">📋</span>
											<span className="text-xs text-black">
												Register
											</span>
										</button>
									</Link>
								</>
							)}
						</div>

						{/* Divider */}
						<div className="mx-1 hidden h-5 w-[2px] border-l border-r border-l-[#808080] border-r-[#ffffff] md:block" />

						<ProfileButton />
					</div>
				</div>
			</div>

			{/* Address bar */}
			<div
				className="flex h-8 w-full items-center gap-2 border-b bg-card px-2"
				style={{
					borderBottomColor: "#808080",
					boxShadow: "inset 0 -1px 0 #ffffff",
				}}
			>
				<span className="text-xs text-black">Address:</span>
				<div
					className="flex h-[26px] flex-1 items-center gap-1 border bg-white px-1"
					style={{
						borderTopColor: "#808080",
						borderLeftColor: "#808080",
						borderRightColor: "#ffffff",
						borderBottomColor: "#ffffff",
						boxShadow: "inset 1px 1px 0 #404040",
					}}
				>
					<span className="text-sm">📄</span>
					<span className="truncate text-xs text-black">
						https://rowdycybercon.org/
					</span>
				</div>
				<button
					className="flex h-[22px] items-center gap-1 border-2 px-3"
					style={{
						borderTopColor: "#ffffff",
						borderLeftColor: "#ffffff",
						borderRightColor: "#404040",
						borderBottomColor: "#404040",
						boxShadow: "inset -1px -1px 0 #808080",
					}}
				>
					<span className="text-xs text-black">Go</span>
				</button>
			</div>
		</div>
	);
}
