"use client"

import { useState } from "react"
import { DashboardNavigation } from "@/components/dashboard-navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Grid3X3, List, Heart, Share2, Clock, Eye, ShoppingCart, Gavel } from "lucide-react"
import Link from "next/link"

// Mock NFT data
const mockNFTs = [
  {
    id: 1,
    name: "Cyber Punk #1234",
    collection: "Cyber Punks",
    price: "2.5 ETH",
    usdPrice: "$4,250",
    chain: "Ethereum",
    image: "/cyberpunk-nft-digital-art.jpg",
    rarity: "Rare",
    likes: 142,
    views: 1205,
    timeLeft: "2d 14h",
    isAuction: true,
    creator: "0x1234...5678",
  },
  {
    id: 2,
    name: "Solana Monkey #567",
    collection: "Solana Monkeys",
    price: "45 SOL",
    usdPrice: "$2,880",
    chain: "Solana",
    image: "/monkey-nft-colorful-digital-art.jpg",
    rarity: "Epic",
    likes: 89,
    views: 892,
    timeLeft: null,
    isAuction: false,
    creator: "9x8765...4321",
  },
  {
    id: 3,
    name: "Digital Landscape #89",
    collection: "Digital Art",
    price: "1.2 ETH",
    usdPrice: "$2,040",
    chain: "Ethereum",
    image: "/digital-landscape-abstract-art.jpg",
    rarity: "Common",
    likes: 234,
    views: 1567,
    timeLeft: "5d 8h",
    isAuction: true,
    creator: "0xabcd...efgh",
  },
  {
    id: 4,
    name: "Cosmic Cat #456",
    collection: "Space Cats",
    price: "78 SOL",
    usdPrice: "$4,992",
    chain: "Solana",
    image: "/cosmic-cat-space-nft.jpg",
    rarity: "Legendary",
    likes: 567,
    views: 3421,
    timeLeft: null,
    isAuction: false,
    creator: "7x2468...1357",
  },
  {
    id: 5,
    name: "Abstract Vision #123",
    collection: "Modern Art",
    price: "0.8 ETH",
    usdPrice: "$1,360",
    chain: "Ethereum",
    image: "/abstract-modern-art-nft.jpg",
    rarity: "Rare",
    likes: 98,
    views: 743,
    timeLeft: "1d 3h",
    isAuction: true,
    creator: "0x9876...5432",
  },
  {
    id: 6,
    name: "Pixel Warrior #789",
    collection: "Pixel Heroes",
    price: "32 SOL",
    usdPrice: "$2,048",
    chain: "Solana",
    image: "/pixel-warrior-8bit-nft.jpg",
    rarity: "Epic",
    likes: 176,
    views: 1098,
    timeLeft: null,
    isAuction: false,
    creator: "5x1357...2468",
  },
]

export default function MarketplacePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedChain, setSelectedChain] = useState("all")
  const [sortBy, setSortBy] = useState("trending")
  const [priceRange, setPriceRange] = useState("all")

  const filteredNFTs = mockNFTs.filter((nft) => {
    const matchesSearch =
      nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      nft.collection.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesChain = selectedChain === "all" || nft.chain.toLowerCase() === selectedChain
    return matchesSearch && matchesChain
  })

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">NFT Marketplace</h1>
          <p className="text-muted-foreground">Discover, collect, and trade NFTs across multiple blockchains</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 animate-slide-up">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search NFTs, collections, or creators..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background/50 backdrop-blur-sm"
              />
            </div>

            {/* Chain Filter */}
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

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full lg:w-48 bg-background/50 backdrop-blur-sm">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="trending">Trending</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode Toggle */}
            <div className="flex bg-muted rounded-lg p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="flex-1"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="flex-1"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Advanced Filters */}
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="all">All NFTs</TabsTrigger>
              <TabsTrigger value="auctions">Auctions</TabsTrigger>
              <TabsTrigger value="buy-now">Buy Now</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              {/* NFT Grid */}
              <div
                className={`grid gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                }`}
              >
                {filteredNFTs.map((nft, index) => (
                  <NFTCard key={nft.id} nft={nft} viewMode={viewMode} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="auctions" className="mt-6">
              <div
                className={`grid gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                }`}
              >
                {filteredNFTs
                  .filter((nft) => nft.isAuction)
                  .map((nft, index) => (
                    <NFTCard key={nft.id} nft={nft} viewMode={viewMode} index={index} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="buy-now" className="mt-6">
              <div
                className={`grid gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                }`}
              >
                {filteredNFTs
                  .filter((nft) => !nft.isAuction)
                  .map((nft, index) => (
                    <NFTCard key={nft.id} nft={nft} viewMode={viewMode} index={index} />
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="new" className="mt-6">
              <div
                className={`grid gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                }`}
              >
                {filteredNFTs.slice(0, 3).map((nft, index) => (
                  <NFTCard key={nft.id} nft={nft} viewMode={viewMode} index={index} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="hover:scale-105 transition-transform duration-200 bg-transparent"
          >
            Load More NFTs
          </Button>
        </div>
      </div>
    </div>
  )
}

interface NFTCardProps {
  nft: (typeof mockNFTs)[0]
  viewMode: "grid" | "list"
  index: number
}

function NFTCard({ nft, viewMode, index }: NFTCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  if (viewMode === "list") {
    return (
      <Card
        className="group hover:shadow-lg transition-all duration-300 animate-slide-up"
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={nft.image || "/placeholder.svg"}
                alt={nft.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              {nft.isAuction && (
                <div className="absolute top-2 left-2">
                  <Badge variant="destructive" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {nft.timeLeft}
                  </Badge>
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
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-bold">{nft.price}</div>
                  <div className="text-sm text-muted-foreground">{nft.usdPrice}</div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {nft.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {nft.likes}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsLiked(!isLiked)}
                    className="hover:scale-110 transition-transform duration-200"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                  <Button variant="ghost" size="sm" className="hover:scale-110 transition-transform duration-200">
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button size="sm" className="hover:scale-105 transition-transform duration-200">
                    {nft.isAuction ? (
                      <>
                        <Gavel className="w-4 h-4 mr-2" />
                        Bid
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy
                      </>
                    )}
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

          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className="hover:scale-110 transition-transform duration-200"
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            </Button>
            <Button variant="secondary" size="sm" className="hover:scale-110 transition-transform duration-200">
              <Share2 className="w-4 h-4" />
            </Button>
            <Link href={`/nft/${nft.id}`}>
              <Button variant="secondary" size="sm" className="hover:scale-110 transition-transform duration-200">
                <Eye className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
              {nft.chain}
            </Badge>
            {nft.isAuction && (
              <Badge variant="destructive" className="bg-destructive/90 backdrop-blur-sm">
                <Clock className="w-3 h-3 mr-1" />
                {nft.timeLeft}
              </Badge>
            )}
          </div>

          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {nft.rarity}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <Link href={`/nft/${nft.id}`}>
            <h3 className="font-semibold mb-1 hover:text-primary transition-colors cursor-pointer">{nft.name}</h3>
          </Link>
          <p className="text-sm text-muted-foreground mb-3">{nft.collection}</p>

          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-bold">{nft.price}</div>
              <div className="text-sm text-muted-foreground">{nft.usdPrice}</div>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {nft.views}
              </div>
              <div className="flex items-center gap-1">
                <Heart className="w-4 h-4" />
                {nft.likes}
              </div>
            </div>
          </div>

          <Button
            className="w-full hover:scale-105 transition-transform duration-200"
            variant={nft.isAuction ? "outline" : "default"}
          >
            {nft.isAuction ? (
              <>
                <Gavel className="w-4 h-4 mr-2" />
                Place Bid
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy Now
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
