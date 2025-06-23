"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Upload, Edit, Trash2, AlertTriangle, Package, Eye, TrendingUp, TrendingDown } from "lucide-react"
import { formatCurrency } from "@/lib/utils"

// Mock data
const products = [
  {
    id: "PROD-001",
    name: "Samsung Galaxy S24 Ultra",
    sku: "SAM-S24U-256",
    category: "Smartphones",
    price: 1199.99,
    stock: 15,
    status: "active",
    sales: 45,
    trend: "up",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "PROD-002",
    name: "Apple iPhone 15 Pro",
    sku: "APL-IP15P-128",
    category: "Smartphones",
    price: 1099.99,
    stock: 3,
    status: "low_stock",
    sales: 67,
    trend: "up",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "PROD-003",
    name: "Sony WH-1000XM5 Headphones",
    sku: "SNY-WH1000XM5",
    category: "Audio",
    price: 399.99,
    stock: 0,
    status: "out_of_stock",
    sales: 23,
    trend: "down",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "PROD-004",
    name: "Dell XPS 13 Laptop",
    sku: "DEL-XPS13-512",
    category: "Laptops",
    price: 1299.99,
    stock: 8,
    status: "active",
    sales: 12,
    trend: "up",
    image: "/placeholder.svg?height=60&width=60",
  },
]

const statusConfig = {
  active: { label: "Actief", color: "bg-green-100 text-green-800" },
  low_stock: { label: "Lage Voorraad", color: "bg-yellow-100 text-yellow-800" },
  out_of_stock: { label: "Uitverkocht", color: "bg-red-100 text-red-800" },
  inactive: { label: "Inactief", color: "bg-gray-100 text-gray-800" },
}

export default function ProductenPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [editingProduct, setEditingProduct] = useState<string | null>(null)
  const [editValues, setEditValues] = useState<{ [key: string]: any }>({})

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEdit = (productId: string, field: string, value: any) => {
    setEditValues((prev) => ({
      ...prev,
      [`${productId}-${field}`]: value,
    }))
  }

  const handleSaveEdit = (productId: string) => {
    console.log("Saving edits for product:", productId, editValues)
    setEditingProduct(null)
    // Here you would typically save to your backend
  }

  const lowStockCount = products.filter((p) => p.stock <= 5 && p.stock > 0).length
  const outOfStockCount = products.filter((p) => p.stock === 0).length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Producten</h1>
          <p className="text-gray-600 dark:text-gray-400">Beheer je productcatalogus</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" className="flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </Button>
          <Button variant="bol" className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Product Toevoegen
          </Button>
        </div>
      </div>

      {/* Alerts */}
      {(lowStockCount > 0 || outOfStockCount > 0) && (
        <div className="space-y-2">
          {lowStockCount > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
              <span className="text-yellow-800">
                <strong>{lowStockCount}</strong> producten hebben lage voorraad (≤5 stuks)
              </span>
            </div>
          )}
          {outOfStockCount > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center">
              <Package className="w-5 h-5 text-red-600 mr-3" />
              <span className="text-red-800">
                <strong>{outOfStockCount}</strong> producten zijn uitverkocht
              </span>
            </div>
          )}
        </div>
      )}

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder="Zoek producten..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Productoverzicht</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4">SKU</th>
                  <th className="text-left py-3 px-4">Categorie</th>
                  <th className="text-left py-3 px-4">Prijs</th>
                  <th className="text-left py-3 px-4">Voorraad</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Verkopen</th>
                  <th className="text-left py-3 px-4">Acties</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <div className="font-medium">{product.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">{product.sku}</td>
                    <td className="py-3 px-4">{product.category}</td>
                    <td className="py-3 px-4">
                      {editingProduct === product.id ? (
                        <Input
                          type="number"
                          step="0.01"
                          defaultValue={product.price}
                          onChange={(e) => handleEdit(product.id, "price", Number.parseFloat(e.target.value))}
                          className="w-24"
                        />
                      ) : (
                        <span className="font-medium">{formatCurrency(product.price)}</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {editingProduct === product.id ? (
                        <Input
                          type="number"
                          defaultValue={product.stock}
                          onChange={(e) => handleEdit(product.id, "stock", Number.parseInt(e.target.value))}
                          className="w-20"
                        />
                      ) : (
                        <span
                          className={`font-medium ${
                            product.stock === 0
                              ? "text-red-600"
                              : product.stock <= 5
                                ? "text-yellow-600"
                                : "text-green-600"
                          }`}
                        >
                          {product.stock}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={statusConfig[product.status as keyof typeof statusConfig].color}>
                        {statusConfig[product.status as keyof typeof statusConfig].label}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <span>{product.sales}</span>
                        {product.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 text-green-500" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        {editingProduct === product.id ? (
                          <>
                            <Button size="sm" variant="bol" onClick={() => handleSaveEdit(product.id)}>
                              Opslaan
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingProduct(null)}>
                              Annuleren
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => setEditingProduct(product.id)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </>
                        )}
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
