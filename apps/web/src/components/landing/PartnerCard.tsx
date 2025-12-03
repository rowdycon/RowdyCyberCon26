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
			className="block"
		>
			<div className="win98-btn flex flex-col items-center justify-center space-y-2 p-4 text-center transition-transform hover:scale-105">
				{/* Partner Logo */}
				<div className="win98-inset bg-white p-2">
					<Image
						src={`/img/logo/${partner.logo}`}
						alt={`${partner.name} logo`}
						width={120}
						height={120}
						className="object-contain"
						style={{ imageRendering: "auto" }}
					/>
				</div>
				{/* Partner Name */}
				<h2 className="text-sm font-bold">{partner.name}</h2>
			</div>
		</Link>
	);
}

export default PartnerCard;
