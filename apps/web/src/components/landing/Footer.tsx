"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, ChevronRight } from "lucide-react";
import {
	DiscordIcon,
	GitHubIcon,
	LinkedinIcon,
	InstagramIcon,
	Windows98Icon,
} from "./FooterIcons";
import { Button } from "../shadcn/ui/button";

export default function Footer() {
	const [time, setTime] = useState<string>("");
	const [date, setDate] = useState<string>("");
	const [showStartMenu, setShowStartMenu] = useState(false);
	const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
	const [showTooltip, setShowTooltip] = useState<string | null>(null);
	const [isMobile, setIsMobile] = useState(false);
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

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	// Close menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent | TouchEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(e.target as Node)
			) {
				setShowStartMenu(false);
				setActiveSubmenu(null);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("touchstart", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("touchstart", handleClickOutside);
		};
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
			icon: InstagramIcon,
			label: "Instagram",
			href: "https://www.instagram.com/rowdycybercon/",
		},
		{
			icon: GitHubIcon,
			label: "GitHub",
			href: "https://github.com/rowdycon",
		},
		{
			icon: LinkedinIcon,
			label: "LinkedIn",
			href: "https://www.linkedin.com/company/utsa-rowdycon/",
		},
	];

	const handleSubmenuClick = (sectionId: string) => {
		if (isMobile) {
			setActiveSubmenu(activeSubmenu === sectionId ? null : sectionId);
		}
	};

	return (
		<>
			{/* Start Menu */}
			<div
				ref={menuRef}
				className={`fixed ${
					isMobile
						? "bottom-12 left-0 right-0 mx-auto max-w-[95vw]"
						: "bottom-10 left-0"
				} z-50 transition-all duration-200 ${
					showStartMenu
						? "translate-y-0 opacity-100"
						: "pointer-events-none translate-y-4 opacity-0"
				}`}
			>
				<div
					className={`win98-window ${isMobile ? "w-full" : "w-72"}`}
					style={{ boxShadow: "4px 4px 0 rgba(0,0,0,0.3)" }}
				>
					{/* Banner on left side */}
					<div className="flex">
						{/* Vertical banner */}
						<div
							className={`flex ${isMobile ? "w-8" : "w-10"} flex-col justify-end bg-gradient-to-b from-[#000080] to-[#1084d0] p-2`}
						>
							<span
								className={`${isMobile ? "text-xs" : "text-sm"} font-bold tracking-wider text-white`}
								style={{
									writingMode: "vertical-rl",
									transform: "rotate(180deg)",
								}}
							>
								RowdyCon 2026
							</span>
						</div>

						{/* Menu content */}
						<div className="flex-1 overflow-hidden bg-[#c0c0c0]">
							{/* Menu sections with submenus */}
							{menuSections.map((section) => (
								<div key={section.id}>
									<div
										className={`group flex cursor-pointer items-center justify-between ${isMobile ? "px-2 py-3" : "px-3 py-2"} hover:bg-[#000080] hover:text-white ${
											activeSubmenu === section.id &&
											isMobile
												? "bg-[#000080] text-white"
												: ""
										}`}
										onClick={() =>
											isMobile &&
											handleSubmenuClick(section.id)
										}
										onMouseEnter={() =>
											!isMobile &&
											setActiveSubmenu(section.id)
										}
										onMouseLeave={() =>
											!isMobile && setActiveSubmenu(null)
										}
									>
										<span className="text-sm font-medium">
											{section.title}
										</span>
										<ChevronRight
											className={`${isMobile ? "h-3 w-3" : "h-4 w-4"} opacity-60 transition-transform ${
												activeSubmenu === section.id &&
												isMobile
													? "rotate-90"
													: ""
											}`}
										/>
									</div>

									{/* Submenu - Mobile (collapsible) */}
									{isMobile &&
										activeSubmenu === section.id && (
											<div className="border-t border-[#808080] bg-[#D4D0C8]">
												{section.items.map((item) => (
													<a
														key={item.label}
														href={item.href}
														target="_blank"
														rel="noopener noreferrer"
														onClick={() => {
															setShowStartMenu(
																false,
															);
															setActiveSubmenu(
																null,
															);
														}}
														className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm hover:bg-[#000080] hover:text-white"
													>
														<span>{item.icon}</span>
														<span className="text-xs">
															{item.label}
														</span>
													</a>
												))}
											</div>
										)}

									{/* Submenu - Desktop (flyout) */}
									{!isMobile &&
										activeSubmenu === section.id && (
											<div
												className="win98-window absolute bottom-0 left-full ml-0.5 w-56"
												style={{
													boxShadow:
														"4px 4px 0 rgba(0,0,0,0.3)",
													maxHeight: "300px",
												}}
												onMouseEnter={() =>
													setActiveSubmenu(section.id)
												}
												onMouseLeave={() =>
													setActiveSubmenu(null)
												}
											>
												<div className="scrollbar-thin max-h-full overflow-y-auto bg-[#c0c0c0] py-1">
													{section.items.map(
														(item) => (
															<a
																key={item.label}
																href={item.href}
																target="_blank"
																rel="noopener noreferrer"
																onClick={() => {
																	setShowStartMenu(
																		false,
																	);
																	setActiveSubmenu(
																		null,
																	);
																}}
																className="flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm hover:bg-[#000080] hover:text-white"
															>
																<span>
																	{item.icon}
																</span>
																<span>
																	{item.label}
																</span>
															</a>
														),
													)}
												</div>
											</div>
										)}
								</div>
							))}

							{/* Divider */}
							<div className="mx-2 my-1 border-b border-t border-[#808080] border-b-white" />

							{/* Quick links */}
							<a
								href="https://discord.gg/G66gERwNgK"
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => setShowStartMenu(false)}
								className={`flex cursor-pointer items-center gap-2 ${isMobile ? "px-2 py-3 text-xs" : "px-3 py-2 text-sm"} hover:bg-[#000080] hover:text-white`}
							>
								<span>💬</span>
								<span className="font-medium">
									Join Discord
								</span>
							</a>

							{/* Divider */}
							<div className="mx-2 my-1 border-b border-t border-[#808080] border-b-white" />

							{/* Credits */}
							<a
								href="https://github.com/acmutsa/HackKit"
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => setShowStartMenu(false)}
								className={`flex cursor-pointer items-center gap-2 ${isMobile ? "px-2 py-3 text-xs" : "px-3 py-2 text-sm"} text-[#808080] hover:bg-[#000080] hover:text-white`}
							>
								<span>🛠️</span>
								<span>Powered by HackKit</span>
							</a>
						</div>
					</div>
				</div>
			</div>

			{/* Taskbar */}
			<footer
				className={`fixed bottom-0 left-0 right-0 z-40 ${isMobile ? "h-12" : "h-10"} border-t-2 border-[#DFDFDF] bg-[#c0c0c0] shadow-lg`}
			>
				<div className="flex h-full items-center gap-1 px-1">
					{/* Start Button */}
					<button
						className={`win98-btn flex h-7 w-7 items-center justify-center`}
						onClick={() => {
							setShowStartMenu(!showStartMenu);
							setActiveSubmenu(null);
						}}
					>
						<Windows98Icon className="h-7" />
					</button>

					{/* Divider */}
					{!isMobile && (
						<div className="mx-1 h-6 w-px bg-[#808080]" />
					)}

					{/* Quick Launch - only on desktop */}
					{!isMobile && (
						<>
							<Button
								className="win98-btn h-7 w-7"
								title="Discord"
							>
								<a
									href="https://discord.gg/G66gERwNgK"
									target="_blank"
									rel="noopener noreferrer"
								>
									<DiscordIcon className="h-6" />
								</a>
							</Button>

							{/* Active window indicator */}
							<Button className="win98-btn flex h-7 min-w-0 max-w-[200px] flex-shrink items-center gap-2 px-3">
								<span className="text-sm">🏠</span>
								<span className="text-sm">RowdyCon 2026</span>
							</Button>
						</>
					)}

					{/* Spacer */}
					<div className="flex-1" />

					{/* System Tray */}
					<div
						className={`win98-inset flex ${isMobile ? "h-9" : "h-7"} items-center ${isMobile ? "gap-2 px-2" : "gap-1 px-2"} py-1`}
					>
						{/* Social Icons - hide some on mobile */}
						{socialLinks
							.slice(0, isMobile ? 1 : socialLinks.length)
							.map(({ icon: Icon, label, href }) => (
								<div key={label} className="relative">
									<a
										href={href}
										target="_blank"
										rel="noopener noreferrer"
										onMouseEnter={() =>
											!isMobile && setShowTooltip(label)
										}
										onMouseLeave={() =>
											setShowTooltip(null)
										}
									>
										<Icon
											className={`${isMobile ? "h-5 w-5" : "h-4 w-4"} cursor-pointer transition-colors hover:text-[#000080]`}
										/>
									</a>
									{showTooltip === label && !isMobile && (
										<div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap border border-black bg-[#FFFFE1] px-2 py-1 text-xs">
											{label}
										</div>
									)}
								</div>
							))}

						{/* Discord */}
						<div className="relative">
							<a
								href="https://discord.gg/G66gERwNgK"
								target="_blank"
								rel="noopener noreferrer"
								onMouseEnter={() =>
									!isMobile && setShowTooltip("Discord")
								}
								onMouseLeave={() => setShowTooltip(null)}
							>
								<DiscordIcon className="h-5" />
							</a>
							{showTooltip === "Discord" && !isMobile && (
								<div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap border border-black bg-[#FFFFE1] px-2 py-1 text-xs">
									Discord
								</div>
							)}
						</div>

						{/* Divider in tray */}
						{!isMobile && (
							<div className="mx-1 h-4 w-px bg-[#808080]" />
						)}

						{/* Volume - hide on mobile */}
						{!isMobile && <Volume2 className="h-4 w-4" />}

						{/* Divider */}
						{!isMobile && (
							<div className="mx-1 h-4 w-px bg-[#808080]" />
						)}

						{/* Clock */}
						<div
							className={`cursor-default select-none ${isMobile ? "text-xs" : "text-xs"} relative`}
							title={date}
							onMouseEnter={() =>
								!isMobile && setShowTooltip("clock")
							}
							onMouseLeave={() => setShowTooltip(null)}
						>
							{time}
							{showTooltip === "clock" && !isMobile && (
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
