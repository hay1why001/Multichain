"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  User,
  Bell,
  Shield,
  Palette,
  Wallet,
  Upload,
  Trash2,
  LinkIcon,
  Twitter,
  Instagram,
  ExternalLink,
  Save,
  AlertTriangle,
} from "lucide-react"
import { DashboardNavigation } from "@/components/dashboard-navigation"

// Mock user settings
const mockUserSettings = {
  profile: {
    username: "CryptoArtist",
    displayName: "Crypto Artist",
    email: "artist@example.com",
    bio: "Digital artist creating unique NFTs on Ethereum and Solana. Passionate about the intersection of art and technology.",
    avatar: "/avatar-profile.png",
    banner: "/abstract-modern-art-nft.jpg",
    website: "https://myartsite.com",
    twitter: "@cryptoartist",
    instagram: "@cryptoartist",
    isVerified: true,
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: true,
    bidAlerts: true,
    saleAlerts: true,
    followAlerts: false,
    marketingEmails: false,
    weeklyDigest: true,
    priceAlerts: true,
  },
  privacy: {
    profileVisibility: "public",
    showWalletBalance: false,
    showCollectionValue: true,
    showActivity: true,
    allowDirectMessages: true,
    showOnlineStatus: false,
  },
  preferences: {
    defaultChain: "ethereum",
    currency: "USD",
    language: "en",
    timezone: "UTC-5",
    theme: "system",
    compactMode: false,
    autoRefresh: true,
  },
}

export default function SettingsPage() {
  const [settings, setSettings] = useState(mockUserSettings)
  const [activeTab, setActiveTab] = useState("profile")
  const [hasChanges, setHasChanges] = useState(false)

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value,
      },
    }))
    setHasChanges(true)
  }

  const handleSave = () => {
    // Handle saving settings
    setHasChanges(false)
    console.log("Settings saved:", settings)
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Handle avatar upload
      console.log("Avatar uploaded:", file)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences and privacy settings</p>
        </div>

        {/* Save Changes Banner */}
        {hasChanges && (
          <Card className="mb-6 border-primary/50 bg-primary/5 animate-slide-up">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                  <span className="font-medium">You have unsaved changes</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSettings(mockUserSettings)
                      setHasChanges(false)
                    }}
                    className="hover:scale-105 transition-transform duration-200 bg-transparent"
                  >
                    Discard
                  </Button>
                  <Button size="sm" onClick={handleSave} className="hover:scale-105 transition-transform duration-200">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-slide-up">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
            <TabsTrigger value="wallets" className="flex items-center gap-2">
              <Wallet className="w-4 h-4" />
              <span className="hidden sm:inline">Wallets</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6 space-y-6">
            {/* Profile Picture */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={settings.profile.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{settings.profile.username.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:scale-105 transition-transform duration-200 bg-transparent"
                        onClick={() => document.getElementById("avatar-upload")?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload New
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:scale-105 transition-transform duration-200 bg-transparent"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Recommended: Square image, at least 400x400px, max 2MB
                    </p>
                  </div>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="username"
                        value={settings.profile.username}
                        onChange={(e) => updateSetting("profile", "username", e.target.value)}
                      />
                      {settings.profile.isVerified && (
                        <Badge variant="secondary" className="text-blue-600">
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="displayName">Display Name</Label>
                    <Input
                      id="displayName"
                      value={settings.profile.displayName}
                      onChange={(e) => updateSetting("profile", "displayName", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) => updateSetting("profile", "email", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    rows={4}
                    value={settings.profile.bio}
                    onChange={(e) => updateSetting("profile", "bio", e.target.value)}
                    placeholder="Tell people about yourself..."
                  />
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card>
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                      <LinkIcon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="website"
                      value={settings.profile.website}
                      onChange={(e) => updateSetting("profile", "website", e.target.value)}
                      className="rounded-l-none"
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                      <Twitter className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="twitter"
                      value={settings.profile.twitter}
                      onChange={(e) => updateSetting("profile", "twitter", e.target.value)}
                      className="rounded-l-none"
                      placeholder="@username"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <div className="flex">
                    <div className="flex items-center px-3 bg-muted border border-r-0 rounded-l-md">
                      <Instagram className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="instagram"
                      value={settings.profile.instagram}
                      onChange={(e) => updateSetting("profile", "instagram", e.target.value)}
                      className="rounded-l-none"
                      placeholder="@username"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    key: "emailNotifications",
                    label: "Email Notifications",
                    description: "Receive notifications via email",
                  },
                  { key: "bidAlerts", label: "Bid Alerts", description: "When someone bids on your NFTs" },
                  { key: "saleAlerts", label: "Sale Alerts", description: "When your NFTs are sold" },
                  { key: "followAlerts", label: "Follow Alerts", description: "When someone follows you" },
                  { key: "weeklyDigest", label: "Weekly Digest", description: "Weekly summary of your activity" },
                  {
                    key: "marketingEmails",
                    label: "Marketing Emails",
                    description: "Updates about new features and promotions",
                  },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                    <Switch
                      checked={settings.notifications[item.key as keyof typeof settings.notifications] as boolean}
                      onCheckedChange={(checked: any) => updateSetting("notifications", item.key, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    key: "pushNotifications",
                    label: "Push Notifications",
                    description: "Receive push notifications in browser",
                  },
                  { key: "priceAlerts", label: "Price Alerts", description: "When prices change for watched NFTs" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                    <Switch
                      checked={settings.notifications[item.key as keyof typeof settings.notifications] as boolean}
                      onCheckedChange={(checked: any) => updateSetting("notifications", item.key, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Profile Visibility</Label>
                  <Select
                    value={settings.privacy.profileVisibility}
                    onValueChange={(value: any) => updateSetting("privacy", "profileVisibility", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public - Anyone can view</SelectItem>
                      <SelectItem value="private">Private - Only you can view</SelectItem>
                      <SelectItem value="followers">Followers Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {[
                  {
                    key: "showWalletBalance",
                    label: "Show Wallet Balance",
                    description: "Display your wallet balance on profile",
                  },
                  {
                    key: "showCollectionValue",
                    label: "Show Collection Value",
                    description: "Display total value of your NFT collection",
                  },
                  { key: "showActivity", label: "Show Activity", description: "Display your recent trading activity" },
                  {
                    key: "allowDirectMessages",
                    label: "Allow Direct Messages",
                    description: "Let other users send you messages",
                  },
                  { key: "showOnlineStatus", label: "Show Online Status", description: "Display when you're online" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                    <Switch
                      checked={settings.privacy[item.key as keyof typeof settings.privacy] as boolean}
                      onCheckedChange={(checked: any) => updateSetting("privacy", item.key, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appearance Tab */}
          <TabsContent value="appearance" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Theme</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Theme Preference</div>
                    <div className="text-sm text-muted-foreground">Choose your preferred theme</div>
                  </div>
                  <ThemeToggle />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Display Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Default Currency</Label>
                  <Select
                    value={settings.preferences.currency}
                    onValueChange={(value: any) => updateSetting("preferences", "currency", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="ETH">ETH (Ξ)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select
                    value={settings.preferences.language}
                    onValueChange={(value: any) => updateSetting("preferences", "language", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                      <SelectItem value="ja">日本語</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {[
                  { key: "compactMode", label: "Compact Mode", description: "Use a more compact layout" },
                  { key: "autoRefresh", label: "Auto Refresh", description: "Automatically refresh data" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                    <Switch
                      checked={settings.preferences[item.key as keyof typeof settings.preferences] as boolean}
                      onCheckedChange={(checked: any) => updateSetting("preferences", item.key, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Wallets Tab */}
          <TabsContent value="wallets" className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Connected Wallets</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "MetaMask", address: "0x1234...5678", chain: "Ethereum", status: "Connected" },
                  { name: "Phantom", address: "9x8765...4321", chain: "Solana", status: "Connected" },
                ].map((wallet, index) => (
                  <div key={wallet.address} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Wallet className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{wallet.name}</div>
                        <div className="text-sm text-muted-foreground">{wallet.address}</div>
                        <Badge variant="outline" className="text-xs mt-1">
                          {wallet.chain}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-green-600">
                        {wallet.status}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="hover:scale-105 transition-transform duration-200 bg-transparent"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full hover:scale-105 transition-transform duration-200 bg-transparent"
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Connect New Wallet
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Default Blockchain</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label>Preferred Chain for Transactions</Label>
                  <Select
                    value={settings.preferences.defaultChain}
                    onValueChange={(value: any) => updateSetting("preferences", "defaultChain", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="solana">Solana</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
