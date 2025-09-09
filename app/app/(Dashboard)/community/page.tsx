"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  Users,
  Trophy,
  Star,
  Eye,
  Send,
  ImageIcon,
  Video,
  Gift,
  Zap,
  Target,
} from "lucide-react"
import Link from "next/link"
import { DashboardNavigation } from "@/components/dashboard-navigation"

// Mock community data
const mockPosts = [
  {
    id: 1,
    author: {
      name: "CryptoArtist",
      avatar: "/avatar-profile.png",
      address: "0x1234...5678",
      verified: true,
      level: "Diamond",
    },
    content: "Just minted my latest piece! What do you think about this cyberpunk aesthetic? 🚀",
    image: "/cyberpunk-nft-digital-art.jpg",
    nft: {
      name: "Cyber Vision #001",
      collection: "Future Visions",
      price: "2.5 ETH",
    },
    timestamp: "2 hours ago",
    likes: 142,
    comments: 23,
    shares: 8,
    isLiked: false,
    tags: ["cyberpunk", "digital-art", "ethereum"],
  },
  {
    id: 2,
    author: {
      name: "NFTCollector",
      avatar: "/avatar-profile.png",
      address: "0x8765...4321",
      verified: false,
      level: "Gold",
    },
    content: "Amazing community event yesterday! Met so many talented creators. The future of NFTs is bright! 💎",
    image: null,
    nft: null,
    timestamp: "5 hours ago",
    likes: 89,
    comments: 15,
    shares: 12,
    isLiked: true,
    tags: ["community", "event", "networking"],
  },
  {
    id: 3,
    author: {
      name: "DigitalDreamer",
      avatar: "/avatar-profile.png",
      address: "0x9876...5432",
      verified: true,
      level: "Platinum",
    },
    content: "New drop coming soon! Sneak peek of my upcoming collection. Who's excited? 🎨",
    image: "/abstract-modern-art-nft.jpg",
    nft: {
      name: "Abstract Dreams #042",
      collection: "Dream Series",
      price: "1.8 ETH",
    },
    timestamp: "1 day ago",
    likes: 234,
    comments: 45,
    shares: 18,
    isLiked: false,
    tags: ["abstract", "upcoming", "collection"],
  },
]

const mockLeaderboard = [
  {
    rank: 1,
    user: "CryptoWhale",
    avatar: "/avatar-profile.png",
    points: 15420,
    level: "Diamond",
    badge: "Top Promoter",
  },
  {
    rank: 2,
    user: "ArtMaster",
    avatar: "/avatar-profile.png",
    points: 12890,
    level: "Platinum",
    badge: "Creator",
  },
  {
    rank: 3,
    user: "NFTHunter",
    avatar: "/avatar-profile.png",
    points: 11250,
    level: "Gold",
    badge: "Collector",
  },
]

const mockChallenges = [
  {
    id: 1,
    title: "Share 5 NFTs This Week",
    description: "Promote NFTs from the community and earn bonus points",
    reward: "500 Points + Exclusive Badge",
    progress: 3,
    total: 5,
    timeLeft: "4 days",
    type: "weekly",
  },
  {
    id: 2,
    title: "First Time Minter",
    description: "Create and mint your first NFT on the platform",
    reward: "1000 Points + Minter Badge",
    progress: 0,
    total: 1,
    timeLeft: "No limit",
    type: "achievement",
  },
  {
    id: 3,
    title: "Community Engagement",
    description: "Like and comment on 20 community posts",
    reward: "300 Points",
    progress: 12,
    total: 20,
    timeLeft: "2 weeks",
    type: "social",
  },
]

export default function CommunityPage() {
  const [newPost, setNewPost] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const handleCreatePost = () => {
    // Handle post creation
    setNewPost("")
  }

  const filteredPosts = mockPosts.filter((post) => {
    if (selectedFilter === "all") return true
    return post.tags.includes(selectedFilter)
  })

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Community</h1>
          <p className="text-muted-foreground">Connect with creators, collectors, and NFT enthusiasts</p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-slide-up">
          {[
            { label: "Active Members", value: "12.5K", icon: Users },
            { label: "Posts Today", value: "234", icon: MessageCircle },
            { label: "NFTs Shared", value: "1.8K", icon: Share2 },
            { label: "Rewards Earned", value: "45.2K", icon: Trophy },
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

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-6 animate-slide-up">
            {/* Create Post */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Share with Community
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="What's on your mind? Share your latest NFT, thoughts, or discoveries..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  rows={3}
                />
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform duration-200">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Image
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform duration-200">
                      <Video className="w-4 h-4 mr-2" />
                      Video
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform duration-200">
                      <Gift className="w-4 h-4 mr-2" />
                      NFT
                    </Button>
                  </div>
                  <Button
                    onClick={handleCreatePost}
                    disabled={!newPost.trim()}
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-background/50 backdrop-blur-sm">
                  <SelectValue placeholder="Filter posts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Posts</SelectItem>
                  <SelectItem value="cyberpunk">Cyberpunk</SelectItem>
                  <SelectItem value="abstract">Abstract</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                  <SelectItem value="digital-art">Digital Art</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 bg-background/50 backdrop-blur-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="comments">Most Comments</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {filteredPosts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 animate-scale-in">
            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockLeaderboard.map((user, index) => (
                  <div key={user.rank} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        user.rank === 1
                          ? "bg-yellow-500 text-white"
                          : user.rank === 2
                            ? "bg-gray-400 text-white"
                            : user.rank === 3
                              ? "bg-amber-600 text-white"
                              : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {user.rank}
                    </div>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{user.user.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">{user.user}</div>
                      <div className="text-xs text-muted-foreground">{user.points.toLocaleString()} points</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {user.badge}
                    </Badge>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full hover:scale-105 transition-transform duration-200 bg-transparent"
                >
                  View Full Leaderboard
                </Button>
              </CardContent>
            </Card>

            {/* Challenges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Active Challenges
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockChallenges.slice(0, 2).map((challenge, index) => (
                  <div key={challenge.id} className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{challenge.title}</h4>
                        <p className="text-xs text-muted-foreground">{challenge.description}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          challenge.type === "weekly"
                            ? "border-blue-500 text-blue-600"
                            : challenge.type === "achievement"
                              ? "border-purple-500 text-purple-600"
                              : "border-green-500 text-green-600"
                        }`}
                      >
                        {challenge.type}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>
                          {challenge.progress}/{challenge.total}
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">Reward: {challenge.reward}</div>
                    {index < mockChallenges.slice(0, 2).length - 1 && <Separator />}
                  </div>
                ))}
                <Link href="/rewards">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full hover:scale-105 transition-transform duration-200 bg-transparent"
                  >
                    View All Challenges
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Trending Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Trending Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["cyberpunk", "abstract", "pixel-art", "photography", "3d-art", "generative"].map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

interface PostCardProps {
  post: (typeof mockPosts)[0]
  index: number
}

function PostCard({ post, index }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(post.isLiked)
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleComment = () => {
    if (newComment.trim()) {
      // Handle comment submission
      setNewComment("")
    }
  }

  return (
    <Card className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
      <CardContent className="p-6">
        {/* Post Header */}
        <div className="flex items-start gap-3 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
            <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold">{post.author.name}</h3>
              {post.author.verified && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
              <Badge
                variant="outline"
                className={`text-xs ${
                  post.author.level === "Diamond"
                    ? "border-blue-500 text-blue-600"
                    : post.author.level === "Platinum"
                      ? "border-purple-500 text-purple-600"
                      : "border-yellow-500 text-yellow-600"
                }`}
              >
                {post.author.level}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">{post.author.address}</div>
            <div className="text-xs text-muted-foreground">{post.timestamp}</div>
          </div>
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-sm mb-3">{post.content}</p>

          {/* Post Image */}
          {post.image && (
            <div className="rounded-lg overflow-hidden mb-3">
              <img
                src={post.image || "/placeholder.svg"}
                alt="Post content"
                className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          )}

          {/* Attached NFT */}
          {post.nft && (
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{post.nft.name}</h4>
                    <p className="text-xs text-muted-foreground">{post.nft.collection}</p>
                    <p className="text-sm font-medium">{post.nft.price}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="hover:scale-105 transition-transform duration-200 bg-transparent"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`hover:scale-110 transition-transform duration-200 ${
                isLiked ? "text-red-500" : "text-muted-foreground"
              }`}
            >
              <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
              {post.likes + (isLiked && !post.isLiked ? 1 : isLiked || post.isLiked ? 0 : -1)}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowComments(!showComments)}
              className="hover:scale-110 transition-transform duration-200 text-muted-foreground"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {post.comments}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hover:scale-110 transition-transform duration-200 text-muted-foreground"
            >
              <Share2 className="w-4 h-4 mr-2" />
              {post.shares}
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t space-y-4">
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>You</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Input
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1"
                />
                <Button
                  size="sm"
                  onClick={handleComment}
                  disabled={!newComment.trim()}
                  className="hover:scale-105 transition-transform duration-200"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Mock Comments */}
            <div className="space-y-3">
              <div className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="font-medium text-sm">ArtCollector</div>
                    <div className="text-sm">Amazing work! Love the color palette.</div>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    <span>2h ago</span>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                      Like
                    </Button>
                    <Button variant="ghost" size="sm" className="h-auto p-0 text-xs">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
