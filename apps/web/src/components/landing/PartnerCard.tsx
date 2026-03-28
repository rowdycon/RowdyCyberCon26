import React from "react";
import Link from "next/link";
import Image from "next/image";

type Partner = {
	name: string;
	logo: string;
	url: string;
	tier: string;
};

function PartnerCard({ partner }: { partner: Partner }) {
	return (
		<Link
			href={partner.url}
			target="_blank"
			rel="noopener noreferrer"
			className="block h-full"
		>
			<div className="win98-btn flex h-full flex-col items-center p-4 text-center transition-transform hover:scale-105">
				<div className="win98-inset mb-3 flex aspect-square w-full max-w-[140px] items-center justify-center bg-white p-2">
					<Image
						src={`/img/logo/${partner.logo}`}
						alt={`${partner.name} logo`}
						width={120}
						height={120}
						className="max-h-full max-w-full object-contain"
						style={{ imageRendering: "auto" }}
					/>
				</div>

				<div className="flex flex-1 items-center justify-center">
					<h2 className="text-xs font-bold leading-tight md:text-sm">
						{partner.name}
					</h2>
				</div>
			</div>
		</Link>
	);
}

export default PartnerCard;
