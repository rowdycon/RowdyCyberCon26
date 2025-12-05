import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cookies } from "next/headers";
import { defaultTheme } from "config";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const theme = cookies().get("hk_theme")?.value || defaultTheme;
	return (
		<ClerkProvider>
			<html lang="en">
				<body className={theme === "dark" ? "dark" : ""}>
					{children}
					<SpeedInsights />
				</body>
			</html>
		</ClerkProvider>
	);
}

export const runtime = "edge";
