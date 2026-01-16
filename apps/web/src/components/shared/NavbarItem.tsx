import Link from "next/link";

interface NavbarItemProps {
	link: string;
	children: React.ReactNode;
}

export default function NavbarItem({ children, link }: NavbarItemProps) {
	return (
		<Link
			href={link}
			className="mx-2 text-muted-foreground hover:text-primary hover:underline"
			target="_blank"
		>
			{children}
		</Link>
	);
}
