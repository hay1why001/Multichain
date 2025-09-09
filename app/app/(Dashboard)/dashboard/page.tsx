"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  Wallet,
  Activity,
  Star,
  Users,
  Vote,
  Plus,
  ArrowUpRight,
  Trophy,
  Bell,
  Eye,
  Gavel,
  Coins,
  Zap,
} from "lucide-react"
import Link from "next/link"
import { useAppWallet } from "@/components/wallet-context"
import { DashboardNavigation } from "@/components/dashboard-navigation"

// Helper to truncate wallet addresses
const truncateAddress = (address: string) => {
  if (!address) return ""
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

export default function DashboardContent() {
  const { wallets } = useAppWallet()
  const primaryWallet = wallets.length > 0 ? wallets[0] : null

  // Simulated user role detection
  const [userRole, setUserRole] = useState<"buyer" | "seller" | "creator">("creator")

  const showBuyerModules = userRole === "buyer" || userRole === "creator"
  const showSellerModules = userRole === "seller" || userRole === "creator"
  const showCreatorModules = userRole === "creator"

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                Welcome back, {primaryWallet ? truncateAddress(primaryWallet.address) : "User"}
              </h1>
              <p className="text-muted-foreground">Here's what's happening with your NFTs today</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Link href="/mint">
                <Button size="sm" className="hover:scale-105 transition-all duration-200">
                  <Plus className="w-4 h-4 mr-2" />
                  Create NFT
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Wallet className="w-5 h-5 mr-2" />
                Connected Wallets & Balances
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {wallets.map((wallet) => (
                  <div key={wallet.address} className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                    <div>
                      <p className="text-sm text-muted-foreground">{wallet.walletName} ({wallet.chain})</p>
                      <p className="text-lg font-bold">{truncateAddress(wallet.address)}</p>
                    </div>
                    <Badge variant="secondary">Connected</Badge>
                  </div>
                ))}
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="text-sm text-muted-foreground">Marketplace Token</p>
                    <p className="text-lg font-bold">1,250 MCT</p>
                  </div>
                  <Badge variant="outline">Earned</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats - Dynamic based on role */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {showBuyerModules && (
            <Card className="hover:shadow-lg transition-all duration-300 animate-slide-up">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Portfolio Value</p>
                    <p className="text-2xl font-bold">24.5 ETH</p>
                    <p className="text-sm text-green-500 flex items-center mt-1">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      +12.5%
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card
            className="hover:shadow-lg transition-all duration-300 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">NFTs Owned</p>
                  <p className="text-2xl font-bold">127</p>
                  <p className="text-sm text-green-500 flex items-center mt-1">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +3
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Star className="w-6 h-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          {showSellerModules && (
            <Card
              className="hover:shadow-lg transition-all duration-300 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Sales</p>
                    <p className="text-2xl font-bold">45.2 ETH</p>
                    <p className="text-sm text-green-500 flex items-center mt-1">
                      <ArrowUpRight className="w-3 h-3 mr-1" />
                      +8.1%
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Card
            className="hover:shadow-lg transition-all duration-300 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Rewards Earned</p>
                  <p className="text-2xl font-bold">2,450</p>
                  <p className="text-sm text-green-500 flex items-center mt-1">
                    <ArrowUpRight className="w-3 h-3 mr-1" />
                    +156
                  </p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
            <TabsTrigger value="rewards">Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { action: "Sold", item: "Cyber Punk #1234", amount: "2.5 ETH", time: "2 hours ago", chain: "ETH" },
                    {
                      action: "Bought",
                      item: "Digital Art #567",
                      amount: "1.2 ETH",
                      time: "5 hours ago",
                      chain: "ETH",
                    },
                    {
                      action: "Staked",
                      item: "Space Cat #890",
                      amount: "Earning 0.1 ETH/day",
                      time: "1 day ago",
                      chain: "ETH",
                    },
                    { action: "Minted", item: "Solana Monkey #123", amount: "Free", time: "2 days ago", chain: "SOL" },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <div>
                        <p className="font-medium">
                          {activity.action} {activity.item}
                        </p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{activity.amount}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{activity.chain}</p>
                      </div>
                    </div>
                  ))}
                  <Link href="/portfolio">
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Activity
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Quick Access */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Quick Access
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/marketplace">
                      <Button
                        variant="outline"
                        className="w-full h-20 flex flex-col items-center justify-center bg-transparent hover:bg-muted/50"
                      >
                        <Eye className="w-6 h-6 mb-2" />
                        <span className="text-sm">Explore</span>
                      </Button>
                    </Link>
                    <Link href="/mint">
                      <Button
                        variant="outline"
                        className="w-full h-20 flex flex-col items-center justify-center bg-transparent hover:bg-muted/50"
                      >
                        <Plus className="w-6 h-6 mb-2" />
                        <span className="text-sm">Mint NFT</span>
                      </Button>
                    </Link>
                    <Link href="/community">
                      <Button
                        variant="outline"
                        className="w-full h-20 flex flex-col items-center justify-center bg-transparent hover:bg-muted/50"
                      >
                        <Users className="w-6 h-6 mb-2" />
                        <span className="text-sm">Social</span>
                      </Button>
                    </Link>
                    <Link href="/auctions">
                      <Button
                        variant="outline"
                        className="w-full h-20 flex flex-col items-center justify-center bg-transparent hover:bg-muted/50"
                      >
                        <Gavel className="w-6 h-6 mb-2" />
                        <span className="text-sm">Auctions</span>
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {showBuyerModules && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Gavel className="w-5 h-5 mr-2" />
                      Active Bids
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { item: "Cyber Art #456", bid: "1.5 ETH", status: "Winning", timeLeft: "2h 15m" },
                      { item: "Digital Cat #789", bid: "0.8 ETH", status: "Outbid", timeLeft: "5h 30m" },
                    ].map((bid, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div>
                          <p className="font-medium">{bid.item}</p>
                          <p className="text-sm text-muted-foreground">Ends in {bid.timeLeft}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={bid.status === "Winning" ? "default" : "destructive"}>{bid.status}</Badge>
                          <p className="text-sm font-medium mt-1">{bid.bid}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Coins className="w-5 h-5 mr-2" />
                      Staked NFTs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { item: "Space Punk #123", rewards: "0.05 ETH", apy: "12%" },
                      { item: "Digital Landscape #456", rewards: "0.03 ETH", apy: "8%" },
                    ].map((stake, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div>
                          <p className="font-medium">{stake.item}</p>
                          <p className="text-sm text-muted-foreground">APY: {stake.apy}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-500">{stake.rewards}</p>
                          <p className="text-xs text-muted-foreground">Earned</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {showSellerModules && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Sales Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">This Week</span>
                        <span className="font-medium">5.2 ETH</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">This Month</span>
                        <span className="font-medium">18.7 ETH</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Top Buyer</span>
                        <span className="font-medium">CryptoWhale</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Star className="w-5 h-5 mr-2" />
                      Minted NFTs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { item: "My Art #001", price: "2.0 ETH", status: "Listed" },
                      { item: "My Art #002", price: "1.5 ETH", status: "Sold" },
                    ].map((nft, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                        <div>
                          <p className="font-medium">{nft.item}</p>
                          <p className="text-sm text-muted-foreground">{nft.price}</p>
                        </div>
                        <Badge variant={nft.status === "Sold" ? "default" : "secondary"}>{nft.status}</Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Portfolio */}
          <TabsContent value="portfolio">
            <Card>
              <CardHeader>
                <CardTitle>Your NFT Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Wallet className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">Portfolio details will be loaded here</p>
                  <Link href="/portfolio">
                    <Button>View Full Portfolio</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>Activity Feed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Activity className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">Activity feed will be loaded here</p>
                  <Link href="/community">
                    <Button>View Community Feed</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social */}
          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Social Hub</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">Connect with the community</p>
                  <Link href="/community">
                    <Button>Join Community</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Governance */}
          <TabsContent value="governance">
            <Card>
              <CardHeader>
                <CardTitle>Governance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Vote className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">Participate in platform governance</p>
                  <Link href="/governance">
                    <Button>View Proposals</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rewards */}
          <TabsContent value="rewards">
            <Card>
              <CardHeader>
                <CardTitle>Rewards & Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Trophy className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">Track your rewards and achievements</p>
                  <Link href="/rewards">
                    <Button>View Rewards</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}