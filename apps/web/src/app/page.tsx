import Navbar from "@/components/shared/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";

import Partners from "@/components/landing/Partners";
import Footer from "@/components/landing/Footer";

import { Oswald } from "next/font/google";
import WorkWithUs from "@/components/landing/WorkWithUs";

const oswald = Oswald({
	variable: "--font-oswald",
	subsets: ["latin"],
});

export default function Home() {
	return (
		<div
			className={`${oswald.variable} relative min-h-screen w-full overflow-x-hidden`}
		>
			<Navbar />
			<div className="win98-bg fixed inset-0 -z-10" />

			<main className="relative z-10 overflow-x-hidden">
				<Hero />
				<About />
				<Partners />
				<WorkWithUs />
				<Footer />
			</main>
		</div>
	);
}

export const revalidate = 30;
