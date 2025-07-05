import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "@/components/Navbar";


export const metadata: Metadata = {
  title: "Akhilesh",
  description: "A Portolio App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white scroll-smooth"
      >
      <Navbar />
      <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
