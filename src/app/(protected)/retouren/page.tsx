"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Check, X, Package, RefreshCw, AlertCircle } from "lucide-react"
import { formatCurrency, formatDate } from "@/lib/utils"

// Mock data
const returns = [
  {
    id: "RET-001",
    orderNumber: "BOL-2024-001",
    customer: "Jan de Vries",
    email: "jan@email.com",
    product: "Samsung Galaxy S24 Ultra",
    reason: "Niet tevreden met product",
    status: "pending",
    requestDate: "2024-01-15",
    value: 1199.99,
    condition: "unopened",
    images: ["/placeholder.svg?height=100&width=100"],
    customerNote: "Product voldoet niet aan verwachtingen, graag retourneren.",
  },
  {
    id: "RET-002",
    orderNumber: "BOL-2024-002",
    customer: "Maria Jansen",
    email: "maria@email.com",
    product: "Apple iPhone 15 Pro",
    reason: "Defect product",
    status: "approved",
    requestDate: "2024-01-14",
    value: 1099.99,
    condition: "damaged",
    images: ["/placeholder.svg?height=100&width=100", "/placeholder.svg?height=100&width=100"],
    customerNote: "Scherm heeft een barst, waarschijnlijk tijdens transport ontstaan.",
  },
  {
    id: "RET-003",
    orderNumber: "BOL-2024-003",
    customer: "Piet Bakker",
    email: "piet@email.com",
    product: "Sony WH-1000XM5 Headphones",
    reason: "Verkeerde maat/kleur",
    status: "rejected",
    requestDate: "2024-01-13",
    value: 399.99,
    condition: "used",
    images: ["/placeholder.svg?height=100&width=100"],
    customerNote: "Dacht dat deze zwart waren, maar zijn grijs.",
    rejectionReason: "Product is gebruikt en kan niet geretourneerd worden na 14 dagen.",
  },
  {
    id: "RET-004",
    orderNumber: "BOL-2024-004",
    customer: "Lisa van Dam",
    email: "lisa@email.com",
    product: "Dell XPS 13 Laptop",
    reason: "Niet tevreden met product",
    status: "completed",
    requestDate: "2024-01-12",
    value: 1299.99,
    condition: "good",
    images: ["/placeholder.svg?height=100&width=100"],
    customerNote: "Laptop is te langzaam voor mijn werk.",
    refundAmount: 1299.99,
    refundDate: "2024-01-14",
  },
]

const statusConfig = {
  pending: { label: "In Afwachting", color: "bg-yellow-100 text-yellow-800", icon: AlertCircle },
  approved: { label: "Goedgekeurd", color: "bg-green-100 text-green-800", icon: Check },
  rejected: { label: "Afgewezen", color: "bg-red-100 text-red-800", icon: X },
  completed: { label: "Voltooid", color: "bg-blue-100 text-blue-800", icon: Package },
}

const conditionConfig = {
  unopened: { label: "Ongeopend", color: "bg-green-100 text-green-800" },
  good: { label: "Goede staat", color: "bg-blue-100 text-blue-800" },
  used: { label: "Gebruikt", color: "bg-yellow-100 text-yellow-800" },
  damaged: { label: "Beschadigd", color: "bg-red-100 text-red-800" },
}

export default function RetourenPage() {
  const [selectedReturn, setSelectedReturn] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [restockOption, setRestockOption] = useState<string>("")
  const [refundAmount, setRefundAmount] = useState<string>("")

  const filteredReturns = returns.filter(
    (ret) =>
      ret.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ret.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ret.product.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedReturnData = returns.find((ret) => ret.id === selectedReturn)

  const handleApprove = () => {
    if (selectedReturnData) {
      console.log("Approving return:", selectedReturnData.id, {
        restockOption,
        refundAmount: Number.parseFloat(refundAmount),
      })
      // Here you would typically send to your backend
    }
  }

  const handleReject = () => {
    if (selectedReturnData) {
      console.log("Rejecting return:", selectedReturnData.id)
      // Here you would typically send to your backend
    }
  }

  const pendingCount = returns.filter((r) => r.status === "pending").length
  const approvedCount = returns.filter((r) => r.status === "approved").length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Retouren</h1>
          <p className="text-gray-600 dark:text-gray-400">Beheer retourverzoeken van klanten</p>
        </div>
        <div className="flex space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
            <div className="text-sm text-gray-600">In afwachting</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
            <div className="text-sm text-gray-600">Goedgekeurd</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Returns List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Retourverzoeken</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Zoek retouren..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {filteredReturns.map((returnItem) => {
                  const StatusIcon = statusConfig[returnItem.status as keyof typeof statusConfig].icon
                  return (
                    <div
                      key={returnItem.id}
                      onClick={() => setSelectedReturn(returnItem.id)}
                      className={`p-4 border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        selectedReturn === returnItem.id
                          ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-[#0050D8]"
                          : ""
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <Badge className={statusConfig[returnItem.status as keyof typeof statusConfig].color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusConfig[returnItem.status as keyof typeof statusConfig].label}
                        </Badge>
                        <span className="text-sm font-medium">{formatCurrency(returnItem.value)}</span>
                      </div>
                      <h3 className="font-medium text-sm mb-1">{returnItem.product}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{returnItem.customer}</p>
                      <p className="text-xs text-gray-500">{returnItem.orderNumber}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(returnItem.requestDate)}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Return Details */}
        <div className="lg:col-span-2">
          {selectedReturnData ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{selectedReturnData.product}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedReturnData.customer} • {selectedReturnData.email}
                    </p>
                    <p className="text-sm text-gray-500">Bestelling: {selectedReturnData.orderNumber}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{formatCurrency(selectedReturnData.value)}</div>
                    <Badge className={statusConfig[selectedReturnData.status as keyof typeof statusConfig].color}>
                      {statusConfig[selectedReturnData.status as keyof typeof statusConfig].label}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Return Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Retour Details</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Reden:</span>
                        <span className="ml-2">{selectedReturnData.reason}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Conditie:</span>
                        <Badge
                          className={`ml-2 ${conditionConfig[selectedReturnData.condition as keyof typeof conditionConfig].color}`}
                        >
                          {conditionConfig[selectedReturnData.condition as keyof typeof conditionConfig].label}
                        </Badge>
                      </div>
                      <div>
                        <span className="text-gray-600">Aanvraagdatum:</span>
                        <span className="ml-2">{formatDate(selectedReturnData.requestDate)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Status Informatie</h4>
                    <div className="space-y-2 text-sm">
                      {selectedReturnData.status === "completed" && (
                        <>
                          <div>
                            <span className="text-gray-600">Terugbetaald:</span>
                            <span className="ml-2 font-medium text-green-600">
                              {formatCurrency(selectedReturnData.refundAmount!)}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-600">Terugbetaaldatum:</span>
                            <span className="ml-2">{formatDate(selectedReturnData.refundDate!)}</span>
                          </div>
                        </>
                      )}
                      {selectedReturnData.status === "rejected" && (
                        <div>
                          <span className="text-gray-600">Reden afwijzing:</span>
                          <p className="mt-1 text-red-600">{selectedReturnData.rejectionReason}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Customer Note */}
                <div>
                  <h4 className="font-medium mb-2">Klant Opmerking</h4>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                    <p className="text-sm">{selectedReturnData.customerNote}</p>
                  </div>
                </div>

                {/* Images */}
                <div>
                  <h4 className="font-medium mb-2">Foto's</h4>
                  <div className="flex space-x-2">
                    {selectedReturnData.images.map((image, index) => (
                      <img
                        key={index}
                        src={image || "/placeholder.svg"}
                        alt={`Return image ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg border"
                      />
                    ))}
                  </div>
                </div>

                {/* Actions for Pending Returns */}
                {selectedReturnData.status === "pending" && (
                  <div className="border-t pt-6">
                    <h4 className="font-medium mb-4">Actie Ondernemen</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Voorraad Actie</label>
                        <div className="space-y-2">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="restock"
                              value="restock"
                              checked={restockOption === "restock"}
                              onChange={(e) => setRestockOption(e.target.value)}
                              className="mr-2"
                            />
                            Terug naar voorraad
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="restock"
                              value="dispose"
                              checked={restockOption === "dispose"}
                              onChange={(e) => setRestockOption(e.target.value)}
                              className="mr-2"
                            />
                            Afvoeren (beschadigd)
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="restock"
                              value="repair"
                              checked={restockOption === "repair"}
                              onChange={(e) => setRestockOption(e.target.value)}
                              className="mr-2"
                            />
                            Reparatie nodig
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Terugbetaling</label>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Bedrag"
                          value={refundAmount}
                          onChange={(e) => setRefundAmount(e.target.value)}
                          className="mb-2"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setRefundAmount(selectedReturnData.value.toString())}
                        >
                          Volledig bedrag
                        </Button>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        variant="bol"
                        onClick={handleApprove}
                        disabled={!restockOption || !refundAmount}
                        className="flex items-center"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Goedkeuren
                      </Button>
                      <Button variant="outline" onClick={handleReject} className="flex items-center">
                        <X className="w-4 h-4 mr-2" />
                        Afwijzen
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="h-[600px] flex items-center justify-center">
              <div className="text-center">
                <RefreshCw className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Selecteer een retour om details te bekijken</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
