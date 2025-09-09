"use client"

import "@solana/wallet-adapter-react-ui/styles.css"   // ✅ must be import, not require

import type { FC, ReactNode } from "react"
import { useMemo } from "react"
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { clusterApiUrl } from "@solana/web3.js"
import { WalletConnectWalletAdapter } from "@solana/wallet-adapter-walletconnect"

export const SolanaProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Mainnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  const wallets = useMemo(
    () => [
      new WalletConnectWalletAdapter({
        network,
        options: {
          projectId: "fdab3faa671628b64c07dfa8cfdb5ddc",
          metadata: {
            name: "MultiChain NFT Marketplace",
            description: "Trade NFTs across Ethereum and Solana",
            url: "http://192.168.0.153:3000",
            icons: ["https://your-dapp-url.com/icon.png"],
          },
        },
      }),
    ],
    [network]
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
}
