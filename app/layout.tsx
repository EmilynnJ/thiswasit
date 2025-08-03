import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ClerkProvider } from "@clerk/nextjs"
import { Toaster } from "@/components/ui/toaster"
import { TopNavigation } from "@/components/navigation/top-navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SoulSeer - A Community of Gifted Psychics",
  description: "Connect with gifted psychics for spiritual guidance and readings",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Playfair+Display:wght@400;500;600;700&display=swap"
          />
        </head>
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <div className="min-h-screen">
              <TopNavigation />
              <main>{children}</main>
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
