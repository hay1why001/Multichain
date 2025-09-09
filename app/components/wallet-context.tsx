'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define the shape of a connected wallet
interface ConnectedWallet {
  address: string;
  chain: string;
  walletName: string;
  isPrimary: boolean;
}

// Define the shape of the context's value
interface WalletContextType {
  wallets: ConnectedWallet[];
  setWallets: React.Dispatch<React.SetStateAction<ConnectedWallet[]>>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Define a key for local storage
const WALLET_STORAGE_KEY = 'multi_chain_connected_wallets';

export const AppWalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wallets, setWallets] = useState<ConnectedWallet[]>([]);
  const [isLoaded, setIsLoaded] = useState(false); // State to track initial load

  // EFFECT 1: Load wallets from Local Storage on initial component mount
  useEffect(() => {
    try {
      const storedWallets = window.localStorage.getItem(WALLET_STORAGE_KEY);
      if (storedWallets) {
        setWallets(JSON.parse(storedWallets));
      }
    } catch (error) {
      console.error("Failed to parse wallets from local storage", error);
    }
    // Mark as loaded once done
    setIsLoaded(true); 
  }, []); // Empty dependency array means this runs only once on mount

  // EFFECT 2: Save wallets to Local Storage whenever the wallets state changes
  useEffect(() => {
    // We only save after the initial load is complete to avoid overwriting
    // the loaded state with an empty array before it has a chance to load.
    if (isLoaded) {
      try {
        window.localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(wallets));
      } catch (error) {
        console.error("Failed to save wallets to local storage", error);
      }
    }
  }, [wallets, isLoaded]); // This runs every time `wallets` or `isLoaded` changes

  return (
    <WalletContext.Provider value={{ wallets, setWallets }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useAppWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useAppWallet must be used within an AppWalletProvider');
  }
  const isConnected = context.wallets.length > 0;
  
  return { ...context, isConnected };
};