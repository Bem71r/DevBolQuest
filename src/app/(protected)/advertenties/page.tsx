"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { KpiCard } from "@/components/ui/kpi-card"
import { Plus, Play, Pause, Edit, Trash2, Eye, MousePointer, Euro, Target } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Mock data
const campaigns = [
  {
    id: "ADS-001",
    name: "Samsung Galaxy S24 - Winter Sale",
    product: "Samsung Galaxy S24 Ultra",
    status: "active",
    budget: 500,
    spent: 342.5,
    impressions: 15420,
    clicks: 234,
    conversions: 12,
    ctr: 1.52,
    cpc: 1.46,
    roas: 4.2,
    startDate: "2024-01-01",
    endDate: "2024-01-31",
  },
  {
    id: "ADS-002",
    name: "iPhone 15 Pro - Premium Campaign",
    product: "Apple iPhone 15 Pro",
    status: "paused",
    budget: 750,
    spent: 125.8,
    impressions: 8950,
    clicks: 89,
    conversions: 3,
    ctr: 0.99,
    cpc: 1.41,
    roas: 2.8,
    startDate: "2024-01-10",
    endDate: "2024-02-10",
  },
  {
    id: "ADS-003",
    name: "Sony Headphones - Audio Focus",
    product: "Sony WH-1000XM5",
    status: "active",
    budget: 300,
    spent: 289.2,
    impressions: 12100,
    clicks: 156,
    conversions: 8,
    ctr: 1.29,
    cpc: 1.85,
    roas: 3.6,
    startDate: "2024-01-05",
    endDate: "2024-01-25",
  },
]

const keywords = [
  { term: "samsung galaxy s24", bid: 1.25, quality: 8, position: 2.3, impressions: 5420 },
  { term: "iphone 15 pro", bid: 1.8, quality: 7, position: 3.1, impressions: 3250 },
  { term: "sony headphones", bid: 0.95, quality: 9, position: 1.8, impressions: 2890 },
  { term: "wireless headphones", bid: 0.75, quality: 6, position: 4.2, impressions: 1560 },
  { term: "smartphone 2024", bid: 1.1, quality: 7, position: 2.9, impressions: 2100 },
]

const statusConfig = {
  active: { label: "Actief", color: "bg-green-100 text-green-800" },
  paused: { label: "Gepauzeerd", color: "bg-yellow-100 text-yellow-800" },
  ended: { label: "Beëindigd", color: "bg-gray-100 text-gray-800" },
  draft: { label: "Concept", color: "bg-blue-100 text-blue-800" },
}

export default function AdvertentiesPage() {
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null)
  const [showKeywords, setShowKeywords] = useState(false)
  const [newKeyword, setNewKeyword] = useState("")
  const [newBid, setNewBid] = useState("")

  const selectedCampaignData = campaigns.find((c) => c.id === selectedCampaign)

  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0)
  const totalImpressions = campaigns.reduce((sum, c) => sum + c.impressions, 0)
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0)
  const totalConversions = campaigns.reduce((sum, c) => sum + c.conversions, 0)
  const avgCTR = (totalClicks / totalImpressions) * 100
  const avgROAS = campaigns.reduce((sum, c) => sum + c.roas, 0) / campaigns.length

  const handleCampaignAction = (campaignId: string, action: string) => {
    console.log(`${action} campaign:`, campaignId)
  }

  const handleAddKeyword = () => {
    if (newKeyword && newBid) {
      console.log("Adding keyword:", { term: newKeyword, bid: Number.parseFloat(newBid) })
      setNewKeyword("")
      setNewBid("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Advertenties</h1>
          <p className="text-gray-600 dark:text-gray-400">Beheer je Sponsored Products campagnes</p>
        </div>
        <Button variant="bol" className="flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Nieuwe Campagne
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Totaal Uitgegeven"
          value={formatCurrency(totalSpent)}
          change={{ value: 15, type: "increase" }}
          icon={Euro}
          variant="bol"
        />
        <KpiCard
          title="Impressies"
          value={totalImpressions.toLocaleString()}
          change={{ value: 8, type: "increase" }}
          icon={Eye}
        />
        <KpiCard
          title="CTR"
          value={`${avgCTR.toFixed(2)}%`}
          change={{ value: 0.3, type: "increase" }}
          icon={MousePointer}
          variant="yellow"
        />
        <KpiCard title="ROAS" value={avgROAS.toFixed(1)} change={{ value: 0.5, type: "increase" }} icon={Target} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaigns List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Actieve Campagnes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign.id}
                    className={`border rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      selectedCampaign === campaign.id ? "border-[#0050D8] bg-blue-50 dark:bg-blue-900/20" : ""
                    }`}
                    onClick={() => setSelectedCampaign(campaign.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-medium">{campaign.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{campaign.product}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={statusConfig[campaign.status as keyof typeof statusConfig].color}>
                          {statusConfig[campaign.status as keyof typeof statusConfig].label}
                        </Badge>
                        <div className="flex space-x-1">
                          {campaign.status === "active" ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCampaignAction(campaign.id, "pause")
                              }}
                            >
                              <Pause className="w-4 h-4" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCampaignAction(campaign.id, "play")
                              }}
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCampaignAction(campaign.id, "edit")
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Budget:</span>
                        <div className="font-medium">{formatCurrency(campaign.budget)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Uitgegeven:</span>
                        <div className="font-medium">{formatCurrency(campaign.spent)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">CTR:</span>
                        <div className="font-medium">{campaign.ctr}%</div>
                      </div>
                      <div>
                        <span className="text-gray-600">ROAS:</span>
                        <div className={`font-medium ${campaign.roas >= 3 ? "text-green-600" : "text-red-600"}`}>
                          {campaign.roas}
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-600 mb-1">
                        <span>Budget gebruikt</span>
                        <span>{((campaign.spent / campaign.budget) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#0050D8] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min((campaign.spent / campaign.budget) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Details */}
        <div>
          {selectedCampaignData ? (
            <Card>
              <CardHeader>
                <CardTitle>Campagne Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">{selectedCampaignData.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedCampaignData.product}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Impressies:</span>
                    <span className="font-medium">{selectedCampaignData.impressions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Clicks:</span>
                    <span className="font-medium">{selectedCampaignData.clicks}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Conversies:</span>
                    <span className="font-medium">{selectedCampaignData.conversions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">CPC:</span>
                    <span className="font-medium">{formatCurrency(selectedCampaignData.cpc)}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <Button variant="outline" className="w-full mb-2" onClick={() => setShowKeywords(!showKeywords)}>
                    {showKeywords ? "Verberg" : "Toon"} Keywords
                  </Button>

                  {showKeywords && (
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Input
                          placeholder="Nieuwe keyword"
                          value={newKeyword}
                          onChange={(e) => setNewKeyword(e.target.value)}
                        />
                        <Input
                          placeholder="Bod (€)"
                          type="number"
                          step="0.01"
                          value={newBid}
                          onChange={(e) => setNewBid(e.target.value)}
                        />
                        <Button
                          variant="bol"
                          size="sm"
                          onClick={handleAddKeyword}
                          disabled={!newKeyword || !newBid}
                          className="w-full"
                        >
                          Keyword Toevoegen
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-[400px] flex items-center justify-center">
              <div className="text-center">
                <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Selecteer een campagne om details te bekijken</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Keywords Table */}
      <Card>
        <CardHeader>
          <CardTitle>Keyword Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Keyword</th>
                  <th className="text-left py-3">Bod</th>
                  <th className="text-left py-3">Kwaliteitsscore</th>
                  <th className="text-left py-3">Gem. Positie</th>
                  <th className="text-left py-3">Impressies</th>
                  <th className="text-left py-3">Acties</th>
                </tr>
              </thead>
              <tbody>
                {keywords.map((keyword, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 font-medium">{keyword.term}</td>
                    <td className="py-3">{formatCurrency(keyword.bid)}</td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <span
                          className={`font-medium ${keyword.quality >= 8 ? "text-green-600" : keyword.quality >= 6 ? "text-yellow-600" : "text-red-600"}`}
                        >
                          {keyword.quality}/10
                        </span>
                      </div>
                    </td>
                    <td className="py-3">{keyword.position.toFixed(1)}</td>
                    <td className="py-3">{keyword.impressions.toLocaleString()}</td>
                    <td className="py-3">
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
