"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import WinTitleBar from "../shared/WinTitleBar";

type Participant = {
	userId: string;
	firstName: string;
	lastName: string;
	points: number;
};

function pickWinner(participants: Participant[]): Participant {
	const total = participants.reduce((s, p) => s + p.points, 0);
	let r = Math.random() * total;
	for (const p of participants) {
		r -= p.points;
		if (r <= 0) return p;
	}
	return participants[participants.length - 1];
}

export function RaffleClient({
	participants,
}: {
	participants: Participant[];
}) {
	const [winner, setWinner] = useState<Participant | null>(null);
	const [isSpinning, setIsSpinning] = useState(false);
	const [drumName, setDrumName] = useState("");
	const [history, setHistory] = useState<Participant[]>([]);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

	const total = useMemo(
		() => participants.reduce((s, p) => s + p.points, 0),
		[participants],
	);

	const draw = useCallback(() => {
		if (isSpinning) return;
		setWinner(null);
		setIsSpinning(true);

		const chosen = pickWinner(participants);

		intervalRef.current = setInterval(() => {
			const p =
				participants[Math.floor(Math.random() * participants.length)];
			setDrumName(`${p.firstName} ${p.lastName}`);
		}, 80);

		setTimeout(() => {
			if (intervalRef.current) clearInterval(intervalRef.current);
			setIsSpinning(false);
			setWinner(chosen);
			setDrumName(`${chosen.firstName} ${chosen.lastName}`);
			setHistory((h) => [chosen, ...h.slice(0, 19)]);
		}, 2500);
	}, [isSpinning, participants]);

	return (
		<div>
			<div className="win98-window mx-auto max-w-2xl">
				<WinTitleBar title="Raffle Draw" />

				<div className="border-2 border-b-[#808080] border-l-white border-r-[#808080] border-t-white bg-[#d4d0c8] p-2">
					<div className="mb-2 flex gap-2 text-[11px]">
						<div className="win98-inset px-2 py-1">
							<span className="text-[#808080]">
								Participants:{" "}
							</span>
							<span className="font-bold">
								{participants.length.toLocaleString()}
							</span>
						</div>
						<div className="win98-inset px-2 py-1">
							<span className="text-[#808080]">
								Total tickets:{" "}
							</span>
							<span className="font-bold">
								{total.toLocaleString()}
							</span>
						</div>
					</div>

					<fieldset className="win98-fieldset mb-2">
						<legend className="px-1 text-[11px]">Draw</legend>
						<div className="flex items-center gap-2 p-1">
							<div className="win98-inset flex h-7 flex-1 items-center overflow-hidden px-2 text-[11px] font-bold">
								{isSpinning ? (
									<span className="text-[#000080]">
										{drumName || "..."}
									</span>
								) : winner ? (
									<span className="text-[#000080]">
										{winner.firstName} {winner.lastName}
									</span>
								) : (
									<span className="text-[#808080]">
										Press "Draw" to pick a winner
									</span>
								)}
							</div>
							<button
								onClick={draw}
								disabled={isSpinning}
								className="win98-btn px-4 py-1 text-[11px] disabled:opacity-50"
							>
								{isSpinning ? "Drawing..." : "Draw"}
							</button>
						</div>
						{winner && !isSpinning && (
							<div className="mx-1 mb-1 border border-[#808080] bg-[#ffffe1] px-2 py-1 text-[11px]">
								🏆{" "}
								<strong>
									{winner.firstName} {winner.lastName}
								</strong>{" "}
								— {winner.points.toLocaleString()} tickets
							</div>
						)}
					</fieldset>

					{history.length > 0 && (
						<fieldset className="win98-fieldset">
							<legend className="px-1 text-[11px]">
								History
							</legend>
							<div className="win98-inset m-1 bg-white">
								<table className="w-full text-[11px]">
									<tbody>
										{history.map((w, i) => (
											<tr
												key={i}
												className={
													i % 2 === 0
														? "bg-white"
														: "bg-[#f0f0f0]"
												}
											>
												<td className="w-6 px-1.5 py-0.5 text-[#808080]">
													#{history.length - i}
												</td>
												<td className="px-1.5 py-0.5">
													{w.firstName} {w.lastName}
												</td>
												<td className="px-1.5 py-0.5 text-right text-[#808080]">
													{w.points.toLocaleString()}{" "}
													tickets
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</fieldset>
					)}

					<div className="mt-2 flex gap-1">
						<div className="win98-inset flex-1 px-1.5 py-0.5 text-[10px] text-[#808080]">
							{isSpinning
								? "Drawing..."
								: winner
									? `Winner: ${winner.firstName} ${winner.lastName}`
									: "Ready"}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
