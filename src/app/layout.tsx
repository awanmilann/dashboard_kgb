import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/providers/theme-provider"
import { SessionProvider } from "@/providers/session-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Dashboard Pemantauan KBG & TPKS",
  description:
    "Sistem pemantauan Kekerasan Berbasis Gender (KBG) dan Tindak Pidana Kekerasan Seksual (TPKS)",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
