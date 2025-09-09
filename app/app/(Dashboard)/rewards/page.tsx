"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Star,
  Target,
  Gift,
  Coins,
  Crown,
  Award,
  Zap,
  Users,
  Share2,
  Clock,
  CheckCircle,
  Lock,
} from "lucide-react"
import { DashboardNavigation } from "@/components/dashboard-navigation"

// Mock rewards data
const mockUserStats = {
  totalPoints: 8450,
  level: "Gold",
  nextLevel: "Platinum",
  pointsToNext: 1550,
  totalEarned: "2.3 ETH",
  badges: 12,
  rank: 156,
}

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
    difficulty: "Easy",
    isCompleted: false,
  },
  {
    id: 2,
    title: "First Time Minter",
    description: "Create and mint your first NFT on the platform",
    reward: "1000 Points + Minter Badge",
    progress: 1,
    total: 1,
    timeLeft: "No limit",
    type: "achievement",
    difficulty: "Medium",
    isCompleted: true,
  },
  {
    id: 3,
    title: "Community Engagement Master",
    description: "Like and comment on 20 community posts this month",
    reward: "300 Points + Social Badge",
    progress: 12,
    total: 20,
    timeLeft: "2 weeks",
    type: "social",
    difficulty: "Easy",
    isCompleted: false,
  },
  {
    id: 4,
    title: "Trading Volume Champion",
    description: "Complete trades worth 10 ETH in total volume",
    reward: "2000 Points + Trader Badge",
    progress: 6.5,
    total: 10,
    timeLeft: "1 month",
    type: "trading",
    difficulty: "Hard",
    isCompleted: false,
  },
]

const mockBadges = [
  { id: 1, name: "First Minter", description: "Minted your first NFT", icon: Zap, earned: true, rarity: "Common" },
  {
    id: 2,
    name: "Social Butterfly",
    description: "Active community member",
    icon: Users,
    earned: true,
    rarity: "Rare",
  },
  { id: 3, name: "Top Promoter", description: "Shared 100+ NFTs", icon: Share2, earned: true, rarity: "Epic" },
  {
    id: 4,
    name: "Whale Trader",
    description: "Traded 50+ ETH volume",
    icon: Crown,
    earned: false,
    rarity: "Legendary",
  },
  {
    id: 5,
    name: "Community Leader",
    description: "Top 10 contributor",
    icon: Trophy,
    earned: false,
    rarity: "Legendary",
  },
  { id: 6, name: "Early Adopter", description: "Joined in first month", icon: Star, earned: true, rarity: "Epic" },
]

const mockLeaderboard = [
  { rank: 1, user: "CryptoWhale", points: 25420, level: "Diamond", change: "+2" },
  { rank: 2, user: "ArtMaster", points: 22890, level: "Diamond", change: "-1" },
  { rank: 3, user: "NFTHunter", points: 21250, level: "Platinum", change: "+1" },
  { rank: 4, user: "DigitalDreamer", points: 19800, level: "Platinum", change: "0" },
  { rank: 5, user: "CryptoCollector", points: 18500, level: "Platinum", change: "+3" },
]

export default function RewardsPage() {
  const [selectedTab, setSelectedTab] = useState("challenges")

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Rewards & Gamification</h1>
          <p className="text-muted-foreground">Earn points, unlock badges, and climb the leaderboard</p>
        </div>

        {/* User Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-slide-up">
          <Card>
            <CardContent className="p-6 text-center">
              <Coins className="w-8 h-8 mx-auto mb-3 text-primary" />
              <div className="text-2xl font-bold">{mockUserStats.totalPoints.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Crown className="w-8 h-8 mx-auto mb-3 text-yellow-500" />
              <div className="text-2xl font-bold">{mockUserStats.level}</div>
              <div className="text-sm text-muted-foreground">Current Level</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 mx-auto mb-3 text-purple-500" />
              <div className="text-2xl font-bold">{mockUserStats.badges}</div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 mx-auto mb-3 text-orange-500" />
              <div className="text-2xl font-bold">#{mockUserStats.rank}</div>
              <div className="text-sm text-muted-foreground">Global Rank</div>
            </CardContent>
          </Card>
        </div>

        {/* Level Progress */}
        <Card className="mb-8 animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Level Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20">
                    {mockUserStats.level}
                  </Badge>
                  <span className="text-muted-foreground">→</span>
                  <Badge variant="outline" className="text-purple-600 border-purple-500">
                    {mockUserStats.nextLevel}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {mockUserStats.pointsToNext.toLocaleString()} points to next level
                </div>
              </div>
              <Progress
                value={(mockUserStats.totalPoints / (mockUserStats.totalPoints + mockUserStats.pointsToNext)) * 100}
                className="h-3"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{mockUserStats.totalPoints.toLocaleString()} points</span>
                <span>{(mockUserStats.totalPoints + mockUserStats.pointsToNext).toLocaleString()} points</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="animate-slide-up">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="badges">Badges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="rewards">My Rewards</TabsTrigger>
          </TabsList>

          {/* Challenges Tab */}
          <TabsContent value="challenges" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockChallenges.map((challenge, index) => (
                <Card
                  key={challenge.id}
                  className={`animate-scale-in ${challenge.isCompleted ? "border-green-500/50 bg-green-50/50 dark:bg-green-900/10" : ""}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg flex items-center gap-2">
                          {challenge.isCompleted ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Target className="w-5 h-5" />
                          )}
                          {challenge.title}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{challenge.description}</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Badge
                          variant="outline"
                          className={`text-xs ${
                            challenge.type === "weekly"
                              ? "border-blue-500 text-blue-600"
                              : challenge.type === "achievement"
                                ? "border-purple-500 text-purple-600"
                                : challenge.type === "social"
                                  ? "border-green-500 text-green-600"
                                  : "border-orange-500 text-orange-600"
                          }`}
                        >
                          {challenge.type}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${
                            challenge.difficulty === "Easy"
                              ? "text-green-600"
                              : challenge.difficulty === "Medium"
                                ? "text-yellow-600"
                                : "text-red-600"
                          }`}
                        >
                          {challenge.difficulty}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {challenge.progress}/{challenge.total}
                        </span>
                      </div>
                      <Progress value={(challenge.progress / challenge.total) * 100} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-green-600">{challenge.reward}</div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {challenge.timeLeft}
                        </div>
                      </div>
                      {challenge.isCompleted ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-green-50 border-green-500 text-green-600 hover:bg-green-100"
                          disabled
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Completed
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:scale-105 transition-transform duration-200 bg-transparent"
                        >
                          View Details
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Badges Tab */}
          <TabsContent value="badges" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockBadges.map((badge, index) => {
                const Icon = badge.icon
                return (
                  <Card
                    key={badge.id}
                    className={`animate-scale-in ${
                      badge.earned ? "border-primary/50 bg-primary/5" : "border-muted bg-muted/20 opacity-60 grayscale"
                    }`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                          badge.earned
                            ? badge.rarity === "Legendary"
                              ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                              : badge.rarity === "Epic"
                                ? "bg-gradient-to-br from-purple-400 to-pink-500"
                                : badge.rarity === "Rare"
                                  ? "bg-gradient-to-br from-blue-400 to-cyan-500"
                                  : "bg-gradient-to-br from-gray-400 to-gray-500"
                            : "bg-muted"
                        }`}
                      >
                        {badge.earned ? (
                          <Icon className="w-8 h-8 text-white" />
                        ) : (
                          <Lock className="w-8 h-8 text-muted-foreground" />
                        )}
                      </div>
                      <h3 className="font-semibold mb-2">{badge.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
                      <Badge
                        variant="outline"
                        className={`${
                          badge.rarity === "Legendary"
                            ? "border-yellow-500 text-yellow-600"
                            : badge.rarity === "Epic"
                              ? "border-purple-500 text-purple-600"
                              : badge.rarity === "Rare"
                                ? "border-blue-500 text-blue-600"
                                : "border-gray-500 text-gray-600"
                        }`}
                      >
                        {badge.rarity}
                      </Badge>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Leaderboard Tab */}
          <TabsContent value="leaderboard" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Global Leaderboard
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockLeaderboard.map((user, index) => (
                    <div
                      key={user.rank}
                      className="flex items-center gap-4 p-4 bg-muted rounded-lg animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                          user.rank === 1
                            ? "bg-yellow-500 text-white"
                            : user.rank === 2
                              ? "bg-gray-400 text-white"
                              : user.rank === 3
                                ? "bg-amber-600 text-white"
                                : "bg-muted-foreground text-white"
                        }`}
                      >
                        {user.rank}
                      </div>
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>{user.user.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">{user.user}</div>
                        <div className="text-sm text-muted-foreground">{user.points.toLocaleString()} points</div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant="outline"
                          className={`mb-2 ${
                            user.level === "Diamond"
                              ? "border-blue-500 text-blue-600"
                              : "border-purple-500 text-purple-600"
                          }`}
                        >
                          {user.level}
                        </Badge>
                        <div
                          className={`text-xs flex items-center gap-1 ${
                            user.change.startsWith("+")
                              ? "text-green-600"
                              : user.change.startsWith("-")
                                ? "text-red-600"
                                : "text-muted-foreground"
                          }`}
                        >
                          {user.change !== "0" && (
                            <span>{user.change.startsWith("+") ? "↗" : user.change.startsWith("-") ? "↘" : "→"}</span>
                          )}
                          {user.change === "0" ? "No change" : `${user.change} this week`}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Rewards Tab */}
          <TabsContent value="rewards" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="w-5 h-5" />
                    Claimable Rewards
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-8">
                    <Gift className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-semibold mb-2">No rewards to claim</h3>
                    <p className="text-muted-foreground">Complete challenges to earn rewards</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="w-5 h-5" />
                    Earnings Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{mockUserStats.totalEarned}</div>
                    <div className="text-sm text-muted-foreground">Total Earned</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Challenge Rewards</span>
                      <span className="font-medium">1.8 ETH</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Staking Rewards</span>
                      <span className="font-medium">0.3 ETH</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Referral Bonuses</span>
                      <span className="font-medium">0.2 ETH</span>
                    </div>
                  </div>
                  <Button className="w-full hover:scale-105 transition-transform duration-200">
                    <Coins className="w-4 h-4 mr-2" />
                    View Transaction History
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
