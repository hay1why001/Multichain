import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import "./globals.css"
import { SolanaProvider } from "@/components/solana-provider"
import { AppWalletProvider } from "@/components/wallet-context" // <-- 1. IMPORT IT

export const metadata: Metadata = {
  title: "MultiChain NFT Marketplace",
  description: "Trade NFTs across Ethereum and Solana networks",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            storageKey="nft-marketplace-theme"
            disableTransitionOnChange={false}
          >
            <SolanaProvider>
              <AppWalletProvider> {/* <-- 2. WRAP YOUR CHILDREN */}
                {children}
              </AppWalletProvider>
            </SolanaProvider>
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}