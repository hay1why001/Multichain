"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAppWallet } from "@/components/wallet-context"
import { DashboardNavigation } from "@/components/dashboard-navigation"
import { useWallet } from "@solana/wallet-adapter-react" // <-- 1. IMPORT SOLANA HOOK

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { wallets, setWallets, isConnected } = useAppWallet()
  
  // 2. GET THE STATE FROM THE SOLANA WALLET ADAPTER
  const { publicKey, wallet } = useWallet()

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // 3. NEW "SYNC" EFFECT
  // This effect runs when the Solana adapter's state changes.
  // It ensures our application state is in sync with the adapter's auto-connect feature.
  useEffect(() => {
    // Check if:
    // 1. The Solana adapter has a connected public key and wallet info.
    // 2. Our application's state does NOT already include this Solana wallet.
    const solanaWalletInAppContext = wallets.some(
      (w) => w.chain === "Solana" && w.address === publicKey?.toBase58()
    );

    if (publicKey && wallet && !solanaWalletInAppContext) {
      const newWallet = {
        address: publicKey.toBase58(),
        chain: "Solana",
        walletName: wallet.adapter.name,
        isPrimary: wallets.length === 0,
      };

      // Add the auto-connected wallet to our global state.
      // We filter out any previous Solana wallets to avoid duplicates.
      setWallets((prev) => [...prev.filter(w => w.chain !== 'Solana'), newWallet]);
    }
  }, [publicKey, wallet, wallets, setWallets]); // Dependencies that trigger the check

  // The Route Guard (this logic remains the same)
  useEffect(() => {
    if (isClient && !isConnected) {
      router.replace("/")
    }
  }, [isConnected, isClient, router])

  if (!isClient || !isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavigation />
      {children}
    </div>
  )
}