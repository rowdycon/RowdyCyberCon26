"use client";

import { useEffect, useState, useRef } from "react";

interface FloatingIcon {
	id: number;
	x: number;
	y: number;
	icon: string;
	speed: number;
	size: number;
	opacity: number;
}

const WIN98_ICONS = [
	"💾",
	"📁",
	"🖥️",
	"📧",
	"🌐",
	"🔒",
	"⚙️",
	"📝",
	"🗑️",
	"💿",
	"🖨️",
	"📊",
];

const DESKTOP_ITEMS = [
	{ icon: "📁", label: "About", section: "#About" },
	{ icon: "📁", label: "Partners", section: "#Partners" },
	{ icon: "📁", label: "FAQ", section: "#FAQ" },
	{ icon: "🌐", label: "Internet", section: "" },
	{ icon: "🗑️", label: "Recycle Bin", section: "" },
];

const BOOT_MESSAGES = [
	"Starting Windows 98...",
	"Loading system files...",
	"Initializing RowdyCyberCon.exe...",
	"Loading CTF modules...",
	"System ready!",
];

export default function HeroClient({
	children,
}: {
	children: React.ReactNode;
}) {
	const [icons, setIcons] = useState<FloatingIcon[]>([]);
	const [bootSequence, setBootSequence] = useState(true);
	const [bootText, setBootText] = useState<string[]>([]);
	const [isLoaded, setIsLoaded] = useState(false);
	const animationRef = useRef<number>(0);
	const lastTimeRef = useRef<number>(0);

	// Boot sequence
	useEffect(() => {
		let i = 0;
		const interval = setInterval(() => {
			if (i < BOOT_MESSAGES.length) {
				setBootText((prev) => [...prev, BOOT_MESSAGES[i]]);
				i++;
			} else {
				clearInterval(interval);
				setTimeout(() => {
					setBootSequence(false);
					setIsLoaded(true);
				}, 500);
			}
		}, 400);
		return () => clearInterval(interval);
	}, []);

	// Initialize floating icons
	useEffect(() => {
		const newIcons: FloatingIcon[] = Array.from({ length: 15 }, (_, i) => ({
			id: i,
			x: Math.random() * 100,
			y: Math.random() * 100,
			icon: WIN98_ICONS[Math.floor(Math.random() * WIN98_ICONS.length)],
			speed: 0.3 + Math.random() * 0.4,
			size: 18 + Math.random() * 18,
			opacity: 0.08 + Math.random() * 0.15,
		}));
		setIcons(newIcons);
	}, []);

	// Smoother animation with requestAnimationFrame
	useEffect(() => {
		if (bootSequence || icons.length === 0) return;

		const animate = (time: number) => {
			if (time - lastTimeRef.current > 50) {
				lastTimeRef.current = time;
				setIcons((prev) =>
					prev.map((icon) => ({
						...icon,
						y: icon.y <= -10 ? 110 : icon.y - icon.speed,
						x: icon.x + Math.sin(time / 2000 + icon.id) * 0.08,
					})),
				);
			}
			animationRef.current = requestAnimationFrame(animate);
		};

		animationRef.current = requestAnimationFrame(animate);
		return () => {
			if (animationRef.current)
				cancelAnimationFrame(animationRef.current);
		};
	}, [bootSequence, icons.length]);

	if (bootSequence) {
		return (
			<section
				className="relative flex min-h-screen items-center justify-center bg-black"
				aria-label="Loading"
			>
				<div
					className="font-mono text-sm text-gray-300"
					role="status"
					aria-live="polite"
				>
					{bootText.map((text, i) => (
						<div key={i} className="flex items-center gap-2">
							<span className="text-green-500" aria-hidden="true">
								✓
							</span>
							{text}
						</div>
					))}
					<span className="animate-pulse" aria-hidden="true">
						_
					</span>
				</div>
			</section>
		);
	}

	return (
		<section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20">
			{/* Animated gradient background */}
			<div
				className="absolute inset-0 opacity-30"
				style={{
					background: `
            radial-gradient(ellipse at 30% 20%, rgba(0, 0, 128, 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(0, 128, 128, 0.3) 0%, transparent 40%)
          `,
				}}
			/>

			{/* Floating Win98 icons */}
			<div
				className="pointer-events-none absolute inset-0 overflow-hidden"
				aria-hidden="true"
			>
				{icons.map((icon) => (
					<div
						key={icon.id}
						className="absolute select-none will-change-transform"
						style={{
							left: `${icon.x}%`,
							top: `${icon.y}%`,
							fontSize: `${icon.size}px`,
							opacity: icon.opacity,
							filter: "grayscale(30%)",
							transition: "left 0.1s linear",
						}}
					>
						{icon.icon}
					</div>
				))}
			</div>

			{/* Pixelated grid overlay */}
			<div
				className="pointer-events-none absolute inset-0 opacity-5"
				aria-hidden="true"
				style={{
					backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
					backgroundSize: "20px 20px",
				}}
			/>

			{/* Desktop icons */}
			<nav
				className="absolute left-8 top-8 hidden flex-col gap-6 lg:flex"
				aria-label="Quick navigation"
			>
				{DESKTOP_ITEMS.map((item, i) => (
					<a
						key={item.label}
						href={item.section || "#"}
						className={`group flex flex-col items-center gap-1 transition-all duration-500 ${
							isLoaded
								? "translate-x-0 opacity-100"
								: "-translate-x-8 opacity-0"
						}`}
						style={{ transitionDelay: `${300 + i * 100}ms` }}
					>
						<span
							className="text-4xl transition-transform group-hover:scale-110"
							aria-hidden="true"
						>
							{item.icon}
						</span>
						<span className="px-1 text-center text-xs text-white transition-colors group-hover:bg-[#000080]">
							{item.label}
						</span>
					</a>
				))}
			</nav>

			{/* Retro window frame */}
			<div
				className={`win98-window relative z-10 mx-4 w-full max-w-5xl p-1 transition-all duration-700 ${
					isLoaded
						? "translate-y-0 opacity-100"
						: "translate-y-8 opacity-0"
				}`}
			>
				{/* Title bar */}
				<div className="win98-titlebar mb-0">
					<div className="flex items-center gap-1">
						<span className="text-xs" aria-hidden="true">
							🖥️
						</span>
						<span>RowdyCyberCon.exe</span>
					</div>
					<div className="flex" aria-hidden="true">
						<button className="win98-titlebar-btn" tabIndex={-1}>
							_
						</button>
						<button className="win98-titlebar-btn" tabIndex={-1}>
							□
						</button>
						<button className="win98-titlebar-btn" tabIndex={-1}>
							x
						</button>
					</div>
				</div>

				{/* Window content */}
				<div
					className="relative overflow-hidden p-6 md:p-10"
					style={{
						background:
							"linear-gradient(135deg, #c0c0c0 0%, #d4d4d4 50%, #c0c0c0 100%)",
					}}
				>
					{/* Animated grid background */}
					<div
						className="pointer-events-none absolute inset-0 opacity-[0.03]"
						aria-hidden="true"
						style={{
							backgroundImage: `
                repeating-linear-gradient(0deg, #000080 0px, #000080 1px, transparent 1px, transparent 4px),
                repeating-linear-gradient(90deg, #000080 0px, #000080 1px, transparent 1px, transparent 4px)
              `,
							backgroundSize: "4px 4px",
							animation: "gridScroll 20s linear infinite",
						}}
					/>

					{/* Corner decorations */}
					<div
						className="absolute left-2 top-2 h-2 w-2 bg-[#000080] opacity-20"
						aria-hidden="true"
					/>
					<div
						className="absolute right-2 top-2 h-2 w-2 bg-[#008080] opacity-20"
						aria-hidden="true"
					/>
					<div
						className="absolute bottom-2 left-2 h-2 w-2 bg-[#008080] opacity-20"
						aria-hidden="true"
					/>
					<div
						className="absolute bottom-2 right-2 h-2 w-2 bg-[#000080] opacity-20"
						aria-hidden="true"
					/>

					<div className="relative z-10">{children}</div>
				</div>
			</div>

			{/* CSS Animation */}
			<style jsx global>{`
				@keyframes gridScroll {
					0% {
						background-position: 0 0;
					}
					100% {
						background-position: 40px 40px;
					}
				}
				@keyframes logoGlow {
					0%,
					100% {
						opacity: 0.2;
						transform: scale(1);
					}
					50% {
						opacity: 0.3;
						transform: scale(1.05);
					}
				}
			`}</style>
		</section>
	);
}
