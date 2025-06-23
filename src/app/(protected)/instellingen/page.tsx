"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { User, Store, Bell, CreditCard, Shield, Truck, Save, Edit } from "lucide-react"

// Mock data
const userProfile = {
  firstName: "Jan",
  lastName: "Verkoper",
  email: "jan@verkoper.nl",
  phone: "+31 6 12345678",
  company: "Verkoper BV",
  kvk: "12345678",
  btw: "NL123456789B01",
  address: "Hoofdstraat 123",
  postalCode: "1234 AB",
  city: "Amsterdam",
  country: "Nederland",
}

const storeSettings = {
  storeName: "Jan's Electronics",
  description: "Specialist in consumer electronics en gadgets",
  logo: "/placeholder.svg?height=100&width=100",
  returnPolicy: "14 dagen retourrecht",
  shippingTime: "1-2 werkdagen",
  minOrderAmount: 25,
  freeShippingThreshold: 50,
}

const notifications = {
  orderNotifications: true,
  reviewNotifications: true,
  promotionNotifications: false,
  systemNotifications: true,
  emailDigest: "weekly",
  smsNotifications: false,
}

const paymentSettings = {
  bankAccount: "NL91 ABNA 0417 1643 00",
  paymentSchedule: "bi-weekly",
  invoiceEmail: "facturen@verkoper.nl",
  taxRate: 21,
}

export default function InstellingenPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState(userProfile)

  const tabs = [
    { id: "profile", label: "Profiel", icon: User },
    { id: "store", label: "Winkel", icon: Store },
    { id: "notifications", label: "Notificaties", icon: Bell },
    { id: "payments", label: "Betalingen", icon: CreditCard },
    { id: "security", label: "Beveiliging", icon: Shield },
    { id: "shipping", label: "Verzending", icon: Truck },
  ]

  const handleSaveProfile = () => {
    console.log("Saving profile:", editedProfile)
    setIsEditing(false)
    // Here you would typically save to your backend
  }

  const handleNotificationChange = (key: string, value: any) => {
    console.log("Updating notification:", key, value)
    // Here you would typically save to your backend
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Instellingen</h1>
        <p className="text-gray-600 dark:text-gray-400">Beheer je account en winkel instellingen</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap ${
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

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Persoonlijke Gegevens</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? "Annuleren" : "Bewerken"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Voornaam</label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.firstName}
                      onChange={(e) => setEditedProfile({ ...editedProfile, firstName: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-gray-100">{userProfile.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Achternaam</label>
                  {isEditing ? (
                    <Input
                      value={editedProfile.lastName}
                      onChange={(e) => setEditedProfile({ ...editedProfile, lastName: e.target.value })}
                    />
                  ) : (
                    <p className="text-gray-900 dark:text-gray-100">{userProfile.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">E-mailadres</label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                  />
                ) : (
                  <p className="text-gray-900 dark:text-gray-100">{userProfile.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Telefoonnummer</label>
                {isEditing ? (
                  <Input
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                  />
                ) : (
                  <p className="text-gray-900 dark:text-gray-100">{userProfile.phone}</p>
                )}
              </div>

              {isEditing && (
                <Button variant="bol" onClick={handleSaveProfile} className="flex items-center">
                  <Save className="w-4 h-4 mr-2" />
                  Opslaan
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bedrijfsgegevens</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Bedrijfsnaam</label>
                <p className="text-gray-900 dark:text-gray-100">{userProfile.company}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">KvK nummer</label>
                  <p className="text-gray-900 dark:text-gray-100">{userProfile.kvk}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">BTW nummer</label>
                  <p className="text-gray-900 dark:text-gray-100">{userProfile.btw}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Adres</label>
                <p className="text-gray-900 dark:text-gray-100">{userProfile.address}</p>
                <p className="text-gray-900 dark:text-gray-100">
                  {userProfile.postalCode} {userProfile.city}
                </p>
                <p className="text-gray-900 dark:text-gray-100">{userProfile.country}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Store Tab */}
      {activeTab === "store" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Winkel Informatie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Winkelnaam</label>
                <Input defaultValue={storeSettings.storeName} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Beschrijving</label>
                <textarea className="w-full p-2 border rounded-md" rows={3} defaultValue={storeSettings.description} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Logo</label>
                <div className="flex items-center space-x-4">
                  <img
                    src={storeSettings.logo || "/placeholder.svg"}
                    alt="Store logo"
                    className="w-16 h-16 rounded-lg object-cover border"
                  />
                  <Button variant="outline">Upload Nieuw Logo</Button>
                </div>
              </div>

              <Button variant="bol" className="flex items-center">
                <Save className="w-4 h-4 mr-2" />
                Opslaan
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Winkel Beleid</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Retourbeleid</label>
                <Input defaultValue={storeSettings.returnPolicy} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Verzendtijd</label>
                <Input defaultValue={storeSettings.shippingTime} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Min. bestelbedrag</label>
                  <Input type="number" defaultValue={storeSettings.minOrderAmount} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Gratis verzending vanaf</label>
                  <Input type="number" defaultValue={storeSettings.freeShippingThreshold} />
                </div>
              </div>

              <Button variant="bol" className="flex items-center">
                <Save className="w-4 h-4 mr-2" />
                Opslaan
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === "notifications" && (
        <Card>
          <CardHeader>
            <CardTitle>Notificatie Voorkeuren</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Bestelling notificaties</h4>
                  <p className="text-sm text-gray-600">Ontvang meldingen bij nieuwe bestellingen</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.orderNotifications}
                  onChange={(e) => handleNotificationChange("orderNotifications", e.target.checked)}
                  className="h-4 w-4 text-[#0050D8] focus:ring-[#0050D8] border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Review notificaties</h4>
                  <p className="text-sm text-gray-600">Ontvang meldingen bij nieuwe reviews</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.reviewNotifications}
                  onChange={(e) => handleNotificationChange("reviewNotifications", e.target.checked)}
                  className="h-4 w-4 text-[#0050D8] focus:ring-[#0050D8] border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Promotie notificaties</h4>
                  <p className="text-sm text-gray-600">Ontvang meldingen over nieuwe promoties en deals</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.promotionNotifications}
                  onChange={(e) => handleNotificationChange("promotionNotifications", e.target.checked)}
                  className="h-4 w-4 text-[#0050D8] focus:ring-[#0050D8] border-gray-300 rounded"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Systeem notificaties</h4>
                  <p className="text-sm text-gray-600">Belangrijke systeem updates en meldingen</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.systemNotifications}
                  onChange={(e) => handleNotificationChange("systemNotifications", e.target.checked)}
                  className="h-4 w-4 text-[#0050D8] focus:ring-[#0050D8] border-gray-300 rounded"
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-medium mb-4">E-mail Voorkeuren</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">E-mail samenvatting</label>
                  <select
                    value={notifications.emailDigest}
                    onChange={(e) => handleNotificationChange("emailDigest", e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="daily">Dagelijks</option>
                    <option value="weekly">Wekelijks</option>
                    <option value="monthly">Maandelijks</option>
                    <option value="never">Nooit</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS notificaties</h4>
                    <p className="text-sm text-gray-600">Ontvang belangrijke meldingen via SMS</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.smsNotifications}
                    onChange={(e) => handleNotificationChange("smsNotifications", e.target.checked)}
                    className="h-4 w-4 text-[#0050D8] focus:ring-[#0050D8] border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payments Tab */}
      {activeTab === "payments" && (
        <Card>
          <CardHeader>
            <CardTitle>Betalingsinstellingen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Bankrekening (IBAN)</label>
              <Input defaultValue={paymentSettings.bankAccount} />
              <p className="text-xs text-gray-600 mt-1">Uitbetalingen worden naar dit account overgemaakt</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Uitbetalingsschema</label>
              <select defaultValue={paymentSettings.paymentSchedule} className="w-full p-2 border rounded-md">
                <option value="weekly">Wekelijks</option>
                <option value="bi-weekly">Tweewekelijks</option>
                <option value="monthly">Maandelijks</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Factuur e-mailadres</label>
              <Input type="email" defaultValue={paymentSettings.invoiceEmail} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">BTW tarief (%)</label>
              <Input type="number" defaultValue={paymentSettings.taxRate} />
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Betalingsinformatie</h4>
              <div className="text-sm text-blue-700 dark:text-blue-200 space-y-1">
                <p>• Commissie: 10% van bruto omzet</p>
                <p>• Minimumbedrag voor uitbetaling: €25</p>
                <p>• Verwerkingstijd: 1-3 werkdagen</p>
                <p>• Facturen worden automatisch gegenereerd</p>
              </div>
            </div>

            <Button variant="bol" className="flex items-center">
              <Save className="w-4 h-4 mr-2" />
              Opslaan
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Wachtwoord</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Huidig wachtwoord</label>
                <Input type="password" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Nieuw wachtwoord</label>
                <Input type="password" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bevestig nieuw wachtwoord</label>
                <Input type="password" />
              </div>

              <Button variant="bol">Wachtwoord Wijzigen</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Twee-factor Authenticatie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">2FA Status</h4>
                  <p className="text-sm text-gray-600">Extra beveiliging voor je account</p>
                </div>
                <Badge className="bg-red-100 text-red-800">Uitgeschakeld</Badge>
              </div>

              <p className="text-sm text-gray-600">
                Twee-factor authenticatie voegt een extra beveiligingslaag toe aan je account.
              </p>

              <Button variant="bol">2FA Inschakelen</Button>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Actieve Sessies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Huidige sessie</h4>
                    <p className="text-sm text-gray-600">Chrome op Windows • Amsterdam, Nederland</p>
                    <p className="text-xs text-gray-500">Laatst actief: Nu</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Actief</Badge>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Mobiele app</h4>
                    <p className="text-sm text-gray-600">iPhone • Amsterdam, Nederland</p>
                    <p className="text-xs text-gray-500">Laatst actief: 2 uur geleden</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Uitloggen
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Shipping Tab */}
      {activeTab === "shipping" && (
        <Card>
          <CardHeader>
            <CardTitle>Verzendingsinstellingen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-4">Verzendopties</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Standaard verzending</h5>
                      <p className="text-sm text-gray-600">1-2 werkdagen • €4.95</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-[#0050D8] focus:ring-[#0050D8] border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Express verzending</h5>
                      <p className="text-sm text-gray-600">Volgende werkdag • €7.95</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-[#0050D8] focus:ring-[#0050D8] border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Gratis verzending</h5>
                      <p className="text-sm text-gray-600">Vanaf €50 • 2-3 werkdagen</p>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-[#0050D8] focus:ring-[#0050D8] border-gray-300 rounded"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Verzendgebieden</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Nederland</h5>
                      <p className="text-sm text-gray-600">Alle postcodes</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Actief</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">België</h5>
                      <p className="text-sm text-gray-600">Alle postcodes</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Actief</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-medium">Duitsland</h5>
                      <p className="text-sm text-gray-600">Geselecteerde gebieden</p>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Beperkt</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h4 className="font-medium mb-4">Retourinstellingen</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Retourperiode (dagen)</label>
                  <Input type="number" defaultValue="14" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Retourkosten</label>
                  <select className="w-full p-2 border rounded-md">
                    <option value="customer">Voor klant</option>
                    <option value="seller">Voor verkoper</option>
                    <option value="free">Gratis</option>
                  </select>
                </div>
              </div>
            </div>

            <Button variant="bol" className="flex items-center">
              <Save className="w-4 h-4 mr-2" />
              Opslaan
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
