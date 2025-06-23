"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, Eye, Package, Truck, XCircle, RotateCcw } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"

// Mock data
const orders = [
  {
    id: "BOL-2024-001",
    customer: "Jan de Vries",
    email: "jan@email.com",
    date: "2024-01-15",
    status: "open",
    total: 89.99,
    items: 2,
    shippingAddress: "Hoofdstraat 123, 1234 AB Amsterdam",
  },
  {
    id: "BOL-2024-002",
    customer: "Maria Jansen",
    email: "maria@email.com",
    date: "2024-01-14",
    status: "verzonden",
    total: 156.5,
    items: 3,
    shippingAddress: "Kerkstraat 45, 5678 CD Rotterdam",
  },
  {
    id: "BOL-2024-003",
    customer: "Piet Bakker",
    email: "piet@email.com",
    date: "2024-01-13",
    status: "geannuleerd",
    total: 45.0,
    items: 1,
    shippingAddress: "Dorpsplein 67, 9012 EF Utrecht",
  },
  {
    id: "BOL-2024-004",
    customer: "Lisa van Dam",
    email: "lisa@email.com",
    date: "2024-01-12",
    status: "retour",
    total: 234.99,
    items: 4,
    shippingAddress: "Stationsweg 89, 3456 GH Den Haag",
  },
]

const statusConfig = {
  open: { label: "Open", color: "bg-blue-100 text-blue-800", icon: Package },
  verzonden: { label: "Verzonden", color: "bg-green-100 text-green-800", icon: Truck },
  geannuleerd: { label: "Geannuleerd", color: "bg-red-100 text-red-800", icon: XCircle },
  retour: { label: "Retour", color: "bg-yellow-100 text-yellow-800", icon: RotateCcw },
}

export default function BestellingenPage() {
  const [activeTab, setActiveTab] = useState("alle")
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  const tabs = [
    { id: "alle", label: "Alle Bestellingen", count: orders.length },
    { id: "open", label: "Open", count: orders.filter((o) => o.status === "open").length },
    { id: "verzonden", label: "Verzonden", count: orders.filter((o) => o.status === "verzonden").length },
    { id: "retour", label: "Retouren", count: orders.filter((o) => o.status === "retour").length },
    { id: "geannuleerd", label: "Geannuleerd", count: orders.filter((o) => o.status === "geannuleerd").length },
  ]

  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === "alle" || order.status === activeTab
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesTab && matchesSearch
  })

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  const handleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(filteredOrders.map((order) => order.id))
    }
  }

  const handleGenerateLabels = () => {
    console.log("Generating labels for orders:", selectedOrders)
    // Simulate PDF generation
    alert(`Pakketzegels gegenereerd voor ${selectedOrders.length} bestellingen`)
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Bestellingen</h1>
          <p className="text-gray-600 dark:text-gray-400">Beheer al je bestellingen op één plek</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" className="flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
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

      {/* Search and Bulk Actions */}
      <div className="flex justify-between items-center">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Zoek op bestelnummer of klant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {selectedOrders.length > 0 && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">{selectedOrders.length} geselecteerd</span>
            <Button variant="bol" onClick={handleGenerateLabels} className="flex items-center">
              <Package className="w-4 h-4 mr-2" />
              Genereer Pakketzegels
            </Button>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Bestellingen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300"
                    />
                  </th>
                  <th className="text-left py-3 px-4">Bestelnummer</th>
                  <th className="text-left py-3 px-4">Klant</th>
                  <th className="text-left py-3 px-4">Datum</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Items</th>
                  <th className="text-left py-3 px-4">Totaal</th>
                  <th className="text-left py-3 px-4">Acties</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
                  return (
                    <tr key={order.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedOrders.includes(order.id)}
                          onChange={() => handleSelectOrder(order.id)}
                          className="rounded border-gray-300"
                        />
                      </td>
                      <td className="py-3 px-4 font-medium">{order.id}</td>
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium">{order.customer}</div>
                          <div className="text-sm text-gray-500">{order.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{formatDate(order.date)}</td>
                      <td className="py-3 px-4">
                        <Badge className={statusConfig[order.status as keyof typeof statusConfig].color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig[order.status as keyof typeof statusConfig].label}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{order.items}</td>
                      <td className="py-3 px-4 font-medium">{formatCurrency(order.total)}</td>
                      <td className="py-3 px-4">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
