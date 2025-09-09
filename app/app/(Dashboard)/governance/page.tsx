"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Vote,
  Users,
  Clock,
  CheckCircle,
  TrendingUp,
  MessageCircle,
  Plus,
  Eye,
  ThumbsUp,
  ThumbsDown,
  AlertCircle,
  Coins,
  Shield,
} from "lucide-react"
import { DashboardNavigation } from "@/components/dashboard-navigation"

// Mock governance data
const mockProposals = [
  {
    id: 1,
    title: "Reduce Platform Fees from 2.5% to 2.0%",
    description:
      "Proposal to reduce the platform trading fees to make the marketplace more competitive and attract more users. This would decrease revenue but potentially increase volume significantly.",
    author: {
      name: "CommunityDAO",
      address: "0x1234...5678",
      avatar: "/avatar-profile.png",
    },
    status: "active",
    type: "fee-change",
    votesFor: 15420,
    votesAgainst: 3280,
    totalVotes: 18700,
    quorum: 20000,
    timeLeft: "5d 14h 32m",
    createdAt: "3 days ago",
    endDate: "2024-01-15",
    minTokens: 100,
    discussion: 45,
  },
  {
    id: 2,
    title: "Add Support for Polygon Network",
    description:
      "Expand the marketplace to support Polygon (MATIC) network alongside Ethereum and Solana. This would provide users with lower gas fees and faster transactions.",
    author: {
      name: "TechTeam",
      address: "0x8765...4321",
      avatar: "/avatar-profile.png",
    },
    status: "active",
    type: "feature-addition",
    votesFor: 22150,
    votesAgainst: 1890,
    totalVotes: 24040,
    quorum: 20000,
    timeLeft: "2d 8h 15m",
    createdAt: "1 week ago",
    endDate: "2024-01-12",
    minTokens: 100,
    discussion: 78,
  },
  {
    id: 3,
    title: "Implement Creator Verification Program",
    description:
      "Establish a verification system for creators to build trust and authenticity. Verified creators would get special badges and priority placement in featured sections.",
    author: {
      name: "CreatorAdvocate",
      address: "0x9876...5432",
      avatar: "/avatar-profile.png",
    },
    status: "passed",
    type: "governance",
    votesFor: 28900,
    votesAgainst: 5100,
    totalVotes: 34000,
    quorum: 20000,
    timeLeft: "Ended",
    createdAt: "2 weeks ago",
    endDate: "2024-01-05",
    minTokens: 100,
    discussion: 123,
  },
]

const mockUserVotingPower = {
  tokens: 2500,
  votingPower: 2500,
  delegatedTo: null,
  delegatedFrom: 850,
  totalPower: 3350,
}

export default function GovernancePage() {
  const [selectedTab, setSelectedTab] = useState("proposals")
  const [newProposal, setNewProposal] = useState({
    title: "",
    description: "",
    type: "governance",
  })
  const [showCreateProposal, setShowCreateProposal] = useState(false)

  const handleVote = (proposalId: number, vote: "for" | "against") => {
    // Handle voting logic
    console.log(`Voting ${vote} on proposal ${proposalId}`)
  }

  const handleCreateProposal = () => {
    // Handle proposal creation
    setNewProposal({ title: "", description: "", type: "governance" })
    setShowCreateProposal(false)
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Governance</h1>
          <p className="text-muted-foreground">
            Participate in platform governance and shape the future of the marketplace
          </p>
        </div>

        {/* Governance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 animate-slide-up">
          <Card>
            <CardContent className="p-6 text-center">
              <Vote className="w-8 h-8 mx-auto mb-3 text-primary" />
              <div className="text-2xl font-bold">{mockUserVotingPower.totalPower.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Your Voting Power</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 mx-auto mb-3 text-blue-500" />
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-muted-foreground">Active Proposals</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-8 h-8 mx-auto mb-3 text-green-500" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Passed Proposals</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-3 text-purple-500" />
              <div className="text-2xl font-bold">85%</div>
              <div className="text-sm text-muted-foreground">Participation Rate</div>
            </CardContent>
          </Card>
        </div>

        {/* Voting Power Card */}
        <Card className="mb-8 animate-slide-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="w-5 h-5" />
              Your Voting Power
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Token Balance</div>
                <div className="text-2xl font-bold">{mockUserVotingPower.tokens.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">MULTI tokens</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Delegated to You</div>
                <div className="text-2xl font-bold text-blue-600">+{mockUserVotingPower.delegatedFrom}</div>
                <div className="text-xs text-muted-foreground">From 3 users</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Total Voting Power</div>
                <div className="text-2xl font-bold text-primary">{mockUserVotingPower.totalPower.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Available for voting</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
              <TabsTrigger value="proposals">Proposals</TabsTrigger>
              <TabsTrigger value="history">Voting History</TabsTrigger>
              <TabsTrigger value="delegation">Delegation</TabsTrigger>
            </TabsList>

            <Button
              onClick={() => setShowCreateProposal(true)}
              className="hover:scale-105 transition-transform duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Proposal
            </Button>
          </div>

          {/* Proposals Tab */}
          <TabsContent value="proposals" className="mt-6">
            <div className="space-y-6">
              {mockProposals.map((proposal, index) => (
                <ProposalCard key={proposal.id} proposal={proposal} onVote={handleVote} index={index} />
              ))}
            </div>
          </TabsContent>

          {/* Voting History Tab */}
          <TabsContent value="history" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Voting History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProposals.slice(0, 2).map((proposal, index) => (
                    <div
                      key={proposal.id}
                      className="flex items-center justify-between p-4 bg-muted rounded-lg animate-slide-up"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{proposal.title}</h4>
                        <div className="text-sm text-muted-foreground">Voted {proposal.createdAt}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary" className="text-green-600">
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          For
                        </Badge>
                        <div className="text-sm text-muted-foreground">2,500 votes</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Delegation Tab */}
          <TabsContent value="delegation" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Delegate Your Votes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Delegate your voting power to trusted community members who actively participate in governance.
                  </p>
                  <div className="space-y-2">
                    <Label htmlFor="delegate-address">Delegate Address</Label>
                    <Input id="delegate-address" placeholder="0x..." />
                  </div>
                  <Button className="w-full hover:scale-105 transition-transform duration-200">Delegate Votes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delegated to You</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { address: "0xabcd...efgh", amount: 450, name: "CryptoTrader" },
                      { address: "0x1234...5678", amount: 250, name: "NFTCollector" },
                      { address: "0x9876...5432", amount: 150, name: "ArtLover" },
                    ].map((delegator, index) => (
                      <div key={delegator.address} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>{delegator.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">{delegator.name}</div>
                            <div className="text-xs text-muted-foreground">{delegator.address}</div>
                          </div>
                        </div>
                        <div className="text-sm font-medium">{delegator.amount} votes</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Create Proposal Modal */}
        {showCreateProposal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl animate-scale-in">
              <CardHeader>
                <CardTitle>Create New Proposal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="proposal-title">Title</Label>
                  <Input
                    id="proposal-title"
                    placeholder="Enter proposal title..."
                    value={newProposal.title}
                    onChange={(e) => setNewProposal({ ...newProposal, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="proposal-description">Description</Label>
                  <Textarea
                    id="proposal-description"
                    placeholder="Describe your proposal in detail..."
                    rows={6}
                    value={newProposal.description}
                    onChange={(e) => setNewProposal({ ...newProposal, description: e.target.value })}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateProposal(false)}
                    className="flex-1 hover:scale-105 transition-transform duration-200 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCreateProposal}
                    disabled={!newProposal.title || !newProposal.description}
                    className="flex-1 hover:scale-105 transition-transform duration-200"
                  >
                    Create Proposal
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

interface ProposalCardProps {
  proposal: (typeof mockProposals)[0]
  onVote: (proposalId: number, vote: "for" | "against") => void
  index: number
}

function ProposalCard({ proposal, onVote, index }: ProposalCardProps) {
  const [hasVoted, setHasVoted] = useState(false)
  const [userVote, setUserVote] = useState<"for" | "against" | null>(null)

  const handleVote = (vote: "for" | "against") => {
    setHasVoted(true)
    setUserVote(vote)
    onVote(proposal.id, vote)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "border-blue-500 text-blue-600 bg-blue-50 dark:bg-blue-900/20"
      case "passed":
        return "border-green-500 text-green-600 bg-green-50 dark:bg-green-900/20"
      case "rejected":
        return "border-red-500 text-red-600 bg-red-50 dark:bg-red-900/20"
      default:
        return "border-gray-500 text-gray-600 bg-gray-50 dark:bg-gray-900/20"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "fee-change":
        return <Coins className="w-4 h-4" />
      case "feature-addition":
        return <Plus className="w-4 h-4" />
      case "governance":
        return <Shield className="w-4 h-4" />
      default:
        return <Vote className="w-4 h-4" />
    }
  }

  const votingPercentage = (proposal.votesFor / proposal.totalVotes) * 100
  const quorumPercentage = (proposal.totalVotes / proposal.quorum) * 100

  return (
    <Card className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
      <CardContent className="p-6">
        {/* Proposal Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl font-semibold">{proposal.title}</h3>
              <Badge variant="outline" className={getStatusColor(proposal.status)}>
                {proposal.status}
              </Badge>
              <Badge variant="secondary" className="capitalize">
                {getTypeIcon(proposal.type)}
                <span className="ml-1">{proposal.type.replace("-", " ")}</span>
              </Badge>
            </div>
            <p className="text-muted-foreground mb-3">{proposal.description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarFallback>{proposal.author.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <span>by {proposal.author.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {proposal.status === "active" ? `${proposal.timeLeft} left` : proposal.timeLeft}
              </div>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                {proposal.discussion} comments
              </div>
            </div>
          </div>
        </div>

        {/* Voting Progress */}
        <div className="space-y-4 mb-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Votes For vs Against</span>
              <span>
                {proposal.votesFor.toLocaleString()} vs {proposal.votesAgainst.toLocaleString()}
              </span>
            </div>
            <div className="flex h-3 bg-muted rounded-full overflow-hidden">
              <div className="bg-green-500 transition-all duration-300" style={{ width: `${votingPercentage}%` }} />
              <div className="bg-red-500 transition-all duration-300" style={{ width: `${100 - votingPercentage}%` }} />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{votingPercentage.toFixed(1)}% For</span>
              <span>{(100 - votingPercentage).toFixed(1)}% Against</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Quorum Progress</span>
              <span>
                {proposal.totalVotes.toLocaleString()} / {proposal.quorum.toLocaleString()}
              </span>
            </div>
            <Progress value={Math.min(quorumPercentage, 100)} className="h-2" />
            <div className="text-xs text-muted-foreground">
              {quorumPercentage >= 100 ? (
                <span className="text-green-600 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Quorum reached
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {(100 - quorumPercentage).toFixed(1)}% more votes needed for quorum
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Voting Actions */}
        {proposal.status === "active" && (
          <div className="flex items-center justify-between pt-4 border-t">
            {hasVoted ? (
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm">
                  You voted <strong>{userVote}</strong> with 2,500 votes
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Button onClick={() => handleVote("for")} className="hover:scale-105 transition-transform duration-200">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Vote For
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleVote("against")}
                  className="hover:scale-105 transition-transform duration-200 bg-transparent"
                >
                  <ThumbsDown className="w-4 h-4 mr-2" />
                  Vote Against
                </Button>
              </div>
            )}
            <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform duration-200">
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </div>
        )}

        {proposal.status === "passed" && (
          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Proposal Passed</span>
            </div>
            <Button variant="ghost" size="sm" className="hover:scale-105 transition-transform duration-200">
              <Eye className="w-4 h-4 mr-2" />
              View Results
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
