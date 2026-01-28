import Image from "next/image";
import HeroClient from "./HeroClient";
import { Button } from "../shadcn/ui/button";
import Link from "next/link";

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
				<div className="relative mx-auto h-[80px] w-[250px] md:h-[175px] md:w-[400px]">
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
					<Link href={"/register"}>
						<Button className="win98-btn p-10 text-xl">
							Register Now!
						</Button>
					</Link>
				</div>
			</div>
		</HeroClient>
	);
}
