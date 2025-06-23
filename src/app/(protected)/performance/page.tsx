"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { KpiCard } from "@/components/ui/kpi-card"
import { TrendingUp, Clock, Star, Package, AlertTriangle, CheckCircle, Info } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"

// Mock data
const performanceData = [
  { week: "Week 1", score: 8.2, orders: 45, complaints: 2 },
  { week: "Week 2", score: 8.5, orders: 52, complaints: 1 },
  { week: "Week 3", score: 8.1, orders: 38, complaints: 3 },
  { week: "Week 4", score: 8.7, orders: 61, complaints: 1 },
  { week: "Week 5", score: 8.9, orders: 58, complaints: 0 },
  { week: "Week 6", score: 8.6, orders: 49, complaints: 2 },
]

const deliveryData = [
  { day: "Ma", onTime: 95, late: 5 },
  { day: "Di", onTime: 98, late: 2 },
  { day: "Wo", onTime: 92, late: 8 },
  { day: "Do", onTime: 96, late: 4 },
  { day: "Vr", onTime: 94, late: 6 },
  { day: "Za", onTime: 97, late: 3 },
  { day: "Zo", onTime: 99, late: 1 },
]

const kpiData = [
  {
    name: "Leveringsperformance",
    value: 96,
    target: 95,
    color: "#0050D8",
    description: "Percentage bestellingen op tijd geleverd",
  },
  {
    name: "Klanttevredenheid",
    value: 4.6,
    target: 4.5,
    color: "#FFD200",
    description: "Gemiddelde review score",
  },
  {
    name: "Retourpercentage",
    value: 3.2,
    target: 5.0,
    color: "#10B981",
    description: "Percentage geretourneerde bestellingen",
  },
  {
    name: "Reactietijd",
    value: 2.1,
    target: 4.0,
    color: "#F59E0B",
    description: "Gemiddelde reactietijd op klantvragen (uren)",
  },
]

export default function PerformancePage() {
  const currentScore = 8.7
  const scoreColor = currentScore >= 8.5 ? "#10B981" : currentScore >= 7.5 ? "#F59E0B" : "#EF4444"

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Performance</h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor je verkoop prestaties en KPI's</p>
      </div>

      {/* Current Performance Score */}
      <Card className="bg-gradient-to-r from-[#0050D8] to-blue-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Huidige Performance Score</h2>
              <div className="flex items-center space-x-4">
                <div className="text-4xl font-bold">{currentScore}</div>
                <div className="text-sm opacity-90">
                  <div>Target: 8.5</div>
                  <div className="flex items-center">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +0.2 deze week
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-90 mb-2">Status</div>
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Uitstekend
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Leveringsperformance"
          value="96%"
          change={{ value: 2, type: "increase" }}
          icon={Package}
          variant="bol"
        />
        <KpiCard
          title="Klanttevredenheid"
          value="4.6"
          change={{ value: 0.1, type: "increase" }}
          icon={Star}
          variant="yellow"
        />
        <KpiCard title="Retourpercentage" value="3.2%" change={{ value: 0.5, type: "decrease" }} icon={AlertTriangle} />
        <KpiCard title="Reactietijd" value="2.1u" change={{ value: 0.3, type: "decrease" }} icon={Clock} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis domain={[7, 10]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#0050D8"
                  strokeWidth={3}
                  dot={{ fill: "#0050D8", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Delivery Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Leveringsperformance per Dag</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={deliveryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="onTime" stackId="a" fill="#10B981" name="Op tijd" />
                <Bar dataKey="late" stackId="a" fill="#EF4444" name="Te laat" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* KPI Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* KPI Gauges */}
        <Card>
          <CardHeader>
            <CardTitle>KPI Overzicht</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {kpiData.map((kpi, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{kpi.name}</span>
                      <span className="text-sm font-bold">
                        {kpi.value}
                        {kpi.name === "Klanttevredenheid"
                          ? "/5"
                          : kpi.name.includes("percentage") || kpi.name === "Leveringsperformance"
                            ? ""
                            : kpi.name === "Reactietijd"
                              ? "u"
                              : ""}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min((kpi.value / (kpi.name === "Klanttevredenheid" ? 5 : kpi.name === "Reactietijd" ? 8 : 100)) * 100, 100)}%`,
                          backgroundColor: kpi.color,
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">{kpi.description}</span>
                      <span className="text-xs text-gray-500">
                        Target: {kpi.target}
                        {kpi.name === "Klanttevredenheid"
                          ? "/5"
                          : kpi.name.includes("percentage") || kpi.name === "Leveringsperformance"
                            ? "%"
                            : kpi.name === "Reactietijd"
                              ? "u"
                              : ""}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Verbeterpunten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 dark:text-blue-100">Leveringsperformance</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-200">
                    Je leveringsperformance is uitstekend! Houd dit niveau vast door goede communicatie met je
                    logistieke partner.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900 dark:text-yellow-100">Retourpercentage</h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-200">
                    Je retourpercentage is laag, maar kan nog verder omlaag. Overweeg betere productfoto's en
                    beschrijvingen.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900 dark:text-green-100">Reactietijd</h4>
                  <p className="text-sm text-green-700 dark:text-green-200">
                    Uitstekende reactietijd! Klanten waarderen snelle responses. Blijf dit volhouden.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Star className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-purple-900 dark:text-purple-100">Klanttevredenheid</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-200">
                    Goede score! Vraag actief om reviews bij tevreden klanten om je score verder te verhogen.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
