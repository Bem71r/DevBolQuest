"use client"

import { KpiCard } from "@/components/ui/kpi-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, MessageCircle, RotateCcw, TrendingUp, Euro, Package, Users, Star } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { formatCurrency } from "@/lib/utils"

// Mock data
const revenueData = [
  { date: "1 Jan", revenue: 2400 },
  { date: "2 Jan", revenue: 1398 },
  { date: "3 Jan", revenue: 9800 },
  { date: "4 Jan", revenue: 3908 },
  { date: "5 Jan", revenue: 4800 },
  { date: "6 Jan", revenue: 3800 },
  { date: "7 Jan", revenue: 4300 },
]

const orderStatusData = [
  { name: "Verzonden", value: 45, color: "#0050D8" },
  { name: "Verwerking", value: 25, color: "#FFD200" },
  { name: "Geannuleerd", value: 15, color: "#ef4444" },
  { name: "Retour", value: 15, color: "#6b7280" },
]

export default function DashboardPage() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
          Welkom terug! Hier is een overzicht van je verkoop.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
        <KpiCard
          title="Open Bestellingen"
          value="24"
          change={{ value: 12, type: "increase" }}
          icon={ShoppingCart}
          variant="bol"
        />
        <KpiCard title="Klantvragen" value="8" change={{ value: 3, type: "decrease" }} icon={MessageCircle} />
        <KpiCard title="Open Retouren" value="5" change={{ value: 2, type: "increase" }} icon={RotateCcw} />
        <KpiCard
          title="Performance Score"
          value="8.7"
          change={{ value: 0.3, type: "increase" }}
          icon={TrendingUp}
          variant="yellow"
        />
        <KpiCard title="Dagomzet" value={formatCurrency(4300)} change={{ value: 8, type: "increase" }} icon={Euro} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Omzet per dag</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), "Omzet"]} />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0050D8"
                  strokeWidth={3}
                  dot={{ fill: "#0050D8", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Bestelling Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4">
              {orderStatusData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
                  <span className="text-xs sm:text-sm">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Snelle Statistieken</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Package className="w-4 h-4 sm:w-5 sm:h-5 text-[#0050D8] mr-2" />
                <span className="text-xs sm:text-sm">Actieve Producten</span>
              </div>
              <span className="font-semibold text-sm sm:text-base">156</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#0050D8] mr-2" />
                <span className="text-xs sm:text-sm">Nieuwe Klanten</span>
              </div>
              <span className="font-semibold text-sm sm:text-base">23</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD200] mr-2" />
                <span className="text-xs sm:text-sm">Gem. Review Score</span>
              </div>
              <span className="font-semibold text-sm sm:text-base">4.6</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 