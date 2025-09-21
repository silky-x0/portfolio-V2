import type React from "react"
import type { Metadata } from "next"
import { GeistMono } from "geist/font/mono"
import { GeistSans} from "geist/font/sans"
import { Suspense } from "react"
import "@/styles/globals.css"

export const metadata: Metadata = {
  title: "Akhilesh Tiwari",
  description: "Akhilesh Tiwari's Portfolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}

