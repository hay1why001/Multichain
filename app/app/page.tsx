"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Zap, Shield, ArrowRight, Star, Activity, Crown, Trophy, Heart } from "lucide-react"
import { WalletConnect } from "@/components/wallet-connect"
import { DashboardNavigation } from "@/components/dashboard-navigation"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <DashboardNavigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center animate-fade-in">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Zap className="w-4 h-4 mr-2" />
              Multi-Chain NFT Trading
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Trade NFTs Across
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                {" "}
                Ethereum & Solana
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              The first unified marketplace for cross-chain NFT trading with advanced features like staking, governance,
              and social rewards.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <WalletConnect>
                <Button size="lg" className="group hover:scale-105 transition-all duration-200">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </WalletConnect>
              <Button
                variant="outline"
                size="lg"
                className="hover:scale-105 transition-all duration-200 bg-transparent"
                onClick={() => {
                  document.getElementById("featured-collections")?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                Explore Collections
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Total Volume", value: "2.4M ETH", icon: TrendingUp },
              { label: "Active Users", value: "45.2K", icon: Users },
              { label: "NFTs Traded", value: "128K", icon: Activity },
              { label: "Collections", value: "1.2K", icon: Star },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={stat.label}
                  className="text-center animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-center mb-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Trending NFTs</h2>
            <p className="text-muted-foreground">Discover the hottest NFTs across both networks</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Cyber Punk #1234", price: "2.5 ETH", chain: "Ethereum", likes: "234" },
              { name: "Solana Monkey #567", price: "45 SOL", chain: "Solana", likes: "189" },
              { name: "Digital Landscape #890", price: "1.8 ETH", chain: "Ethereum", likes: "156" },
              { name: "Space Cat #321", price: "32 SOL", chain: "Solana", likes: "298" },
            ].map((nft, index) => (
              <Card
                key={nft.name}
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105 animate-scale-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-4">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                    <div className="text-4xl">🎨</div>
                    <div className="absolute top-2 right-2 bg-black/50 rounded-full p-1">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2 text-sm">{nft.name}</h3>
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="font-medium">{nft.price}</span>
                    <Badge variant="outline" className="text-xs">
                      {nft.chain}
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Heart className="w-3 h-3 mr-1" />
                    {nft.likes} likes
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <WalletConnect>
              <Button size="lg" className="hover:scale-105 transition-all duration-200">
                Connect Wallet to Trade
              </Button>
            </WalletConnect>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section id="featured-collections" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Collections</h2>
            <p className="text-muted-foreground">Discover trending NFT collections across both networks</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Cyber Punks", floor: "2.5 ETH", chain: "Ethereum", items: "10K", volume: "1.2K ETH" },
              { name: "Solana Monkeys", floor: "45 SOL", chain: "Solana", items: "5K", volume: "890 SOL" },
              { name: "Digital Art", floor: "1.2 ETH", chain: "Ethereum", items: "2.5K", volume: "456 ETH" },
            ].map((collection, index) => (
              <Card
                key={collection.name}
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105 animate-scale-in cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-4xl">🎨</div>
                  </div>
                  <h3 className="font-semibold mb-2">{collection.name}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Floor:</span>
                      <span className="font-medium">{collection.floor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Volume:</span>
                      <span className="font-medium">{collection.volume}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{collection.items} items</span>
                      <Badge variant="outline">{collection.chain}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Community Highlights</h2>
            <p className="text-muted-foreground">Top contributors and community leaders</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Top Promoters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Crown className="w-5 h-5 text-yellow-500 mr-2" />
                  <h3 className="text-lg font-semibold">Top Promoters</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "CryptoArtist", points: "2,450", rank: 1 },
                    { name: "NFTCollector", points: "1,890", rank: 2 },
                    { name: "DigitalCreator", points: "1,567", rank: 3 },
                  ].map((user) => (
                    <div key={user.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">#{user.rank}</span>
                        </div>
                        <span className="font-medium">{user.name}</span>
                      </div>
                      <Badge variant="secondary">{user.points} pts</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Leaderboard Snippet */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Trophy className="w-5 h-5 text-orange-500 mr-2" />
                  <h3 className="text-lg font-semibold">Weekly Leaderboard</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { name: "TopTrader", volume: "45.2 ETH", badge: "🥇" },
                    { name: "NFTWhale", volume: "32.1 ETH", badge: "🥈" },
                    { name: "ArtLover", volume: "28.7 ETH", badge: "🥉" },
                  ].map((user) => (
                    <div key={user.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{user.badge}</span>
                        <span className="font-medium">{user.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{user.volume}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <WalletConnect>
              <Button
                variant="outline"
                size="lg"
                className="hover:scale-105 transition-all duration-200 bg-transparent"
              >
                Join Community
              </Button>
            </WalletConnect>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose MultiChain?</h2>
            <p className="text-muted-foreground">Advanced features for the modern NFT trader</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure Trading",
                description: "Advanced security protocols and smart contract audits ensure safe transactions.",
              },
              {
                icon: Zap,
                title: "Cross-Chain Support",
                description: "Seamlessly trade NFTs between Ethereum and Solana networks.",
              },
              {
                icon: Users,
                title: "Social Features",
                description: "Engage with the community through likes, comments, and social rewards.",
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={feature.title}
                  className="text-center animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-pretty">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Connect your wallet and join thousands of traders in the multichain NFT revolution
          </p>
          <WalletConnect>
            <Button size="lg" className="hover:scale-105 transition-all duration-200">
              Connect Wallet & Get Started
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </WalletConnect>
        </div>
      </section>
    </div>
  )
}
