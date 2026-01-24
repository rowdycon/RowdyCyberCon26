import partnerData from "./partners.json";
import PartnerCard from "./PartnerCard";
import WinTitleBar from "../shared/WinTitleBar";

export default function Partners() {
	return (
		<section className="w-full py-8" id="Partners">
			<div className="mx-auto max-w-6xl px-4">
				<div className="mb-8 border-2 bg-card text-card-foreground">
					<WinTitleBar title="Our Partners" />
					<div className="p-4">
						<div className="win98-inset p-6">
							<div className="grid grid-cols-2 place-items-center gap-6 sm:grid-cols-3 md:grid-cols-4">
								{partnerData.partners.map((partner) => (
									<PartnerCard
										key={partner.name}
										partner={partner}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
