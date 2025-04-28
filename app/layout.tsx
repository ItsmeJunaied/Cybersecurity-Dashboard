import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { DashboardLayout } from "@/components/dashboard-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Cybersecurity Dashboard",
  description: "Professional cybersecurity monitoring dashboard",
    generator: 'Junaied Hossain'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <DashboardLayout>{children}</DashboardLayout>
        </ThemeProvider>
      </body>
    </html>
  )
}
