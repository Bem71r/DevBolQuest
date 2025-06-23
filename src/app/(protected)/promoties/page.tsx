"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { KpiCard } from "@/components/ui/kpi-card"
import { Plus, Gift, Percent, Users, Euro, Tag } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"

// Mock data
const promotions = [
  {
    id: "PROMO-001",
    name: "Winter Sale 2024",
    type: "percentage",
    discount: 20,
    startDate: "2024-01-15",
    endDate: "2024-01-31",
    status: "active",
    products: ["Samsung Galaxy S24", "iPhone 15 Pro"],
    minOrder: 500,
    maxDiscount: 100,
    usageCount: 156,
    maxUsage: 500,
    revenue: 12450.75,
  },
  {
    id: "PROMO-002",
    name: "Gratis Verzending",
    type: "shipping",
    discount: 0,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "active",
    products: ["Alle producten"],
    minOrder: 25,
    maxDiscount: 6.95,
    usageCount: 892,
    maxUsage: null,
    revenue: 8920.5,
  },
  {
    id: "PROMO-003",
    name: "Black Friday Deal",
    type: "fixed",
    discount: 50,
    startDate: "2023-11-24",
    endDate: "2023-11-27",
    status: "ended",
    products: ["Sony WH-1000XM5", "Dell XPS 13"],
    minOrder: 200,
    maxDiscount: 50,
    usageCount: 234,
    maxUsage: 300,
    revenue: 18750.25,
  },
]

const deals = [
  {
    id: "DEAL-001",
    name: "Bol.com Deal van de Dag",
    product: "Samsung Galaxy S24 Ultra",
    originalPrice: 1199.99,
    dealPrice: 999.99,
    startDate: "2024-01-20",
    endDate: "2024-01-21",
    status: "pending",
    expectedSales: 50,
    commission: 15,
  },
  {
    id: "DEAL-002",
    name: "Weekend Deal",
    product: "Apple iPhone 15 Pro",
    originalPrice: 1099.99,
    dealPrice: 949.99,
    startDate: "2024-01-19",
    endDate: "2024-01-21",
    status: "active",
    expectedSales: 30,
    commission: 12,
    actualSales: 18,
  },
  {
    id: "DEAL-003",
    name: "Tech Week Special",
    product: "Sony WH-1000XM5",
    originalPrice: 399.99,
    dealPrice: 299.99,
    startDate: "2024-01-15",
    endDate: "2024-01-22",
    status: "active",
    expectedSales: 75,
    commission: 20,
    actualSales: 45,
  },
]

const statusConfig = {
  active: { label: "Actief", color: "bg-green-100 text-green-800" },
  pending: { label: "In Afwachting", color: "bg-yellow-100 text-yellow-800" },
  ended: { label: "Beëindigd", color: "bg-gray-100 text-gray-800" },
  rejected: { label: "Afgewezen", color: "bg-red-100 text-red-800" },
}

const typeConfig = {
  percentage: { label: "Percentage", icon: Percent },
  fixed: { label: "Vast Bedrag", icon: Euro },
  shipping: { label: "Verzending", icon: Gift },
}

export default function PromotiesPage() {
  const [activeTab, setActiveTab] = useState("promotions")
  const [selectedPromotion, setSelectedPromotion] = useState<string | null>(null)

  const tabs = [
    { id: "promotions", label: "Promoties", count: promotions.length },
    { id: "deals", label: "Deals", count: deals.length },
  ]

  const selectedPromotionData = promotions.find((p) => p.id === selectedPromotion)

  const totalRevenue = promotions.reduce((sum, p) => sum + p.revenue, 0)
  const activePromotions = promotions.filter((p) => p.status === "active").length
  const totalUsage = promotions.reduce((sum, p) => sum + p.usageCount, 0)

  const handleEnrollDeal = (dealId: string) => {
    console.log("Enrolling in deal:", dealId)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Promoties</h1>
          <p className="text-gray-600 dark:text-gray-400">Beheer je promoties en deals</p>
        </div>
        <Button variant="bol" className="flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Nieuwe Promotie
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Promotie Omzet"
          value={formatCurrency(totalRevenue)}
          change={{ value: 25, type: "increase" }}
          icon={Euro}
          variant="bol"
        />
        <KpiCard title="Actieve Promoties" value={activePromotions.toString()} icon={Tag} variant="yellow" />
        <KpiCard
          title="Totaal Gebruik"
          value={totalUsage.toString()}
          change={{ value: 18, type: "increase" }}
          icon={Users}
        />
        <KpiCard title="Gem. Korting" value="15%" change={{ value: 2, type: "increase" }} icon={Percent} />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-[#0050D8] text-[#0050D8]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-900 py-0.5 px-2.5 rounded-full text-xs">{tab.count}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Promotions Tab */}
      {activeTab === "promotions" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Mijn Promoties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {promotions.map((promotion) => {
                    const TypeIcon = typeConfig[promotion.type as keyof typeof typeConfig].icon
                    return (
                      <div
                        key={promotion.id}
                        className={`border rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                          selectedPromotion === promotion.id ? "border-[#0050D8] bg-blue-50 dark:bg-blue-900/20" : ""
                        }`}
                        onClick={() => setSelectedPromotion(promotion.id)}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-medium flex items-center">
                              <TypeIcon className="w-4 h-4 mr-2" />
                              {promotion.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {typeConfig[promotion.type as keyof typeof typeConfig].label}
                              {promotion.type === "percentage" && ` - ${promotion.discount}%`}
                              {promotion.type === "fixed" && ` - ${formatCurrency(promotion.discount)}`}
                            </p>
                          </div>
                          <Badge className={statusConfig[promotion.status as keyof typeof statusConfig].color}>
                            {statusConfig[promotion.status as keyof typeof statusConfig].label}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm mb-3">
                          <div>
                            <span className="text-gray-600">Gebruikt:</span>
                            <div className="font-medium">
                              {promotion.usageCount}
                              {promotion.maxUsage && ` / ${promotion.maxUsage}`}
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600">Omzet:</span>
                            <div className="font-medium text-green-600">{formatCurrency(promotion.revenue)}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Min. bestelling:</span>
                            <div className="font-medium">{formatCurrency(promotion.minOrder)}</div>
                          </div>
                        </div>

                        <div className="text-xs text-gray-600">
                          {formatDate(promotion.startDate)} - {formatDate(promotion.endDate)}
                        </div>

                        {promotion.maxUsage && (
                          <div className="mt-3">
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Gebruik</span>
                              <span>{((promotion.usageCount / promotion.maxUsage) * 100).toFixed(1)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-[#0050D8] h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: `${Math.min((promotion.usageCount / promotion.maxUsage) * 100, 100)}%`,
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            {selectedPromotionData ? (
              <Card>
                <CardHeader>
                  <CardTitle>Promotie Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">{selectedPromotionData.name}</h4>
                    <Badge className={statusConfig[selectedPromotionData.status as keyof typeof statusConfig].color}>
                      {statusConfig[selectedPromotionData.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Type:</span>
                      <p className="font-medium">
                        {typeConfig[selectedPromotionData.type as keyof typeof typeConfig].label}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Korting:</span>
                      <p className="font-medium">
                        {selectedPromotionData.type === "percentage" && `${selectedPromotionData.discount}%`}
                        {selectedPromotionData.type === "fixed" && formatCurrency(selectedPromotionData.discount)}
                        {selectedPromotionData.type === "shipping" && "Gratis verzending"}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Periode:</span>
                      <p className="font-medium">
                        {formatDate(selectedPromotionData.startDate)} - {formatDate(selectedPromotionData.endDate)}
                      </p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Producten:</span>
                      <div className="mt-1">
                        {selectedPromotionData.products.map((product, index) => (
                          <Badge key={index} variant="outline" className="mr-1 mb-1">
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h5 className="font-medium mb-2">Performance</h5>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Gebruikt:</span>
                        <span className="font-medium">{selectedPromotionData.usageCount}x</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Omzet:</span>
                        <span className="font-medium text-green-600">
                          {formatCurrency(selectedPromotionData.revenue)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gem. per gebruik:</span>
                        <span className="font-medium">
                          {formatCurrency(selectedPromotionData.revenue / selectedPromotionData.usageCount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-[400px] flex items-center justify-center">
                <div className="text-center">
                  <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 dark:text-gray-400">Selecteer een promotie om details te bekijken</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Deals Tab */}
      {activeTab === "deals" && (
        <Card>
          <CardHeader>
            <CardTitle>Beschikbare Deals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {deals.map((deal) => (
                <div key={deal.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">{deal.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{deal.product}</p>
                    </div>
                    <Badge className={statusConfig[deal.status as keyof typeof statusConfig].color}>
                      {statusConfig[deal.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Originele prijs:</span>
                      <span className="line-through text-gray-500">{formatCurrency(deal.originalPrice)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Deal prijs:</span>
                      <span className="font-bold text-green-600">{formatCurrency(deal.dealPrice)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Korting:</span>
                      <span className="font-medium text-red-600">
                        -{((1 - deal.dealPrice / deal.originalPrice) * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600 mb-3">
                    {formatDate(deal.startDate)} - {formatDate(deal.endDate)}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="text-gray-600">Verwacht:</span>
                      <div className="font-medium">{deal.expectedSales} verkopen</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Commissie:</span>
                      <div className="font-medium">{deal.commission}%</div>
                    </div>
                    {deal.actualSales && (
                      <>
                        <div>
                          <span className="text-gray-600">Werkelijk:</span>
                          <div className="font-medium text-green-600">{deal.actualSales} verkopen</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Performance:</span>
                          <div className="font-medium">
                            {((deal.actualSales / deal.expectedSales) * 100).toFixed(0)}%
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {deal.status === "pending" && (
                    <Button variant="bol" className="w-full" onClick={() => handleEnrollDeal(deal.id)}>
                      Inschrijven voor Deal
                    </Button>
                  )}

                  {deal.status === "active" && (
                    <div className="text-center text-sm text-green-600 font-medium">✓ Actief deelgenomen</div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
