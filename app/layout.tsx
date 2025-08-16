import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Wael Rezgui - Cybersecurity & Web Developer Portfolio",
  description:
    "Cybersecurity master's student and fullstack developer specializing in security audits, GRC, and web development. ISO 27001 Lead Auditor certified.",
  keywords: ["Cybersecurity", "Web Development", "ISO 27001", "Security Audit", "GRC", "Penetration Testing"],
  authors: [{ name: "Wael Rezgui" }],
  creator: "Wael Rezgui",
  openGraph: {
    title: "Wael Rezgui - Cybersecurity & Web Developer",
    description: "Professional portfolio showcasing cybersecurity expertise and web development projects",
    url: "https://waelrezguii.github.io/Portfolio/",
    siteName: "Wael Rezgui Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wael Rezgui - Cybersecurity & Web Developer",
    description: "Professional portfolio showcasing cybersecurity expertise and web development projects",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
