"use client";
import { useState } from "react";

interface FAQ {
	question: string;
	answer: string | JSX.Element;
}

const faqs: FAQ[] = [
	{
		question: "What activities will be there?",
		answer: "There will be workshops, a massive Capture the Flag, a King of the Hill competition, free food, and the ability to network with students and employers!",
	},
	{
		question: "Who can attend RowdyCyberCon?",
		answer: (
			<>
				RowdyCyberCon is open to all students attending San
				Antonio-based universities and colleges, regardless of major or
				skill level. If you attend an online degree program that is
				based in San Antonio, you are eligible to participate. We
				welcome anyone interested in learning more about cybersecurity.
				We have workshops and opportunities accessible for every level
				including beginners! Volunteers not fitting those qualifications
				are welcomed and can sign up{" "}
				<a
					href="https://forms.gle/G8t8UQxiQLGbFLVE9"
					target="_blank"
					rel="noopener noreferrer"
					className="text-[#0000FF] underline"
				>
					here
				</a>
				.
			</>
		),
	},
	{
		question: "How much does it cost?",
		answer: "RowdyCyberCon is free to all San Antonio-based students! Breakfast, lunch, dinner, and snacks will be served, so come hungry!",
	},
	{
		question: "Do I need experience to attend?",
		answer: "Nope! We have something for anyone and everyone. There are plenty of workshops that will help you learn new skills during the conference!",
	},
	{
		question: "How do we get to San Pedro I at and where should we park?",
		answer: (
			<>
				San Pedro I is located at UTSA's downtown campus at 506 Dolorosa
				St, San Antonio, TX 78204. We recommend driving, carpooling, or
				taking the VIA. All UTSA students get a free, unlimited bus pass
				that can be accessed{" "}
				<a
					href="https://www.utsa.edu/campusservices/runner/via.html"
					target="_blank"
					rel="noopener noreferrer"
					className="text-[#0000FF] underline"
				>
					here
				</a>
				. There are multiple convenient pickup/drop off points. There is
				free parking available in the Dolorosa lot (unmarked spaces
				only), D1, D2, and D3 or paid parking in the downtown garage or
				the Bexar County garage. A map of UTSA's downtown campus can be
				found{" "}
				<a
					href="https://www.utsa.edu/campusservices/docs/Park-Trans-Map_Downtown-Campus.pdf"
					target="_blank"
					rel="noopener noreferrer"
					className="text-[#0000FF] underline"
				>
					here
				</a>{" "}
				and UTSA's weekend parking rules can be found{" "}
				<a
					href="https://www.utsa.edu/campusservices/parking/permits.html#w1"
					target="_blank"
					rel="noopener noreferrer"
					className="text-[#0000FF] underline"
				>
					here
				</a>
				.
			</>
		),
	},
	{
		question: "What if I can't attend in-person?",
		answer: "All good! We have certain events available online. The CTF will also be fully available online. If you win/place, we can ship your prize to you! Make sure to enter number 47 on the registration form to note you are attending online.",
	},
	{
		question: "What is the event schedule and what time should I show up?",
		answer: (
			<>
				The schedule can be found{" "}
				<a
					href="https://rowdycon.notion.site/Schedule-daa0ea305ea34133ac68e517e185ea41?pvs=4"
					target="_blank"
					rel="noopener noreferrer"
					className="text-[#0000FF] underline"
				>
					here
				</a>
				. Check-in opens at 7:30am and runs until 8:30am when the first
				events start!
			</>
		),
	},
	{
		question: "What should I bring?",
		answer: "Bring your college ID, identification showing you are over 18 years old, a laptop, a charger, and anything else you may need. Popular items include monitors, power strips, and blankets! Items such as weapons, alcohol, and illegal drugs are not allowed.",
	},
	{
		question: "Still have questions?",
		answer: "Feel free reach out to publicly or privately on the discord channel or email us at admin@rowdycon.org!",
	},
];

export default function WorkWithUs() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggleFAQ = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<section className="mb-12 w-full py-8" id="FAQ">
			<div className="mx-auto max-w-6xl px-4">
				<div className="win98-window bg-[#c0c0c0]">
					<div className="win98-titlebar">
						<span>Frequently Asked Questions</span>
						<div className="flex">
							<button className="win98-titlebar-btn">_</button>
							<button className="win98-titlebar-btn">□</button>
							<button className="win98-titlebar-btn">×</button>
						</div>
					</div>

					<div className="p-4">
						<div className="win98-inset win98-scrollbar max-h-[500px] overflow-y-auto p-4">
							{faqs.map((faq, index: number) => (
								<div key={index} className="mb-2">
									{/* FAQ Item styled like Windows 98 Explorer folder */}
									<div
										className="win98-btn flex w-full cursor-pointer items-center justify-between px-3 py-2 text-left"
										onClick={() => toggleFAQ(index)}
									>
										<div className="flex items-center gap-2">
											<span className="text-sm">
												{openIndex === index
													? "📂"
													: "📁"}
											</span>
											<span className="text-sm font-bold">
												{faq.question}
											</span>
										</div>
										<span className="text-xs">
											{openIndex === index ? "−" : "+"}
										</span>
									</div>

									{/* Answer panel */}
									{openIndex === index && (
										<div className="ml-6 mt-1">
											<div className="border border-[#808080] bg-white p-3 text-sm">
												{faq.answer}
											</div>
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
