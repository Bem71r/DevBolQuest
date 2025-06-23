"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Star, MessageSquare, ThumbsUp } from "lucide-react"
import { formatDate } from "@/lib/utils"

// Mock data
const reviews = [
  {
    id: "REV-001",
    product: "Samsung Galaxy S24 Ultra",
    customer: "Jan de Vries",
    rating: 5,
    title: "Uitstekende telefoon!",
    comment:
      "Zeer tevreden met deze aankoop. Snelle levering en product zoals beschreven. Camera kwaliteit is fantastisch.",
    date: "2024-01-15",
    verified: true,
    helpful: 12,
    orderNumber: "BOL-2024-001",
    response: null,
    status: "published",
  },
  {
    id: "REV-002",
    product: "Apple iPhone 15 Pro",
    customer: "Maria Jansen",
    rating: 2,
    title: "Teleurstellend",
    comment: "Batterij gaat veel te snel leeg. Voor deze prijs had ik meer verwacht. Overweeg om te retourneren.",
    date: "2024-01-14",
    verified: true,
    helpful: 3,
    orderNumber: "BOL-2024-002",
    response: null,
    status: "needs_response",
  },
  {
    id: "REV-003",
    product: "Sony WH-1000XM5 Headphones",
    customer: "Piet Bakker",
    rating: 4,
    title: "Goede geluidskwaliteit",
    comment: "Zeer goede noise cancelling en geluidskwaliteit. Alleen de prijs is wat aan de hoge kant.",
    date: "2024-01-13",
    verified: true,
    helpful: 8,
    orderNumber: "BOL-2024-003",
    response: {
      message:
        "Bedankt voor je review! We zijn blij dat je tevreden bent met de geluidskwaliteit. De prijs reflecteert de premium kwaliteit van Sony.",
      date: "2024-01-14",
    },
    status: "responded",
  },
  {
    id: "REV-004",
    product: "Dell XPS 13 Laptop",
    customer: "Lisa van Dam",
    rating: 1,
    title: "Veel problemen",
    comment: "Laptop crasht regelmatig en wordt erg warm. Zeer teleurstellend voor deze prijs. Niet aan te raden.",
    date: "2024-01-12",
    verified: true,
    helpful: 15,
    orderNumber: "BOL-2024-004",
    response: null,
    status: "needs_response",
  },
]

const statusConfig = {
  published: { label: "Gepubliceerd", color: "bg-green-100 text-green-800" },
  needs_response: { label: "Reactie Nodig", color: "bg-red-100 text-red-800" },
  responded: { label: "Beantwoord", color: "bg-blue-100 text-blue-800" },
  hidden: { label: "Verborgen", color: "bg-gray-100 text-gray-800" },
}

export default function ReviewsPage() {
  const [selectedReview, setSelectedReview] = useState<string | null>(null)
  const [responseMessage, setResponseMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRating, setFilterRating] = useState<number | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRating = filterRating === null || review.rating === filterRating
    const matchesStatus = filterStatus === "all" || review.status === filterStatus

    return matchesSearch && matchesRating && matchesStatus
  })

  const selectedReviewData = reviews.find((review) => review.id === selectedReview)

  const handleSendResponse = () => {
    if (responseMessage.trim() && selectedReviewData) {
      console.log("Sending response to review:", selectedReviewData.id, responseMessage)
      setResponseMessage("")
      // Here you would typically send to your backend
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
    ))
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  const needsResponseCount = reviews.filter((r) => r.status === "needs_response").length
  const totalReviews = reviews.length

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Reviews</h1>
          <p className="text-gray-600 dark:text-gray-400">Beheer en beantwoord klantreviews</p>
        </div>
        <div className="flex space-x-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
            </div>
            <div className="text-sm text-gray-600">Gemiddelde score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{needsResponseCount}</div>
            <div className="text-sm text-gray-600">Reactie nodig</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{totalReviews}</div>
            <div className="text-sm text-gray-600">Totaal reviews</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reviews List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
              <div className="space-y-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Zoek reviews..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex space-x-2">
                  <select
                    value={filterRating || ""}
                    onChange={(e) => setFilterRating(e.target.value ? Number(e.target.value) : null)}
                    className="px-3 py-1 border rounded text-sm"
                  >
                    <option value="">Alle sterren</option>
                    <option value="5">5 sterren</option>
                    <option value="4">4 sterren</option>
                    <option value="3">3 sterren</option>
                    <option value="2">2 sterren</option>
                    <option value="1">1 ster</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-1 border rounded text-sm"
                  >
                    <option value="all">Alle statussen</option>
                    <option value="needs_response">Reactie nodig</option>
                    <option value="responded">Beantwoord</option>
                    <option value="published">Gepubliceerd</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {filteredReviews.map((review) => (
                  <div
                    key={review.id}
                    onClick={() => setSelectedReview(review.id)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                      selectedReview === review.id ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-[#0050D8]" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center space-x-1">{renderStars(review.rating)}</div>
                      <Badge className={statusConfig[review.status as keyof typeof statusConfig].color}>
                        {statusConfig[review.status as keyof typeof statusConfig].label}
                      </Badge>
                    </div>
                    <h3 className="font-medium text-sm mb-1">{review.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{review.product}</p>
                    <p className="text-xs text-gray-500">
                      {review.customer} • {formatDate(review.date)}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Review Details */}
        <div className="lg:col-span-2">
          {selectedReviewData ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1">{renderStars(selectedReviewData.rating)}</div>
                      <span className="text-sm text-gray-600">{selectedReviewData.rating}/5 sterren</span>
                      {selectedReviewData.verified && (
                        <Badge variant="outline" className="text-xs">
                          Geverifieerde aankoop
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{selectedReviewData.title}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedReviewData.customer} • {formatDate(selectedReviewData.date)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Product: {selectedReviewData.product} • Bestelling: {selectedReviewData.orderNumber}
                    </p>
                  </div>
                  <Badge className={statusConfig[selectedReviewData.status as keyof typeof statusConfig].color}>
                    {statusConfig[selectedReviewData.status as keyof typeof statusConfig].label}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Review Content */}
                <div>
                  <h4 className="font-medium mb-2">Review</h4>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p>{selectedReviewData.comment}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {selectedReviewData.helpful} mensen vonden dit nuttig
                      </div>
                    </div>
                  </div>
                </div>

                {/* Existing Response */}
                {selectedReviewData.response && (
                  <div>
                    <h4 className="font-medium mb-2">Jouw Reactie</h4>
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border-l-4 border-[#0050D8]">
                      <p className="mb-2">{selectedReviewData.response.message}</p>
                      <p className="text-sm text-gray-600">
                        Beantwoord op {formatDate(selectedReviewData.response.date)}
                      </p>
                    </div>
                  </div>
                )}

                {/* Response Section */}
                {selectedReviewData.status === "needs_response" && (
                  <div>
                    <h4 className="font-medium mb-2">Reactie Schrijven</h4>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setResponseMessage("Bedankt voor je review! We waarderen je feedback.")}
                        >
                          Bedank klant
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setResponseMessage(
                              "We begrijpen je teleurstelling. Neem contact met ons op voor een oplossing.",
                            )
                          }
                        >
                          Excuses aanbieden
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setResponseMessage("Bedankt voor je feedback. We nemen dit mee in onze productverbetering.")
                          }
                        >
                          Feedback waarderen
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setResponseMessage("Neem contact met ons op via [email] voor persoonlijke ondersteuning.")
                          }
                        >
                          Contact aanbieden
                        </Button>
                      </div>
                      <textarea
                        placeholder="Schrijf je reactie..."
                        value={responseMessage}
                        onChange={(e) => setResponseMessage(e.target.value)}
                        className="w-full p-3 border rounded-lg resize-none"
                        rows={4}
                      />
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setResponseMessage("")}>
                          Wissen
                        </Button>
                        <Button
                          variant="bol"
                          onClick={handleSendResponse}
                          disabled={!responseMessage.trim()}
                          className="flex items-center"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Reactie Versturen
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Review Actions */}
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Acties</h4>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      Review Verbergen
                    </Button>
                    <Button variant="outline" size="sm">
                      Rapporteer als Spam
                    </Button>
                    <Button variant="outline" size="sm">
                      Contact Klant
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-[600px] flex items-center justify-center">
              <div className="text-center">
                <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Selecteer een review om details te bekijken</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
