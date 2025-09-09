"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Wallet, User, Settings, LogOut, Bell, Menu, X, Zap, Vote, Store } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { useAppWallet } from "@/components/wallet-context"
import { useWallet } from "@solana/wallet-adapter-react"
import { WalletConnect } from "./wallet-connect"

const preWalletNavigation = [{ name: "Home", href: "/", icon: Home }]

const postWalletNavigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Marketplace", href: "/marketplace", icon: Store },
  { name: "Portfolio", href: "/portfolio", icon: Wallet },
  { name: "Community", href: "/community", icon: User },
  { name: "Governance", href: "/governance", icon: Vote },
]

const truncateAddress = (address: string) => {
  if (!address) return ""
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

export function DashboardNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const { wallets, setWallets } = useAppWallet()
  const primaryWallet = wallets.length > 0 ? wallets[0] : null
  const isConnected = !!primaryWallet

  const { disconnect: disconnectSolana } = useWallet()
  
  // --- THIS IS THE FIX ---
  // The navigation links are now based on the connection state, NOT the URL.
  // This makes them update at the same time as the user profile button.
  const navigation = isConnected ? postWalletNavigation : preWalletNavigation
  // -------------------------

  const handleDisconnect = async () => {
    if (wallets.some((w) => w.chain === "Solana")) {
      await disconnectSolana()
    }
    setWallets([])
    router.push("/")
  }

  return (
    <nav className="sticky top-0 z-50 glass-effect border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={isConnected ? "/dashboard" : "/"} className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              MultiChain
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={cn(
                      "flex items-center space-x-2 transition-all duration-200",
                      isActive ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-accent hover:scale-105",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Button>
                </Link>
              )
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {isConnected && primaryWallet ? (
              <>
                <div className="hidden sm:flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    Connected
                  </Badge>
                </div>
                <Button variant="ghost" size="sm" className="relative">
                  <Bell className="w-4 h-4" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">3</span>
                  </div>
                </Button>
                <ThemeToggle />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                        <AvatarFallback>{primaryWallet.walletName.substring(0, 1)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{primaryWallet.walletName}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {truncateAddress(primaryWallet.address)}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center cursor-pointer">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleDisconnect}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Disconnect Wallet
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <ThemeToggle />
                <div className="hidden sm:block">
                  <WalletConnect />
                </div>
              </>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              {isConnected ? (
                <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                  {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </Button>
              ) : (
                <div className="sm:hidden">
                    <WalletConnect />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}