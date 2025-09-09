"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Clock, Eye, Heart, Gavel, TrendingUp, Users, Zap } from "lucide-react"
import Link from "next/link"
import { DashboardNavigation } from "@/components/dashboard-navigation"

// Mock auction data
const mockAuctions = [
  {
    id: 1,
    name: "Cyber Punk #1234",
    collection: "Cyber Punks",
    currentBid: "2.5 ETH",
    usdValue: "$4,250",
    chain: "Ethereum",
    image: "/cyberpunk-nft-digital-art.jpg",
    timeLeft: "2d 14h 32m",
    totalBids: 12,
    views: 1205,
    likes: 142,
    highestBidder: "0x1234...5678",
    startingPrice: "1.0 ETH",
    reservePrice: "2.0 ETH",
    reserveMet: true,
  },
  {
    id: 2,
    name: "Digital Landscape #89",
    collection: "Digital Art",
    currentBid: "1.8 ETH",
    usdValue: "$3,060",
    chain: "Ethereum",
    image: "/digital-landscape-abstract-art.jpg",
    timeLeft: "5d 8h 15m",
    totalBids: 8,
    views: 892,
    likes: 89,
    highestBidder: "0x8765...4321",
    startingPrice: "0.5 ETH",
    reservePrice: "1.5 ETH",
    reserveMet: true,
  },
  {
    id: 3,
    name: "Abstract Vision #123",
    collection: "Modern Art",
    currentBid: "0.8 ETH",
    usdValue: "$1,360",
    chain: "Ethereum",
    image: "/abstract-modern-art-nft.jpg",
    timeLeft: "1d 3h 45m",
    totalBids: 5,
    views: 743,
    likes: 98,
    highestBidder: "0x9876...5432",
    startingPrice: "0.3 ETH",
    reservePrice: "1.0 ETH",
    reserveMet: false,
  },
]

export default function AuctionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedChain, setSelectedChain] = useState("all")
  const [sortBy, setSortBy] = useState("ending-soon")
  const [filterBy, setFilterBy] = useState("all")

  const filteredAuctions = mockAuctions.filter((auction) => {
    const matchesSearch =
      auction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      auction.collection.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesChain = selectedChain === "all" || auction.chain.toLowerCase() === selectedChain
    const matchesFilter =
      filterBy === "all" ||
      (filterBy === "reserve-met" && auction.reserveMet) ||
      (filterBy === "no-reserve" && !auction.reservePrice)
    return matchesSearch && matchesChain && matchesFilter
  })

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Live Auctions</h1>
          <p className="text-muted-foreground">Bid on exclusive NFTs with time-limited auctions</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-slide-up">
          {[
            { label: "Active Auctions", value: "156", icon: Gavel },
            { label: "Total Volume", value: "2.4K ETH", icon: TrendingUp },
            { label: "Active Bidders", value: "1.2K", icon: Users },
            { label: "Ending Soon", value: "23", icon: Clock },
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-4 text-center">
                  <Icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Filters */}
        <div className="mb-8 animate-slide-up">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <Input
              placeholder="Search auctions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-background/50 backdrop-blur-sm"
            />

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
                <SelectItem value="all">All Auctions</SelectItem>
                <SelectItem value="reserve-met">Reserve Met</SelectItem>
                <SelectItem value="no-reserve">No Reserve</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48 bg-background/50 backdrop-blur-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ending-soon">Ending Soon</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="highest-bid">Highest Bid</SelectItem>
                <SelectItem value="most-bids">Most Bids</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="live" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
              <TabsTrigger value="live">Live Auctions</TabsTrigger>
              <TabsTrigger value="ending-soon">Ending Soon</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="live" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAuctions.map((auction, index) => (
                  <AuctionCard key={auction.id} auction={auction} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ending-soon" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAuctions
                  .filter((auction) => {
                    const timeLeft = auction.timeLeft
                    return timeLeft.includes("1d") || timeLeft.includes("h")
                  })
                  .map((auction, index) => (
                    <AuctionCard key={auction.id} auction={auction} index={index} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              <div className="text-center py-12">
                <Clock className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No completed auctions</h3>
                <p className="text-muted-foreground">Completed auctions will appear here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

interface AuctionCardProps {
  auction: (typeof mockAuctions)[0]
  index: number
}

function AuctionCard({ auction, index }: AuctionCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  const getTimeLeftColor = (timeLeft: string) => {
    if (timeLeft.includes("1d") || timeLeft.includes("h")) return "text-destructive"
    if (timeLeft.includes("2d") || timeLeft.includes("3d")) return "text-orange-500"
    return "text-muted-foreground"
  }

  return (
    <Card
      className="group hover:shadow-lg transition-all duration-300 hover:scale-105 animate-scale-in"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <img
            src={auction.image || "/placeholder.svg"}
            alt={auction.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Time Left Badge */}
          <div className="absolute top-3 left-3">
            <Badge variant="destructive" className="bg-destructive/90 backdrop-blur-sm">
              <Clock className="w-3 h-3 mr-1" />
              {auction.timeLeft}
            </Badge>
          </div>

          {/* Chain Badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
              {auction.chain}
            </Badge>
          </div>

          {/* Reserve Met Indicator */}
          {auction.reserveMet && (
            <div className="absolute bottom-3 left-3">
              <Badge variant="secondary" className="bg-green-500/90 text-white backdrop-blur-sm">
                <Zap className="w-3 h-3 mr-1" />
                Reserve Met
              </Badge>
            </div>
          )}
        </div>

        <div className="p-4">
          <Link href={`/nft/${auction.id}`}>
            <h3 className="font-semibold mb-1 hover:text-primary transition-colors cursor-pointer">{auction.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-3">{auction.collection}</p>

          {/* Current Bid */}
          <div className="mb-3">
            <div className="text-sm text-muted-foreground">Current bid</div>
            <div className="font-bold text-lg">{auction.currentBid}</div>
            <div className="text-sm text-muted-foreground">{auction.usdValue}</div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Gavel className="w-4 h-4" />
                {auction.totalBids}
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {auction.views}
              </div>
            </div>
            <div className={`font-medium ${getTimeLeftColor(auction.timeLeft)}`}>{auction.timeLeft}</div>
          </div>

          {/* Highest Bidder */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarFallback className="text-xs">{auction.highestBidder.slice(2, 4).toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="text-sm text-muted-foreground">Highest bidder</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className="hover:scale-110 transition-transform duration-200"
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
          </div>

          {/* Action Button */}
          <Link href={`/nft/${auction.id}`}>
            <Button className="w-full hover:scale-105 transition-transform duration-200">
              <Gavel className="w-4 h-4 mr-2" />
              Place Bid
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
