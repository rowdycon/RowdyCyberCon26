import Link from "next/link";

interface NavbarItemProps {
	link: string;
	children: React.ReactNode;
}

export default function NavbarItem({ children, link }: NavbarItemProps) {
	return (
		<Link href={link} target="_blank">
			<button className="win98-btn flex h-8 items-center">
				{children}
			</button>
		</Link>
	);
}
