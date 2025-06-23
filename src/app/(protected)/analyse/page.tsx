"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { KpiCard } from "@/components/ui/kpi-card"
import { Download, TrendingUp, Package, Users, Search, BarChart3 } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Scatter,
  ScatterChart,
} from "recharts"

// Mock data
const salesData = [
  { month: "Jul", sales: 15420, orders: 89, customers: 67 },
  { month: "Aug", sales: 18750, orders: 102, customers: 78 },
  { month: "Sep", sales: 22100, orders: 125, customers: 95 },
  { month: "Okt", sales: 19800, orders: 115, customers: 88 },
  { month: "Nov", sales: 25600, orders: 145, customers: 112 },
  { month: "Dec", sales: 31200, orders: 178, customers: 134 },
]

const categoryData = [
  { name: "Smartphones", value: 45, sales: 28500, color: "#0050D8" },
  { name: "Laptops", value: 25, sales: 15800, color: "#FFD200" },
  { name: "Audio", value: 15, sales: 9500, color: "#10B981" },
  { name: "Accessoires", value: 10, sales: 6300, color: "#F59E0B" },
  { name: "Overig", value: 5, sales: 3200, color: "#6B7280" },
]

const returnData = [
  { month: "Jul", returns: 5.2, refunds: 1200 },
  { month: "Aug", returns: 4.8, refunds: 1450 },
  { month: "Sep", returns: 3.9, refunds: 1100 },
  { month: "Okt", returns: 4.2, refunds: 1350 },
  { month: "Nov", returns: 3.5, refunds: 1050 },
  { month: "Dec", returns: 2.8, refunds: 950 },
]

const searchTrends = [
  { term: "Samsung Galaxy S24", searches: 1250, conversions: 89, rate: 7.1 },
  { term: "iPhone 15 Pro", searches: 980, conversions: 67, rate: 6.8 },
  { term: "MacBook Air M3", searches: 750, conversions: 45, rate: 6.0 },
  { term: "Sony WH-1000XM5", searches: 650, conversions: 52, rate: 8.0 },
  { term: "Dell XPS 13", searches: 520, conversions: 31, rate: 6.0 },
]

const performanceData = salesData.map((item) => ({
  month: item.month,
  avgOrderValue: item.sales / item.orders,
  customerRetention: (item.customers / item.orders) * 100,
}))

export default function AnalysePage() {
  const [activeTab, setActiveTab] = useState("sales")
  const [selectedPeriod, setSelectedPeriod] = useState("6months")

  const tabs = [
    { id: "sales", label: "Verkoop", icon: TrendingUp },
    { id: "assortment", label: "Assortiment", icon: Package },
    { id: "returns", label: "Retouren", icon: BarChart3 },
    { id: "search", label: "Zoektrends", icon: Search },
  ]

  const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0)
  const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0)
  const avgOrderValue = totalSales / totalOrders
  const totalCustomers = salesData[salesData.length - 1].customers

  const handleExportData = () => {
    console.log("Exporting data for tab:", activeTab)
    alert(`Data voor ${tabs.find((t) => t.id === activeTab)?.label} wordt geëxporteerd...`)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analyse</h1>
          <p className="text-gray-600 dark:text-gray-400">Diepgaande inzichten in je verkoop prestaties</p>
        </div>
        <div className="flex space-x-2">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="3months">Laatste 3 maanden</option>
            <option value="6months">Laatste 6 maanden</option>
            <option value="12months">Laatste 12 maanden</option>
          </select>
          <Button variant="outline" onClick={handleExportData} className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Totale Omzet"
          value={formatCurrency(totalSales)}
          change={{ value: 18, type: "increase" }}
          icon={TrendingUp}
          variant="bol"
        />
        <KpiCard
          title="Totaal Bestellingen"
          value={totalOrders.toString()}
          change={{ value: 12, type: "increase" }}
          icon={Package}
        />
        <KpiCard
          title="Gem. Bestelwaarde"
          value={formatCurrency(avgOrderValue)}
          change={{ value: 5, type: "increase" }}
          icon={BarChart3}
          variant="yellow"
        />
        <KpiCard
          title="Unieke Klanten"
          value={totalCustomers.toString()}
          change={{ value: 22, type: "increase" }}
          icon={Users}
        />
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "border-[#0050D8] text-[#0050D8]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "sales" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Omzet Ontwikkeling</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [formatCurrency(Number(value)), "Omzet"]} />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#0050D8"
                    strokeWidth={3}
                    dot={{ fill: "#0050D8", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bestellingen vs Klanten</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#0050D8" name="Bestellingen" />
                  <Bar dataKey="customers" fill="#FFD200" name="Unieke Klanten" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="avgOrderValue" name="Gem. Bestelwaarde" />
                  <YAxis dataKey="customerRetention" name="Klant Retentie %" />
                  <Tooltip
                    formatter={(value, name) => [
                      name === "avgOrderValue" ? formatCurrency(Number(value)) : `${Number(value).toFixed(1)}%`,
                      name === "avgOrderValue" ? "Gem. Bestelwaarde" : "Klant Retentie",
                    ]}
                  />
                  <Scatter dataKey="customerRetention" fill="#0050D8" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Verkoop Statistieken</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{formatCurrency(avgOrderValue)}</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">Gem. Bestelwaarde</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">
                      {((totalCustomers / totalOrders) * 100).toFixed(1)}%
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300">Klant Retentie</div>
                  </div>
                </div>
                <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{(totalSales / 6 / 30).toFixed(0)}</div>
                  <div className="text-sm text-yellow-700 dark:text-yellow-300">Gem. Dagomzet</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "assortment" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Verkoop per Categorie</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, "Aandeel"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {categoryData.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                    <span className="text-sm">{entry.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Omzet per Categorie</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={categoryData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip formatter={(value) => [formatCurrency(Number(value)), "Omzet"]} />
                  <Bar dataKey="sales" fill="#0050D8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Categorie Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Categorie</th>
                      <th className="text-left py-2">Omzet</th>
                      <th className="text-left py-2">Aandeel</th>
                      <th className="text-left py-2">Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoryData.map((category, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 font-medium">{category.name}</td>
                        <td className="py-2">{formatCurrency(category.sales)}</td>
                        <td className="py-2">{category.value}%</td>
                        <td className="py-2">
                          <div className="flex items-center">
                            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                            <span className="text-green-600">+{Math.floor(Math.random() * 10 + 5)}%</span>
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
      )}

      {activeTab === "returns" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Retour Percentage</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={returnData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value}%`, "Retour %"]} />
                  <Line
                    type="monotone"
                    dataKey="returns"
                    stroke="#EF4444"
                    strokeWidth={3}
                    dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Terugbetaalde Bedragen</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={returnData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [formatCurrency(Number(value)), "Terugbetaald"]} />
                  <Bar dataKey="refunds" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "search" && (
        <Card>
          <CardHeader>
            <CardTitle>Zoekterm Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Zoekterm</th>
                    <th className="text-left py-3">Zoekopdrachten</th>
                    <th className="text-left py-3">Conversies</th>
                    <th className="text-left py-3">Conversie Rate</th>
                    <th className="text-left py-3">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {searchTrends.map((trend, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-3 font-medium">{trend.term}</td>
                      <td className="py-3">{trend.searches.toLocaleString()}</td>
                      <td className="py-3">{trend.conversions}</td>
                      <td className="py-3">
                        <span
                          className={`font-medium ${trend.rate >= 7 ? "text-green-600" : trend.rate >= 6 ? "text-yellow-600" : "text-red-600"}`}
                        >
                          {trend.rate}%
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                          <span className="text-green-600">+{Math.floor(Math.random() * 20 + 5)}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
