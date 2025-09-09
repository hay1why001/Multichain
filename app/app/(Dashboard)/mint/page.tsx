"use client";

import React, { useState } from "react";
import { DashboardNavigation } from "@/components/dashboard-navigation"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// --- Solana Imports ---
import {
  useConnection,
  useWallet,
  useAnchorWallet,
} from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import {
  Keypair,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import idl from "@/idl/multichain_marketplace.json";
import { MultichainMarketplace } from "@/idl/multichain_marketplace";

// Define program IDs as constants
const MPL_TOKEN_METADATA_PROGRAM_ID = new PublicKey(
  "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s"
);

export default function MintPage() {
  const [nftData, setNftData] = useState({ name: "My NFT", symbol: "MNFT" });
  const [metadataUri, setMetadataUri] = useState(
    "https://arweave.net/k84e-28V33bJb6vSFTs_525V6Gk8Spws28mSoFcF6A"
  );

  const { connection } = useConnection();
  const { publicKey } = useWallet();
  const wallet = useAnchorWallet();
  const [isMinting, setIsMinting] = useState(false);

  const handleMint = async () => {
    if (!wallet || !publicKey) {
      alert("Please connect your Solana wallet!");
      return;
    }

    setIsMinting(true);
    try {
      const balance = await connection.getBalance(publicKey);
      if (balance < 0.05 * LAMPORTS_PER_SOL) {
        setIsMinting(false);
        alert("Your balance is too low to mint an NFT. Please request an airdrop from a faucet.");
        return;
      }
      
      const provider = new anchor.AnchorProvider(connection, wallet, {
        commitment: "confirmed",
      });
      const program = new Program<MultichainMarketplace>(idl as any, provider);

      const mintKeypair = Keypair.generate();

      console.log("--- Required Accounts ---");
      console.log("Payer (wallet):", wallet.publicKey.toBase58());
      console.log("New Mint Account:", mintKeypair.publicKey.toBase58());
      console.log("--------------------------");
      
      const signature = await program.methods
        .mintNft(nftData.name, nftData.symbol, metadataUri)
        .accounts({
          payer: wallet.publicKey,
          mint: mintKeypair.publicKey,
          // ✅ Provide the required metadata program ID as a PublicKey
          metadataProgram: MPL_TOKEN_METADATA_PROGRAM_ID,
        })
        .signers([mintKeypair])
        .rpc();

      console.log("Transaction confirmed with signature:", signature);
      alert(
        `Mint successful! View on Solscan: https://solscan.io/tx/${signature}?cluster=devnet`
      );

    } catch (error) {
      console.error("MINTING FAILED. Full error object:", error);
      let errorMessage = "Minting failed. See console for details.";
      if (error instanceof Error && error.message.includes("Transaction simulation failed")) {
          errorMessage = "Transaction simulation failed. This could be due to an incorrect program state or invalid accounts. Check the program logs on Solscan for more details.";
      } else if (error instanceof Error) {
          errorMessage = `Minting failed: ${error.message}`;
      }
      alert(errorMessage);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Solana NFT</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>NFT Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={nftData.name}
                    onChange={(e) =>
                      setNftData({ ...nftData, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="symbol">Symbol *</Label>
                  <Input
                    id="symbol"
                    value={nftData.symbol}
                    onChange={(e) =>
                      setNftData({ ...nftData, symbol: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="uri">Metadata URI *</Label>
                  <Input
                    id="uri"
                    value={metadataUri}
                    onChange={(e) => setMetadataUri(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Minting Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm">
                  <span>Network</span>
                  <Badge variant="outline">Solana Devnet</Badge>
                </div>
              </CardContent>
            </Card>
            <Button
              className="w-full"
              size="lg"
              onClick={handleMint}
              disabled={isMinting || !publicKey}
            >
              {isMinting
                ? "Minting..."
                : publicKey
                ? "Create NFT"
                : "Connect Wallet to Mint"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}