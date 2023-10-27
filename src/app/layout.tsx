import type { Metadata } from "next"

import "./globals.css"

import NextAuthProvider from "@/lib/auth/Provider"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar"
import { ThemeProvider } from "@/components/ThemeProvider"

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange>
          <NextAuthProvider>
            <main className="mx-auto max-w-3xl p-6 md:p-0">
              <Navbar />
              {children}
            </main>
          </NextAuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
