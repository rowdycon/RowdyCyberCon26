import { Suspense } from "react";
import Image from "next/image";
import { Skeleton } from "../shadcn/ui/skeleton";
import HeroClient from "./HeroClient";

export default function Hero() {
	return (
		<HeroClient>
			{/* Main content wrapper with consistent spacing */}
			<div className="flex flex-col items-center text-center">
				{/* Logo with glow effect */}
				<div className="relative mx-auto h-[180px] w-[180px] md:h-[280px] md:w-[280px]">
					<div className="absolute inset-0 animate-pulse rounded-full bg-[#000080] opacity-20 blur-2xl" />
					<Image
						src="/img/logo/rowdyconlogo.png"
						alt="RowdyCon Logo"
						fill
						className="relative z-10 object-contain drop-shadow-lg transition-transform duration-300 hover:scale-105"
						style={{ imageRendering: "pixelated" }}
						priority
						sizes="(max-width: 768px) 180px, 280px"
					/>
				</div>

				{/* Text Logo */}
				<div className="relative mx-auto my-3 h-[80px] w-[250px] md:h-[175px] md:w-[400px]">
					<Image
						src="/img/logo/rcc_for_website.png"
						alt="RowdyCon - Capture The Flag Competition"
						fill
						className="object-contain"
						style={{ imageRendering: "pixelated" }}
						sizes="(max-width: 768px) 250px, 400px"
					/>
				</div>

				{/* Optional tagline for context */}
				<div className="mb-6 max-w-md text-3xl text-gray-600">
					April 11th
				</div>

				{/* Action buttons */}
				<div className="text-bold flex flex-col items-center justify-center gap-4 text-2xl text-gray-600 sm:flex-row">
					More info coming soon!
					{/* <Suspense fallback={<ButtonSkeleton />}>
						<LandingButton />
					</Suspense>

					<Link href="https://ctf.rowdycon.org" className="group">
						<button className="win98-btn relative overflow-hidden px-8 py-2 transition-transform hover:scale-[1.02] active:scale-[0.98]">
							<span className="relative z-10 flex items-center gap-2">
								<span aria-hidden="true">🚩</span>
								Go to the CTF!
							</span>

							<span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
						</button>
					</Link> */}
				</div>
			</div>
		</HeroClient>
	);
}
