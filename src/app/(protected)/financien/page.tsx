"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { KpiCard } from "@/components/ui/kpi-card"
import { Search, Download, Euro, Calendar, TrendingUp, CreditCard, Clock } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

// Mock data
const invoices = [
  {
    id: "INV-2024-001",
    period: "Week 1-2 Januari 2024",
    amount: 2450.75,
    commission: 245.08,
    net: 2205.67,
    status: "paid",
    dueDate: "2024-01-15",
    paidDate: "2024-01-14",
    orders: 45,
  },
  {
    id: "INV-2024-002",
    period: "Week 3-4 Januari 2024",
    amount: 3120.5,
    commission: 312.05,
    net: 2808.45,
    status: "pending",
    dueDate: "2024-01-29",
    paidDate: null,
    orders: 58,
  },
  {
    id: "INV-2024-003",
    period: "December 2023",
    amount: 4567.25,
    commission: 456.73,
    net: 4110.52,
    status: "paid",
    dueDate: "2024-01-08",
    paidDate: "2024-01-07",
    orders: 89,
  },
]

const revenueData = [
  { month: "Aug", revenue: 3200, commission: 320, net: 2880 },
  { month: "Sep", revenue: 3800, commission: 380, net: 3420 },
  { month: "Okt", revenue: 4100, commission: 410, net: 3690 },
  { month: "Nov", revenue: 4567, commission: 457, net: 4110 },
  { month: "Dec", revenue: 3900, commission: 390, net: 3510 },
  { month: "Jan", revenue: 5571, commission: 557, net: 5014 },
]

const payoutSchedule = [
  { date: "2024-01-29", amount: 2808.45, status: "pending" },
  { date: "2024-02-12", amount: 3200.0, status: "scheduled" },
  { date: "2024-02-26", amount: 2900.0, status: "scheduled" },
]

const statusConfig = {
  paid: { label: "Betaald", color: "bg-green-100 text-green-800" },
  pending: { label: "In Behandeling", color: "bg-yellow-100 text-yellow-800" },
  overdue: { label: "Achterstallig", color: "bg-red-100 text-red-800" },
  scheduled: { label: "Gepland", color: "bg-blue-100 text-blue-800" },
}

export default function FinancienPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPeriod, setSelectedPeriod] = useState("6months")

  const filteredInvoices = invoices.filter(
    (invoice) =>
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.period.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0)
  const totalCommission = invoices.reduce((sum, inv) => sum + inv.commission, 0)
  const totalNet = invoices.reduce((sum, inv) => sum + inv.net, 0)
  const pendingAmount = invoices.filter((inv) => inv.status === "pending").reduce((sum, inv) => sum + inv.net, 0)

  const handleDownloadInvoice = (invoiceId: string) => {
    console.log("Downloading invoice:", invoiceId)
    // Simulate PDF download
    alert(`Factuur ${invoiceId} wordt gedownload...`)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Financiën</h1>
        <p className="text-gray-600 dark:text-gray-400">Overzicht van je omzet, commissies en uitbetalingen</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Totale Omzet"
          value={formatCurrency(totalRevenue)}
          change={{ value: 12, type: "increase" }}
          icon={Euro}
          variant="bol"
        />
        <KpiCard
          title="Commissie Betaald"
          value={formatCurrency(totalCommission)}
          change={{ value: 8, type: "increase" }}
          icon={CreditCard}
        />
        <KpiCard
          title="Netto Ontvangen"
          value={formatCurrency(totalNet)}
          change={{ value: 15, type: "increase" }}
          icon={TrendingUp}
          variant="yellow"
        />
        <KpiCard title="Uitbetaling Pending" value={formatCurrency(pendingAmount)} icon={Clock} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Omzet Ontwikkeling</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), ""]} />
                <Bar dataKey="revenue" fill="#0050D8" name="Bruto Omzet" />
                <Bar dataKey="net" fill="#FFD200" name="Netto Omzet" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Commission Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Commissie Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [formatCurrency(Number(value)), "Commissie"]} />
                <Line
                  type="monotone"
                  dataKey="commission"
                  stroke="#EF4444"
                  strokeWidth={3}
                  dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Invoices */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Facturen</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Zoek facturen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredInvoices.map((invoice) => (
                <div key={invoice.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{invoice.id}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{invoice.period}</p>
                    </div>
                    <Badge className={statusConfig[invoice.status as keyof typeof statusConfig].color}>
                      {statusConfig[invoice.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-gray-600">Bruto:</span>
                      <div className="font-medium">{formatCurrency(invoice.amount)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Commissie:</span>
                      <div className="font-medium text-red-600">-{formatCurrency(invoice.commission)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Netto:</span>
                      <div className="font-medium text-green-600">{formatCurrency(invoice.net)}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="text-gray-600">
                      {invoice.orders} bestellingen • Vervaldatum: {formatDate(invoice.dueDate)}
                      {invoice.paidDate && ` • Betaald: ${formatDate(invoice.paidDate)}`}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadInvoice(invoice.id)}
                      className="flex items-center"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      PDF
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payout Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Uitbetalingsschema</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {payoutSchedule.map((payout, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span className="font-medium">{formatDate(payout.date)}</span>
                    </div>
                    <Badge className={statusConfig[payout.status as keyof typeof statusConfig].color}>
                      {statusConfig[payout.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>
                  <div className="text-lg font-bold text-green-600">{formatCurrency(payout.amount)}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {payout.status === "pending" && "Wordt verwerkt..."}
                    {payout.status === "scheduled" && "Automatische uitbetaling"}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Uitbetalingsinformatie</h4>
              <div className="text-sm text-blue-700 dark:text-blue-200 space-y-1">
                <p>• Uitbetalingen vinden plaats elke 2 weken</p>
                <p>• Minimumbedrag voor uitbetaling: €25</p>
                <p>• Verwerkingstijd: 1-3 werkdagen</p>
                <p>• Commissie: 10% van bruto omzet</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Financieel Overzicht</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">{formatCurrency(totalNet)}</div>
              <div className="text-sm text-green-700 dark:text-green-300">Totaal Netto Ontvangen</div>
              <div className="text-xs text-green-600 mt-1">Afgelopen 6 maanden</div>
            </div>

            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">{Math.round(totalRevenue / invoices.length)}</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Gem. Bestellingen per Periode</div>
              <div className="text-xs text-blue-600 mt-1">Gebaseerd op {invoices.length} facturen</div>
            </div>

            <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600 mb-1">
                {((totalCommission / totalRevenue) * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-yellow-700 dark:text-yellow-300">Gemiddelde Commissie</div>
              <div className="text-xs text-yellow-600 mt-1">Van bruto omzet</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
