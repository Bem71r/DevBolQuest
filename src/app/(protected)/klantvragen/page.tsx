"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Clock, MessageCircle, Send, User, Bot } from "lucide-react"
import { formatDate } from "@/lib/utils"

// Mock data
const questions = [
  {
    id: "Q-001",
    customer: "Jan de Vries",
    email: "jan@email.com",
    subject: "Vraag over levering Samsung Galaxy S24",
    status: "open",
    priority: "high",
    created: "2024-01-15T10:30:00",
    lastReply: "2024-01-15T10:30:00",
    slaDeadline: "2024-01-16T10:30:00",
    orderNumber: "BOL-2024-001",
    messages: [
      {
        id: 1,
        sender: "customer",
        message:
          "Hallo, ik heb gisteren een Samsung Galaxy S24 besteld maar ik zie nog geen track & trace informatie. Wanneer wordt deze verzonden?",
        timestamp: "2024-01-15T10:30:00",
      },
    ],
  },
  {
    id: "Q-002",
    customer: "Maria Jansen",
    email: "maria@email.com",
    subject: "Retour aanvraag iPhone 15 Pro",
    status: "in_progress",
    priority: "medium",
    created: "2024-01-14T14:20:00",
    lastReply: "2024-01-15T09:15:00",
    slaDeadline: "2024-01-15T14:20:00",
    orderNumber: "BOL-2024-002",
    messages: [
      {
        id: 1,
        sender: "customer",
        message: "Ik wil graag mijn iPhone 15 Pro retourneren omdat deze niet voldoet aan mijn verwachtingen.",
        timestamp: "2024-01-14T14:20:00",
      },
      {
        id: 2,
        sender: "seller",
        message:
          "Bedankt voor uw bericht. Ik ga direct een retourlabel voor u aanmaken. U ontvangt deze binnen 24 uur per e-mail.",
        timestamp: "2024-01-15T09:15:00",
      },
    ],
  },
  {
    id: "Q-003",
    customer: "Piet Bakker",
    email: "piet@email.com",
    subject: "Technische vraag over Sony headphones",
    status: "closed",
    priority: "low",
    created: "2024-01-12T16:45:00",
    lastReply: "2024-01-13T11:30:00",
    slaDeadline: "2024-01-13T16:45:00",
    orderNumber: "BOL-2024-003",
    messages: [
      {
        id: 1,
        sender: "customer",
        message: "Hoe kan ik de noise cancelling functie activeren op mijn Sony WH-1000XM5?",
        timestamp: "2024-01-12T16:45:00",
      },
      {
        id: 2,
        sender: "seller",
        message:
          "U kunt de noise cancelling activeren door de NC/AMBIENT knop op de linker oorschelp in te drukken. In de Sony Headphones Connect app kunt u ook verschillende niveaus instellen.",
        timestamp: "2024-01-13T11:30:00",
      },
      {
        id: 3,
        sender: "customer",
        message: "Perfect, bedankt voor de uitleg!",
        timestamp: "2024-01-13T11:30:00",
      },
    ],
  },
]

const cannedReplies = [
  "Bedankt voor uw bericht. Ik ga dit direct voor u uitzoeken.",
  "Uw bestelling wordt vandaag verzonden. U ontvangt automatisch een track & trace code.",
  "Ik ga direct een retourlabel voor u aanmaken.",
  "Voor technische vragen verwijs ik u graag naar de handleiding of fabrikant.",
  "Uw vraag is doorgestuurd naar onze technische afdeling.",
]

const statusConfig = {
  open: { label: "Open", color: "bg-red-100 text-red-800" },
  in_progress: { label: "In Behandeling", color: "bg-yellow-100 text-yellow-800" },
  closed: { label: "Gesloten", color: "bg-green-100 text-green-800" },
}

const priorityConfig = {
  high: { label: "Hoog", color: "bg-red-100 text-red-800" },
  medium: { label: "Gemiddeld", color: "bg-yellow-100 text-yellow-800" },
  low: { label: "Laag", color: "bg-green-100 text-green-800" },
}

export default function KlantvragenPage() {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null)
  const [replyMessage, setReplyMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredQuestions = questions.filter(
    (q) =>
      q.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedQuestionData = questions.find((q) => q.id === selectedQuestion)

  const handleSendReply = () => {
    if (replyMessage.trim()) {
      console.log("Sending reply:", replyMessage)
      setReplyMessage("")
      // Here you would typically send to your backend
    }
  }

  const handleCannedReply = (reply: string) => {
    setReplyMessage(reply)
  }

  const getSLAStatus = (deadline: string) => {
    const now = new Date()
    const slaDate = new Date(deadline)
    const hoursLeft = (slaDate.getTime() - now.getTime()) / (1000 * 60 * 60)

    if (hoursLeft < 0) return { status: "overdue", text: "Verlopen", color: "text-red-600" }
    if (hoursLeft < 2)
      return { status: "urgent", text: `${Math.round(hoursLeft)}u resterend`, color: "text-orange-600" }
    return { status: "ok", text: `${Math.round(hoursLeft)}u resterend`, color: "text-green-600" }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Klantvragen</h1>
        <p className="text-gray-600 dark:text-gray-400">Beheer en beantwoord klantvragen</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Questions List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Klantvragen</CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Zoek vragen..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {filteredQuestions.map((question) => {
                  const sla = getSLAStatus(question.slaDeadline)
                  return (
                    <div
                      key={question.id}
                      onClick={() => setSelectedQuestion(question.id)}
                      className={`p-4 border-b cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 ${
                        selectedQuestion === question.id
                          ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-[#0050D8]"
                          : ""
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <Badge className={statusConfig[question.status as keyof typeof statusConfig].color}>
                            {statusConfig[question.status as keyof typeof statusConfig].label}
                          </Badge>
                          <Badge className={priorityConfig[question.priority as keyof typeof priorityConfig].color}>
                            {priorityConfig[question.priority as keyof typeof priorityConfig].label}
                          </Badge>
                        </div>
                        <div className={`text-xs ${sla.color} flex items-center`}>
                          <Clock className="w-3 h-3 mr-1" />
                          {sla.text}
                        </div>
                      </div>
                      <h3 className="font-medium text-sm mb-1">{question.subject}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{question.customer}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatDate(question.created)}</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Conversation View */}
        <div className="lg:col-span-2">
          {selectedQuestionData ? (
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{selectedQuestionData.subject}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedQuestionData.customer} • {selectedQuestionData.email}
                    </p>
                    <p className="text-sm text-gray-500">Bestelling: {selectedQuestionData.orderNumber}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={statusConfig[selectedQuestionData.status as keyof typeof statusConfig].color}>
                      {statusConfig[selectedQuestionData.status as keyof typeof statusConfig].label}
                    </Badge>
                    <Badge
                      className={priorityConfig[selectedQuestionData.priority as keyof typeof priorityConfig].color}
                    >
                      {priorityConfig[selectedQuestionData.priority as keyof typeof priorityConfig].label}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {selectedQuestionData.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "seller" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === "seller"
                            ? "bg-[#0050D8] text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-1">
                          {message.sender === "seller" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                          <span className="text-xs opacity-75">
                            {message.sender === "seller" ? "Verkoper" : selectedQuestionData.customer}
                          </span>
                          <span className="text-xs opacity-75">{formatDate(message.timestamp)}</span>
                        </div>
                        <p className="text-sm">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Reply Section */}
              <div className="border-t p-4">
                {/* Canned Replies */}
                <div className="mb-3">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">Snelle antwoorden:</p>
                  <div className="flex flex-wrap gap-2">
                    {cannedReplies.map((reply, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleCannedReply(reply)}
                        className="text-xs"
                      >
                        {reply.substring(0, 30)}...
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Reply Input */}
                <div className="flex space-x-2">
                  <Input
                    placeholder="Typ uw antwoord..."
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendReply()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendReply} variant="bol" disabled={!replyMessage.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="h-[600px] flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  Selecteer een klantvraag om de conversatie te bekijken
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
