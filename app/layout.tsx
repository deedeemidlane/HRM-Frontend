import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "react-hot-toast"
import { UserContextProvider } from "@/contexts/UserContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ADA - Human Resource Management",
  description: "Human Resource Management system for ADA company",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <Toaster />
        <UserContextProvider>{children}</UserContextProvider>
      </body>
    </html>
  )
}
