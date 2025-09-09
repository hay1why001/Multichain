"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Eye,
  Share2,
  MoreHorizontal,
  Send,
  ShoppingCart,
  Coins,
  Lock,
  Unlock,
  ArrowUpRight,
  ArrowDownRight,
  Copy,
  ExternalLink,
  Grid3X3,
  List,
  Plus,
} from "lucide-react"
import Link from "next/link"
import { DashboardNavigation } from "@/components/dashboard-navigation"

// Mock portfolio data
const mockPortfolio = {
  totalValue: "45.7 ETH",
  totalValueUSD: "$77,690",
  change24h: "+5.2%",
  changeValue: "+2.3 ETH",
  nftCount: 127,
  collections: 23,
  wallets: [
    {
      address: "0x1234...5678",
      name: "Main Wallet",
      chain: "Ethereum",
      balance: "12.5 ETH",
      usdValue: "$21,250",
      nftCount: 89,
    },
    {
      address: "9x8765...4321",
      name: "Trading Wallet",
      chain: "Solana",
      balance: "450 SOL",
      usdValue: "$28,800",
      nftCount: 38,
    },
  ],
}

const mockNFTs = [
  {
    id: 1,
    name: "Cyber Punk #1234",
    collection: "Cyber Punks",
    image: "/cyberpunk-nft-digital-art.jpg",
    chain: "Ethereum",
    purchasePrice: "1.8 ETH",
    currentValue: "2.5 ETH",
    change: "+38.9%",
    isStaked: true,
    stakingRewards: "0.05 ETH",
    rarity: "Rare",
    lastSale: "2.3 ETH",
  },
  {
    id: 2,
    name: "Solana Monkey #567",
    collection: "Solana Monkeys",
    image: "/monkey-nft-colorful-digital-art.jpg",
    chain: "Solana",
    purchasePrice: "35 SOL",
    currentValue: "45 SOL",
    change: "+28.6%",
    isStaked: false,
    stakingRewards: null,
    rarity: "Epic",
    lastSale: "42 SOL",
  },
  {
    id: 3,
    name: "Digital Landscape #89",
    collection: "Digital Art",
    image: "/digital-landscape-abstract-art.jpg",
    chain: "Ethereum",
    purchasePrice: "0.8 ETH",
    currentValue: "1.2 ETH",
    change: "+50.0%",
    isStaked: true,
    stakingRewards: "0.02 ETH",
    rarity: "Common",
    lastSale: "1.1 ETH",
  },
]

const mockTransactions = [
  {
    id: 1,
    type: "purchase",
    nft: "Cyber Punk #1234",
    price: "2.5 ETH",
    from: "0xabcd...efgh",
    to: "You",
    date: "2 hours ago",
    txHash: "0x1234567890abcdef",
  },
  {
    id: 2,
    type: "sale",
    nft: "Abstract Vision #123",
    price: "1.8 ETH",
    from: "You",
    to: "0x9876...5432",
    date: "1 day ago",
    txHash: "0xfedcba0987654321",
  },
  {
    id: 3,
    type: "stake",
    nft: "Digital Landscape #89",
    price: null,
    from: "You",
    to: "Staking Pool",
    date: "3 days ago",
    txHash: "0xabcdef1234567890",
  },
]

export default function PortfolioPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterBy, setFilterBy] = useState("all")
  const [sortBy, setSortBy] = useState("value-high")
  const [selectedChain, setSelectedChain] = useState("all")

  const filteredNFTs = mockNFTs.filter((nft) => {
    const matchesChain = selectedChain === "all" || nft.chain.toLowerCase() === selectedChain
    const matchesFilter =
      filterBy === "all" ||
      (filterBy === "staked" && nft.isStaked) ||
      (filterBy === "unstaked" && !nft.isStaked) ||
      (filterBy === "profitable" && nft.change.startsWith("+"))
    return matchesChain && matchesFilter
  })

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Portfolio</h1>
          <p className="text-muted-foreground">Manage your NFT collection and track performance</p>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Total Portfolio Value
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-3xl font-bold">{mockPortfolio.totalValue}</div>
                <div className="text-xl text-muted-foreground">{mockPortfolio.totalValueUSD}</div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-green-600 bg-green-100 dark:bg-green-900/20">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {mockPortfolio.change24h}
                  </Badge>
                  <span className="text-sm text-muted-foreground">({mockPortfolio.changeValue})</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold">{mockPortfolio.nftCount}</div>
              <div className="text-sm text-muted-foreground">Total NFTs</div>
              <div className="mt-2">
                <Badge variant="outline">{mockPortfolio.collections} Collections</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold">{mockNFTs.filter((nft) => nft.isStaked).length}</div>
              <div className="text-sm text-muted-foreground">Staked NFTs</div>
              <div className="mt-2">
                <Badge variant="secondary" className="text-green-600">
                  <Coins className="w-3 h-3 mr-1" />
                  Earning
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Connected Wallets */}
        <Card className="mb-8 animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Wallet className="w-5 h-5" />
                Connected Wallets
              </span>
              <Button
                variant="outline"
                size="sm"
                className="hover:scale-105 transition-transform duration-200 bg-transparent"
              >
                <Plus className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockPortfolio.wallets.map((wallet, index) => (
                <div
                  key={wallet.address}
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{wallet.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{wallet.name}</div>
                        <div className="text-sm text-muted-foreground">{wallet.address}</div>
                      </div>
                    </div>
                    <Badge variant="outline">{wallet.chain}</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Balance</div>
                      <div className="font-medium">{wallet.balance}</div>
                      <div className="text-xs text-muted-foreground">{wallet.usdValue}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">NFTs</div>
                      <div className="font-medium">{wallet.nftCount}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex-1 hover:scale-105 transition-transform duration-200"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform duration-200">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform duration-200">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="collection" className="animate-slide-up">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="collection">Collection</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="staking">Staking</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Collection Tab */}
          <TabsContent value="collection" className="mt-6">
            {/* Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <Select value={selectedChain} onValueChange={setSelectedChain}>
                <SelectTrigger className="w-full lg:w-48 bg-background/50 backdrop-blur-sm">
                  <SelectValue placeholder="All Chains" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Chains</SelectItem>
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="solana">Solana</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-full lg:w-48 bg-background/50 backdrop-blur-sm">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All NFTs</SelectItem>
                  <SelectItem value="staked">Staked</SelectItem>
                  <SelectItem value="unstaked">Not Staked</SelectItem>
                  <SelectItem value="profitable">Profitable</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48 bg-background/50 backdrop-blur-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="value-high">Value: High to Low</SelectItem>
                  <SelectItem value="value-low">Value: Low to High</SelectItem>
                  <SelectItem value="change-high">Gain: High to Low</SelectItem>
                  <SelectItem value="newest">Recently Acquired</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex bg-muted rounded-lg p-1 lg:ml-auto">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* NFT Grid/List */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
              }`}
            >
              {filteredNFTs.map((nft, index) => (
                <PortfolioNFTCard key={nft.id} nft={nft} viewMode={viewMode} index={index} />
              ))}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTransactions.map((tx, index) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-4 bg-muted rounded-lg animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            tx.type === "purchase"
                              ? "bg-green-100 dark:bg-green-900/20"
                              : tx.type === "sale"
                                ? "bg-blue-100 dark:bg-blue-900/20"
                                : "bg-purple-100 dark:bg-purple-900/20"
                          }`}
                        >
                          {tx.type === "purchase" ? (
                            <ArrowDownRight className="w-5 h-5 text-green-600" />
                          ) : tx.type === "sale" ? (
                            <ArrowUpRight className="w-5 h-5 text-blue-600" />
                          ) : (
                            <Lock className="w-5 h-5 text-purple-600" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium capitalize">{tx.type}</div>
                          <div className="text-sm text-muted-foreground">{tx.nft}</div>
                          <div className="text-xs text-muted-foreground">{tx.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        {tx.price && <div className="font-medium">{tx.price}</div>}
                        <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform duration-200">
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Staking Tab */}
          <TabsContent value="staking" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="w-5 h-5" />
                    Staked NFTs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockNFTs
                      .filter((nft) => nft.isStaked)
                      .map((nft, index) => (
                        <div
                          key={nft.id}
                          className="flex items-center justify-between p-4 bg-muted rounded-lg animate-slide-up"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={nft.image || "/placeholder.svg"}
                              alt={nft.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <div className="font-medium">{nft.name}</div>
                              <div className="text-sm text-muted-foreground">{nft.collection}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-green-600">+{nft.stakingRewards}</div>
                            <div className="text-sm text-muted-foreground">Rewards earned</div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Staking Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">0.07 ETH</div>
                    <div className="text-sm text-muted-foreground">Total Rewards Earned</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Staked NFTs</span>
                      <span className="font-medium">{mockNFTs.filter((nft) => nft.isStaked).length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>APY</span>
                      <span className="font-medium text-green-600">12.5%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Next Reward</span>
                      <span className="font-medium">2d 14h</span>
                    </div>
                  </div>
                  <Button className="w-full hover:scale-105 transition-transform duration-200">
                    <Coins className="w-4 h-4 mr-2" />
                    Claim Rewards
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Invested</span>
                      <span className="font-medium">38.2 ETH</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Current Value</span>
                      <span className="font-medium">45.7 ETH</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Unrealized P&L</span>
                      <span className="font-medium text-green-600">+7.5 ETH (+19.6%)</span>
                    </div>
                    <Progress value={65} className="h-2" />
                    <div className="text-xs text-muted-foreground text-center">Portfolio growth over time</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Collections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Cyber Punks", value: "15.2 ETH", percentage: "33%" },
                      { name: "Digital Art", value: "12.8 ETH", percentage: "28%" },
                      { name: "Solana Monkeys", value: "8.9 SOL", percentage: "19%" },
                    ].map((collection, index) => (
                      <div key={collection.name} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{collection.name}</div>
                          <div className="text-sm text-muted-foreground">{collection.value}</div>
                        </div>
                        <Badge variant="secondary">{collection.percentage}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface PortfolioNFTCardProps {
  nft: (typeof mockNFTs)[0]
  viewMode: "grid" | "list"
  index: number
}

function PortfolioNFTCard({ nft, viewMode, index }: PortfolioNFTCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const isProfit = nft.change.startsWith("+")

  if (viewMode === "list") {
    return (
      <Card
        className="group hover:shadow-lg transition-all duration-300 animate-slide-up"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={nft.image || "/placeholder.svg"}
                alt={nft.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {nft.isStaked && (
                <div className="absolute top-1 right-1">
                  <Lock className="w-3 h-3 text-green-500" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <Link href={`/nft/${nft.id}`}>
                    <h3 className="font-semibold hover:text-primary transition-colors cursor-pointer truncate">
                      {nft.name}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">{nft.collection}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {nft.chain}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {nft.rarity}
                    </Badge>
                    {nft.isStaked && (
                      <Badge variant="outline" className="text-xs text-green-600">
                        <Lock className="w-3 h-3 mr-1" />
                        Staked
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold">{nft.currentValue}</div>
                  <div className={`text-sm ${isProfit ? "text-green-600" : "text-red-600"}`}>{nft.change}</div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="text-sm text-muted-foreground">
                  Bought for: <span className="font-medium">{nft.purchasePrice}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform duration-200">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform duration-200">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform duration-200">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-300 hover:scale-105 animate-scale-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <img
            src={nft.image || "/placeholder.svg"}
            alt={nft.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Staking Indicator */}
          {nft.isStaked && (
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-green-500/90 text-white backdrop-blur-sm">
                <Lock className="w-3 h-3 mr-1" />
                Staked
              </Badge>
            </div>
          )}

          {/* Chain Badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
              {nft.chain}
            </Badge>
          </div>

          {/* Performance Badge */}
          <div className="absolute bottom-3 right-3">
            <Badge
              variant="secondary"
              className={`backdrop-blur-sm ${isProfit ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"}`}
            >
              {isProfit ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {nft.change}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <Link href={`/nft/${nft.id}`}>
            <h3 className="font-semibold mb-1 hover:text-primary transition-colors cursor-pointer">{nft.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-3">{nft.collection}</p>

          <div className="space-y-2 mb-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Bought for</span>
              <span className="font-medium">{nft.purchasePrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Current value</span>
              <span className="font-medium">{nft.currentValue}</span>
            </div>
            {nft.isStaked && nft.stakingRewards && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Staking rewards</span>
                <span className="font-medium text-green-600">+{nft.stakingRewards}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 hover:scale-105 transition-transform duration-200 bg-transparent"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Sell
            </Button>
            <Button
              variant={nft.isStaked ? "secondary" : "outline"}
              size="sm"
              className="flex-1 hover:scale-105 transition-transform duration-200"
            >
              {nft.isStaked ? <Unlock className="w-4 h-4 mr-2" /> : <Lock className="w-4 h-4 mr-2" />}
              {nft.isStaked ? "Unstake" : "Stake"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
