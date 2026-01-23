import { getAllNavItems } from "@/lib/utils/server/redis";
import { DropdownMenuItem } from "@/components/shadcn/ui/dropdown-menu";
import Link from "next/link";

export default async function MobileNavBarLinks() {
	const navLinks = await getAllNavItems();

	return (
		<div className="cursor-pointer md:hidden">
			{navLinks.items.map((nav, key) => {
				return (
					<div key={nav.name}>
						{nav.enabled ? (
							<Link href={nav.url} target="_blank">
								<DropdownMenuItem className="text-md cursor-pointer rounded-none px-6 py-1.5 text-black hover:bg-[#000080] hover:text-white focus:bg-[#000080] focus:text-white">
									{nav.name}
								</DropdownMenuItem>
							</Link>
						) : null}
					</div>
				);
			})}
		</div>
	);
}

export const revalidate = 30;
