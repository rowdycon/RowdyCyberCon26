"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
	Instagram,
	Twitter,
	Github,
	Linkedin,
	Volume2,
	ChevronRight,
} from "lucide-react";

export default function Footer() {
	const [time, setTime] = useState<string>("");
	const [date, setDate] = useState<string>("");
	const [showStartMenu, setShowStartMenu] = useState(false);
	const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
	const [showTooltip, setShowTooltip] = useState<string | null>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const updateTime = () => {
			const now = new Date();
			setTime(
				now.toLocaleTimeString("en-US", {
					hour: "2-digit",
					minute: "2-digit",
				}),
			);
			setDate(
				now.toLocaleDateString("en-US", {
					weekday: "short",
					month: "short",
					day: "numeric",
				}),
			);
		};
		updateTime();
		const interval = setInterval(updateTime, 1000);
		return () => clearInterval(interval);
	}, []);

	// Close menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(e.target as Node)
			) {
				setShowStartMenu(false);
				setActiveSubmenu(null);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const menuSections = [
		{
			id: "orgs",
			title: "🏢 Organizations",
			items: [
				{
					icon: "🖥️",
					label: "CompTIA Student Chapter",
					href: "https://rowdylink.utsa.edu/organization/comptiastudentchapter",
				},
				{
					icon: "🔒",
					label: "Computer Security Association",
					href: "https://rowdylink.utsa.edu/organization/computersecurityassociation",
				},
				{
					icon: "👩‍💻",
					label: "Women in Cyber Security",
					href: "https://rowdylink.utsa.edu/organization/wicysutsa",
				},
				{
					icon: "⚔️",
					label: "Cyber Jedis",
					href: "https://rowdylink.utsa.edu/organization/cyberjedis",
				},
				{
					icon: "🤠",
					label: "Console Cowboys",
					href: "https://rowdylink.utsa.edu/organization/console-cowboys",
				},
				{
					icon: "🌐",
					label: "Online Cyber Security Alliance",
					href: "https://rowdylink.utsa.edu/organization/ocsa",
				},
				{
					icon: "💻",
					label: "ACM",
					href: "https://rowdylink.utsa.edu/organization/acm",
				},
			],
		},
		{
			id: "resources",
			title: "📚 Participant Resources",
			items: [
				{
					icon: "📖",
					label: "Guide",
					href: "https://rowdycon.notion.site/Guide-56f8318aeea7461bac459ae3fbc02273",
				},
				{
					icon: "📅",
					label: "Schedule",
					href: "https://rowdycon.notion.site/Schedule-daa0ea305ea34133ac68e517e185ea41?pvs=4",
				},
				{
					icon: "📜",
					label: "Code of Conduct",
					href: "https://rowdycon.notion.site/Code-of-Conduct-109850364be780f08848c4ed85aa4047",
				},
			],
		},
	];

	const socialLinks = [
		{
			icon: Instagram,
			label: "Instagram",
			href: "https://www.instagram.com/rowdycybercon/",
		},
		// { icon: Twitter, label: "Twitter", href: "https://x.com/rowdyconutsa" },
		{ icon: Github, label: "GitHub", href: "https://github.com/rowdycon" },
		{
			icon: Linkedin,
			label: "LinkedIn",
			href: "https://www.linkedin.com/company/utsa-rowdycon/",
		},
	];

	return (
		<>
			{/* Start Menu */}
			<div
				ref={menuRef}
				className={`fixed bottom-10 left-0 z-50 transition-all duration-200 ${
					showStartMenu
						? "translate-y-0 opacity-100"
						: "pointer-events-none translate-y-4 opacity-0"
				}`}
			>
				<div
					className="win98-window w-72"
					style={{ boxShadow: "4px 4px 0 rgba(0,0,0,0.3)" }}
				>
					{/* Banner on left side */}
					<div className="flex">
						{/* Vertical banner */}
						<div className="flex w-10 flex-col justify-end bg-gradient-to-b from-[#000080] to-[#1084d0] p-2">
							<span
								className="text-sm font-bold tracking-wider text-white"
								style={{
									writingMode: "vertical-rl",
									transform: "rotate(180deg)",
								}}
							>
								RowdyCon 2026
							</span>
						</div>

						{/* Menu content */}
						<div className="flex-1 bg-[#C0C0C0]">
							{/* Menu sections with submenus */}
							{menuSections.map((section) => (
								<div
									key={section.id}
									className="relative"
									onMouseEnter={() =>
										setActiveSubmenu(section.id)
									}
									onMouseLeave={() => setActiveSubmenu(null)}
								>
									<div className="group flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-[#000080] hover:text-white">
										<span className="text-sm font-medium">
											{section.title}
										</span>
										<ChevronRight className="h-4 w-4 opacity-60" />
									</div>

									{/* Submenu */}
									{activeSubmenu === section.id && (
										<div
											className="win98-window absolute bottom-0 left-full ml-0.5 w-56"
											style={{
												boxShadow:
													"4px 4px 0 rgba(0,0,0,0.3)",
												maxHeight: "300px",
											}}
										>
											<div className="scrollbar-thin max-h-full overflow-y-auto bg-[#C0C0C0] py-1">
												{section.items.map((item) => (
													<Link
														key={item.label}
														href={item.href}
														target="_blank"
														rel="noopener noreferrer"
														onClick={() =>
															setShowStartMenu(
																false,
															)
														}
													>
														<div className="flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm hover:bg-[#000080] hover:text-white">
															<span>
																{item.icon}
															</span>
															<span>
																{item.label}
															</span>
														</div>
													</Link>
												))}
											</div>
										</div>
									)}
								</div>
							))}

							{/* Divider */}
							<div className="mx-2 my-1 border-b border-t border-[#808080] border-b-white" />

							{/* Quick links */}
							{/* <Link
								href="https://ctf.rowdycon.org"
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => setShowStartMenu(false)}
							>
								<div className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-[#000080] hover:text-white">
									<span>🚩</span>
									<span className="font-medium">
										Launch CTF
									</span>
								</div>
							</Link> */}

							<Link
								href="https://discord.gg/G66gERwNgK"
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => setShowStartMenu(false)}
							>
								<div className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-[#000080] hover:text-white">
									<span>💬</span>
									<span className="font-medium">
										Join Discord
									</span>
								</div>
							</Link>

							{/* Divider */}
							<div className="mx-2 my-1 border-b border-t border-[#808080] border-b-white" />

							{/* Credits */}
							<Link
								href="https://github.com/acmutsa/HackKit"
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => setShowStartMenu(false)}
							>
								<div className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm text-[#808080] hover:bg-[#000080] hover:text-white">
									<span>🛠️</span>
									<span>Powered by HackKit</span>
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Taskbar */}
			<footer className="fixed bottom-0 left-0 right-0 z-40 h-10 border-t-2 border-[#DFDFDF] bg-[#C0C0C0] shadow-lg">
				<div className="flex h-full items-center gap-1 px-1">
					{/* Start Button */}
					<button
						className={`win98-btn flex h-7 items-center gap-1.5 px-2 font-bold transition-all ${
							showStartMenu ? "bg-[#C0C0C0] shadow-inner" : ""
						}`}
						onClick={() => {
							setShowStartMenu(!showStartMenu);
							setActiveSubmenu(null);
						}}
						style={
							showStartMenu
								? {
										boxShadow:
											"inset 1px 1px 2px rgba(0,0,0,0.3)",
									}
								: {}
						}
					>
						<div
							className="h-5 w-5 rounded-sm"
							style={{
								background:
									"linear-gradient(135deg, #FF0000 0%, #FF8000 25%, #00FF00 50%, #0080FF 75%, #8000FF 100%)",
							}}
						/>
						<span className="text-sm">Start</span>
					</button>

					{/* Divider */}
					<div className="mx-1 h-6 w-px bg-[#808080]" />

					{/* Quick Launch */}
					<div className="flex items-center gap-1">
						{/* <Link
							href="https://ctf.rowdycon.org"
							target="_blank"
							rel="noopener noreferrer"
						>
							<button
								className="win98-btn flex h-7 w-7 items-center justify-center text-sm"
								title="CTF"
							>
								🚩
							</button>
						</Link> */}
						<Link
							href="https://discord.gg/G66gERwNgK"
							target="_blank"
							rel="noopener noreferrer"
						>
							<button
								className="win98-btn flex h-7 w-7 items-center justify-center text-sm"
								title="Discord"
							>
								💬
							</button>
						</Link>
					</div>

					{/* Divider */}
					<div className="mx-1 h-6 w-px bg-[#808080]" />

					{/* Active window indicator */}
					<button
						className="win98-btn flex h-7 min-w-0 max-w-[200px] flex-shrink items-center gap-2 bg-[#C0C0C0] px-3"
						style={{
							boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.2)",
						}}
					>
						<span className="text-sm">🏠</span>
						<span className="text-sm">RowdyCon 2026</span>
					</button>

					{/* Spacer */}
					<div className="flex-1" />

					{/* System Tray */}
					<div className="win98-inset flex h-7 items-center gap-1 px-2 py-1">
						{/* Social Icons */}
						{socialLinks.map(({ icon: Icon, label, href }) => (
							<div key={label} className="relative">
								<Link
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									onMouseEnter={() => setShowTooltip(label)}
									onMouseLeave={() => setShowTooltip(null)}
								>
									<Icon className="h-4 w-4 cursor-pointer transition-colors hover:text-[#000080]" />
								</Link>
								{showTooltip === label && (
									<div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap border border-black bg-[#FFFFE1] px-2 py-1 text-xs">
										{label}
									</div>
								)}
							</div>
						))}

						{/* Discord */}
						<div className="relative">
							<Link
								href="https://discord.gg/G66gERwNgK"
								target="_blank"
								rel="noopener noreferrer"
								onMouseEnter={() => setShowTooltip("Discord")}
								onMouseLeave={() => setShowTooltip(null)}
							>
								<svg
									className="h-4 w-4 cursor-pointer transition-colors hover:text-[#5865F2]"
									viewBox="0 0 24 24"
									fill="currentColor"
								>
									<path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
								</svg>
							</Link>
							{showTooltip === "Discord" && (
								<div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap border border-black bg-[#FFFFE1] px-2 py-1 text-xs">
									Discord
								</div>
							)}
						</div>

						{/* Divider in tray */}
						<div className="mx-1 h-4 w-px bg-[#808080]" />

						{/* Volume */}
						<Volume2 className="h-4 w-4" />

						{/* Divider */}
						<div className="mx-1 h-4 w-px bg-[#808080]" />

						{/* Clock */}
						<div
							className="cursor-default select-none text-xs"
							title={date}
							onMouseEnter={() => setShowTooltip("clock")}
							onMouseLeave={() => setShowTooltip(null)}
						>
							{time}
							{showTooltip === "clock" && (
								<div className="absolute bottom-full right-0 mb-2 whitespace-nowrap border border-black bg-[#FFFFE1] px-2 py-1 text-xs">
									{date}
								</div>
							)}
						</div>
					</div>
				</div>
			</footer>
		</>
	);
}
