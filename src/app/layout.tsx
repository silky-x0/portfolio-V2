import type React from "react"
import type { Metadata } from "next"
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
      <body>
        <Suspense fallback={null}>{children}</Suspense>
      </body>
    </html>
  )
}

