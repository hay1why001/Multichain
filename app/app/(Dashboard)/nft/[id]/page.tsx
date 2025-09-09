"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Heart,
  Share2,
  ExternalLink,
  Clock,
  Eye,
  ShoppingCart,
  Gavel,
  Flag,
  MoreHorizontal,
  Copy,
  MessageCircle,
  Star,
} from "lucide-react"
import { useState } from "react"
import { DashboardNavigation } from "@/components/dashboard-navigation"

// Mock NFT data - in real app this would come from API based on ID
const mockNFT = {
  id: 1,
  name: "Cyber Punk #1234",
  collection: "Cyber Punks",
  price: "2.5 ETH",
  usdPrice: "$4,250",
  chain: "Ethereum",
  image: "/cyberpunk-nft-digital-art-detailed.jpg",
  rarity: "Rare",
  likes: 142,
  views: 1205,
  timeLeft: "2d 14h",
  isAuction: true,
  creator: {
    address: "0x1234...5678",
    name: "CyberArtist",
    avatar: "/avatar-profile.png",
  },
  owner: {
    address: "0x8765...4321",
    name: "NFTCollector",
    avatar: "/avatar-profile.png",
  },
  description:
    "A unique cyberpunk-themed NFT featuring futuristic elements and neon aesthetics. This piece represents the intersection of technology and art in the digital age.",
  attributes: [
    { trait_type: "Background", value: "Neon City", rarity: "15%" },
    { trait_type: "Eyes", value: "Cyber Blue", rarity: "8%" },
    { trait_type: "Hair", value: "Electric Purple", rarity: "12%" },
    { trait_type: "Accessories", value: "Neural Interface", rarity: "5%" },
    { trait_type: "Clothing", value: "Tech Jacket", rarity: "20%" },
  ],
  history: [
    { event: "Listed", price: "2.5 ETH", from: "NFTCollector", to: null, date: "2 hours ago" },
    { event: "Transfer", price: null, from: "CyberArtist", to: "NFTCollector", date: "1 day ago" },
    { event: "Minted", price: null, from: null, to: "CyberArtist", date: "3 days ago" },
  ],
  bids: [
    { bidder: "0xabcd...efgh", amount: "2.3 ETH", usdAmount: "$3,910", time: "1 hour ago" },
    { bidder: "0x9876...5432", amount: "2.1 ETH", usdAmount: "$3,570", time: "3 hours ago" },
    { bidder: "0x5555...1111", amount: "2.0 ETH", usdAmount: "$3,400", time: "5 hours ago" },
  ],
}

export default function NFTDetailPage() {
  const [isLiked, setIsLiked] = useState(false)
  const [bidAmount, setBidAmount] = useState("")

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* NFT Image */}
          <div className="animate-fade-in">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative aspect-square">
                  <img
                    src={mockNFT.image || "/placeholder.svg"}
                    alt={mockNFT.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Action Buttons Overlay */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-background/80 backdrop-blur-sm hover:scale-110 transition-transform duration-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-background/80 backdrop-blur-sm hover:scale-110 transition-transform duration-200"
                    >
                      <Flag className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-background/80 backdrop-blur-sm hover:scale-110 transition-transform duration-200"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Chain Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                      {mockNFT.chain}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <Eye className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <div className="font-semibold">{mockNFT.views}</div>
                  <div className="text-sm text-muted-foreground">Views</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Heart className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <div className="font-semibold">{mockNFT.likes}</div>
                  <div className="text-sm text-muted-foreground">Likes</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
                  <div className="font-semibold">{mockNFT.rarity}</div>
                  <div className="text-sm text-muted-foreground">Rarity</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* NFT Details */}
          <div className="animate-slide-up">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">{mockNFT.name}</h1>
                <Badge variant="secondary">{mockNFT.rarity}</Badge>
              </div>
              <p className="text-lg text-muted-foreground mb-4">{mockNFT.collection}</p>

              {/* Creator & Owner */}
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={mockNFT.creator.avatar || "/placeholder.svg"} />
                    <AvatarFallback>CA</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm text-muted-foreground">Creator</div>
                    <div className="font-medium">{mockNFT.creator.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={mockNFT.owner.avatar || "/placeholder.svg"} />
                    <AvatarFallback>NC</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm text-muted-foreground">Owner</div>
                    <div className="font-medium">{mockNFT.owner.name}</div>
                  </div>
                </div>
              </div>

              {/* Social Actions */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                  {mockNFT.likes + (isLiked ? 1 : 0)}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:scale-105 transition-transform duration-200 bg-transparent"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:scale-105 transition-transform duration-200 bg-transparent"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </div>

            {/* Price & Auction Info */}
            <Card className="mb-6">
              <CardContent className="p-6">
                {mockNFT.isAuction ? (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-destructive" />
                      <span className="text-sm text-muted-foreground">Auction ends in</span>
                    </div>
                    <div className="text-2xl font-bold text-destructive mb-4">{mockNFT.timeLeft}</div>
                    <div className="mb-4">
                      <div className="text-sm text-muted-foreground mb-1">Current bid</div>
                      <div className="text-3xl font-bold">{mockNFT.price}</div>
                      <div className="text-lg text-muted-foreground">{mockNFT.usdPrice}</div>
                    </div>
                    <div className="flex gap-3">
                      <Button className="flex-1 hover:scale-105 transition-transform duration-200">
                        <Gavel className="w-4 h-4 mr-2" />
                        Place Bid
                      </Button>
                      <Button
                        variant="outline"
                        className="hover:scale-105 transition-transform duration-200 bg-transparent"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Buy Now
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Price</div>
                    <div className="text-3xl font-bold mb-1">{mockNFT.price}</div>
                    <div className="text-lg text-muted-foreground mb-4">{mockNFT.usdPrice}</div>
                    <Button className="w-full hover:scale-105 transition-transform duration-200">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Buy Now
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="bids">Bids</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{mockNFT.description}</p>

                    <h4 className="font-semibold mb-4">Attributes</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {mockNFT.attributes.map((attr, index) => (
                        <div key={index} className="bg-muted rounded-lg p-3">
                          <div className="text-sm text-muted-foreground">{attr.trait_type}</div>
                          <div className="font-medium">{attr.value}</div>
                          <div className="text-xs text-muted-foreground">{attr.rarity} have this trait</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bids" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Bid History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockNFT.bids.map((bid, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>{bid.bidder.slice(2, 4).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{bid.bidder}</div>
                              <div className="text-sm text-muted-foreground">{bid.time}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{bid.amount}</div>
                            <div className="text-sm text-muted-foreground">{bid.usdAmount}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockNFT.history.map((event, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <div className="font-medium">{event.event}</div>
                            <div className="text-sm text-muted-foreground">
                              {event.from && `From ${event.from}`}
                              {event.to && ` to ${event.to}`}
                            </div>
                          </div>
                          <div className="text-right">
                            {event.price && <div className="font-bold">{event.price}</div>}
                            <div className="text-sm text-muted-foreground">{event.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <MessageCircle className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">New comment from @collector123</div>
                          <div className="text-sm text-muted-foreground">2 hours ago</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <Heart className="w-5 h-5 text-red-500" />
                        <div>
                          <div className="font-medium">Liked by @artlover</div>
                          <div className="text-sm text-muted-foreground">4 hours ago</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                        <Eye className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">Viewed by 15 users</div>
                          <div className="text-sm text-muted-foreground">6 hours ago</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
