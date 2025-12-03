import { getUser } from "db/functions";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function LandingButton() {
	const { userId } = await auth();

	if (!userId) {
		return (
			<div className="grid grid-cols-1">
				<div className="flex h-full w-full flex-col items-center gap-4 space-y-2 md:flex-row md:space-y-0">
					<Link href={"/register"}>
						<button className="win98-btn px-8">
							Register Now!
						</button>
					</Link>
					<Link href={"/sign-in"}>
						<button className="win98-btn px-8">Sign In</button>
					</Link>
				</div>
			</div>
		);
	}

	const user = await getUser(userId);

	if (!user) {
		return (
			<Link href={"/register"}>
				<button className="win98-btn px-8">
					Complete Registration
				</button>
			</Link>
		);
	}

	return (
		<Link href={"/dash"}>
			<button className="win98-btn px-8">Dashboard</button>
		</Link>
	);
}
