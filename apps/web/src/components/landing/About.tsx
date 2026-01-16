import Link from "next/link";

export default function About() {
	return (
		<section className="w-full py-8" id="About">
			{/* Who are we section */}
			<div className="mx-auto max-w-6xl px-4">
				<div className="win98-window mb-8 bg-[#c0c0c0]">
					<div className="win98-titlebar">
						<span>About RowdyCyberCon</span>
						<div className="flex">
							<button className="win98-titlebar-btn">_</button>
							<button className="win98-titlebar-btn">□</button>
							<button className="win98-titlebar-btn">x</button>
						</div>
					</div>
					<div className="p-4">
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div>
								<h2 className="mb-2 text-2xl font-bold text-[#000080]">
									Who are we?
								</h2>
							</div>
							<div className="win98-inset p-4">
								<p className="text-sm">
									RowdyCyberCon is a one-day cybersecurity
									conference where San Antonio area based
									students can learn{" "}
									<strong>
										new skills, participate in challenges,
										and network
									</strong>
									! You'll also have the opportunity to attend
									a plethora of different{" "}
									<strong>
										workshops and meet employers
									</strong>
									. We welcome all students no matter what
									major or skill level, so go ahead and
									register today to secure your spot!
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Volunteering section */}
				{/* <div className="win98-window mb-8 bg-[#c0c0c0]">
					<div className="win98-titlebar">
						<span>Volunteer Opportunities</span>
						<div className="flex">
							<button className="win98-titlebar-btn">_</button>
							<button className="win98-titlebar-btn">□</button>
							<button className="win98-titlebar-btn">×</button>
						</div>
					</div>
					<div className="p-4">
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div>
								<h2 className="mb-2 text-2xl font-bold text-[#000080]">
									Interested in Volunteering?
								</h2>
							</div>
							<div className="win98-inset p-4">
								<p className="mb-4 text-sm">
									We have plenty of things to do the day of
									RowdyCon and we'd love your help if you're
									able to give it! Sign up below!
								</p>
								<div className="flex justify-center">
									<Link
										href={
											"https://forms.gle/G8t8UQxiQLGbFLVE9"
										}
										target="_blank"
										rel="noopener noreferrer"
									>
										<button className="win98-btn">
											Volunteer Form
										</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div> */}

				{/* Partnering section */}
				<div className="win98-window bg-[#c0c0c0]">
					<div className="win98-titlebar">
						<span>Partnership Information</span>
						<div className="flex">
							<button className="win98-titlebar-btn">_</button>
							<button className="win98-titlebar-btn">□</button>
							<button className="win98-titlebar-btn">×</button>
						</div>
					</div>
					<div className="p-4">
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
							<div>
								<h2 className="mb-2 text-2xl font-bold text-[#000080]">
									Interested in Partnering?
								</h2>
							</div>
							<div className="win98-inset p-4">
								<p className="mb-4 text-sm">
									RowdyCyberCon is very grateful for the
									amazing support of our partners. If you or
									your organization are interested in becoming
									a partner, click the link below to explore
									our Partner Packet for more information.
								</p>
								<div className="flex justify-center">
									<Link
										href={"https://tally.so/r/WOOr1Q"}
										target="_blank"
										rel="noopener noreferrer"
									>
										<button className="win98-btn">
											Partner Form
										</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
