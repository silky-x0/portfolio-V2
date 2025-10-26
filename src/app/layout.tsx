

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const migae = localFont({
  src: "../../public/fonts/MigaeSemibold-3zd2M.otf",
  variable: "--font-migae",
});

export const metadata: Metadata = {
	title: "Akhilesh",
	description: "A Portolio App",
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body suppressHydrationWarning={true} className={`${inter.variable} ${migae.variable} font-sans bg-black text-white scroll-smooth`}>
				<ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}

