"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Wallet as WalletIcon, CheckCircle, ArrowLeft, ExternalLink, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useWallet, Wallet } from "@solana/wallet-adapter-react"
import { WalletReadyState } from "@solana/wallet-adapter-base"
import { useAppWallet } from "@/components/wallet-context"
import { useIsMobile } from "@/hooks/use-is-mobile" // <-- IMPORT THE HOOK
import Image from "next/image"

// ... (EIP-6963 types, ConnectedWallet interface, NoWalletInstallCard component are unchanged)

const WalletCard = ({ icon, name, description, chain, onClick }: { icon: string, name:string, description: string, chain: string, onClick: () => void }) => (
    <Card className="bg-background cursor-pointer hover:bg-muted/50 transition-colors" onClick={onClick}>
        <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <Image src={icon.trimStart()} alt={`${name} icon`} width={40} height={40} className="rounded-md" />
                <div>
                    <h3 className="font-semibold">{name}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <span className="text-xs bg-muted px-2 py-1 rounded-full">{chain}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
        </CardContent>
    </Card>
);

// Remove the incomplete WalletConnect and use FullWalletConnect instead
export { FullWalletConnect as WalletConnect };

// For clarity, here is the full, complete component with the changes integrated.

const NoWalletInstallCard = ({ walletName, installUrl, chain }: { walletName: string, installUrl: string, chain: string }) => (
    <div className="text-center p-4 bg-background/50 rounded-lg">
        <AlertCircle className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
        <h4 className="font-semibold mb-1">No {chain} wallet found</h4>
        <p className="text-sm text-muted-foreground mb-4">Please install {walletName} to continue, then refresh the page.</p>
        <a href={installUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="w-full">
                Install {walletName}
                <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
        </a>
    </div>
);

interface EIP6963ProviderInfo { uuid: string; name: string; icon: string; rdns: string; }
interface EIP6963ProviderDetail { info: EIP6963ProviderInfo; provider: any; }
interface ConnectedWallet { address: string; chain: string; walletName: string; isPrimary: boolean; }
interface WalletConnectProps { children?: React.ReactNode; }

export function FullWalletConnect({ children }: WalletConnectProps) {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<'chain-select' | 'wallet-select'>('chain-select');
  const [selectedChain, setSelectedChain] = useState<'Ethereum' | 'Solana' | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectingWalletName, setConnectingWalletName] = useState<string | null>(null);
  const [solanaWalletToConnect, setSolanaWalletToConnect] = useState<string | null>(null);
  const [eip6963Providers, setEip6963Providers] = useState<EIP6963ProviderDetail[]>([]);
  const { wallets: solanaWalletsFromHook } = useWallet();
  const { wallets, setWallets } = useAppWallet();
  const router = useRouter();
  const { select, connect, publicKey, wallet: connectedSolanaWallet, disconnect, connecting } = useWallet();

  const availableSolanaWallets = solanaWalletsFromHook.filter((wallet) => {
    if (isMobile) {
      return wallet.adapter.readyState === WalletReadyState.Installed || wallet.adapter.name === 'WalletConnect';
    }
    return wallet.adapter.readyState === WalletReadyState.Installed;
  });

  useEffect(() => {
    function onAnnounceProvider(event: CustomEvent<EIP6963ProviderDetail>) {
      setEip6963Providers(prev => {
        if (prev.some(p => p.info.uuid === event.detail.info.uuid)) return prev;
        return [...prev, event.detail];
      });
    }
    window.addEventListener("eip6963:announceProvider", onAnnounceProvider as EventListener);
    window.dispatchEvent(new Event("eip6963:requestProvider"));
    return () => window.removeEventListener("eip6963:announceProvider", onAnnounceProvider as EventListener);
  }, []);

  useEffect(() => {
    if (publicKey && connectedSolanaWallet && connectedSolanaWallet.adapter.name === connectingWalletName) {
      const newWallet: ConnectedWallet = {
        address: publicKey.toBase58(),
        chain: "Solana",
        walletName: connectedSolanaWallet.adapter.name,
        isPrimary: true,
      };
      setWallets([newWallet]);
      handleSuccess();
    }
  }, [publicKey, connectedSolanaWallet, connectingWalletName]);

  useEffect(() => {
    if (solanaWalletToConnect && connectedSolanaWallet && connectedSolanaWallet.adapter.name === solanaWalletToConnect && !connecting && !publicKey) {
      connect().catch(error => {
        handleFailure(solanaWalletToConnect, error);
      });
    }
  }, [solanaWalletToConnect, connectedSolanaWallet, connect, connecting, publicKey]);

  const handleSuccess = () => { setTimeout(() => { setIsOpen(false); router.push("/dashboard"); setTimeout(() => { setIsConnecting(false); setConnectingWalletName(null); handleGoBack(); }, 500); }, 1500); };
  const handleFailure = (walletName: string, error: any) => { if (error.name !== 'WalletConnectionError') { console.error(`${walletName} connection failed:`, error); } setIsConnecting(false); setConnectingWalletName(null); setSolanaWalletToConnect(null); };
  const handleGoBack = () => { setView('chain-select'); setSelectedChain(null); };
  const handleChainSelect = (chain: 'Ethereum' | 'Solana') => { setSelectedChain(chain); setView('wallet-select'); };

  const connectEthereumWallet = async (providerDetail: EIP6963ProviderDetail) => {
    setIsConnecting(true); setConnectingWalletName(providerDetail.info.name);
    if (connectedSolanaWallet) await disconnect(); setWallets([]);
    try {
      const accounts = await providerDetail.provider.request({ method: "eth_requestAccounts" });
      const newWallet: ConnectedWallet = { address: accounts[0], chain: "Ethereum", walletName: providerDetail.info.name, isPrimary: true, };
      setWallets([newWallet]); handleSuccess();
    } catch (error) { handleFailure(providerDetail.info.name, error); }
  };
  const connectSolanaWallet = async (solanaWallet: Wallet) => {
    setIsConnecting(true); setConnectingWalletName(solanaWallet.adapter.name);
    if (connectedSolanaWallet) await disconnect(); setWallets([]);
    setSolanaWalletToConnect(solanaWallet.adapter.name); select(solanaWallet.adapter.name);
  };
  const connectionSuccessful = isConnecting && wallets.some(w => w.walletName === connectingWalletName);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) handleGoBack(); }}>
      <DialogTrigger asChild>{children || <Button><WalletIcon className="w-4 h-4 mr-2" />Connect Wallet</Button>}</DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#1a202c] border-slate-700 text-white">
        {!isConnecting ? (
          <>
            <DialogHeader className="relative">
              {view === 'wallet-select' && (<Button variant="ghost" size="sm" className="absolute left-0 top-0 h-auto p-1 text-slate-400 hover:text-white" onClick={handleGoBack}><ArrowLeft className="w-4 h-4" /></Button>)}
              <DialogTitle>Connect Your Wallet</DialogTitle>
              <DialogDescription className="text-slate-400">{view === 'chain-select' ? 'Choose a network to start' : `Choose a wallet to connect with ${selectedChain}`}</DialogDescription>
            </DialogHeader>
            <div className="space-y-3 pt-2">
              {view === 'chain-select' && (<><WalletCard name="Ethereum" description="Connect using an Ethereum wallet" chain="Ethereum" icon="/eth-logo.svg" onClick={() => handleChainSelect('Ethereum')} /><WalletCard name="Solana" description="Connect using a Solana wallet" chain="Solana" icon="/sol-logo.svg" onClick={() => handleChainSelect('Solana')} /></>)}
              {view === 'wallet-select' && selectedChain === 'Ethereum' && (eip6963Providers.length > 0 ? (eip6963Providers.map(provider => (<WalletCard key={provider.info.uuid} name={provider.info.name} description={isMobile ? `Open in ${provider.info.name}` : `Connect using ${provider.info.name}`} chain="Ethereum" icon={provider.info.icon} onClick={() => connectEthereumWallet(provider)} />))) : (<NoWalletInstallCard chain="Ethereum" walletName="MetaMask" installUrl="https://metamask.io/download/" />))}
              {view === 'wallet-select' && selectedChain === 'Solana' && (availableSolanaWallets.length > 0 ? (availableSolanaWallets.map(solWallet => (<WalletCard key={solWallet.adapter.name} name={solWallet.adapter.name} description={isMobile ? `Open in ${solWallet.adapter.name}` : `Connect using ${solWallet.adapter.name}`} chain="Solana" icon={solWallet.adapter.icon} onClick={() => connectSolanaWallet(solWallet)} />))) : (<NoWalletInstallCard chain="Solana" walletName="Phantom" installUrl="https://phantom.app/download/" />))}
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            {connectionSuccessful ? (<div className="mb-4"><div className="w-16 h-16 bg-green-900/50 border border-green-700 rounded-full flex items-center justify-center mx-auto mb-3"><CheckCircle className="w-8 h-8 text-green-400" /></div><h3 className="font-medium mb-2">Wallet Connected!</h3><p className="text-sm text-slate-400 mb-4">Redirecting to your dashboard...</p></div>) : (<><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div><p className="text-sm text-slate-400">Connecting to {connectingWalletName}... <br /> Please approve the connection in your wallet.</p></>)}
          </div>
        )}
        <div className="text-center text-xs text-slate-500 pt-2">By connecting a wallet, you agree to our Terms of Service and Privacy Policy</div>
      </DialogContent>
    </Dialog>
  );
}