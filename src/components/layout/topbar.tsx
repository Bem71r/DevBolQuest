"use client"

import { useState } from "react"
import { Search, Bell, ChevronDown, User, Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/providers/auth-provider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface TopBarProps {
  onMenuClick: () => void
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const [selectedStore, setSelectedStore] = useState("Mijn Winkel")
  const { user, signOut } = useAuth()

  const handleSignOut = async () => {
    await signOut()
  }

  const getUserInitials = () => {
    if (!user) return "U"
    const email = user.email || ""
    return email.charAt(0).toUpperCase()
  }

  const getUserDisplayName = () => {
    if (!user) return "Gebruiker"
    return user.user_metadata?.full_name || user.email?.split("@")[0] || "Gebruiker"
  }

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 flex items-center justify-between">
      {/* Left side - Mobile menu and store switcher */}
      <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="md:hidden h-8 w-8">
          <Menu className="h-5 w-5" />
        </Button>

        {/* Store switcher */}
        <div className="relative">
          <Button
            variant="outline"
            className="flex items-center space-x-1 sm:space-x-2 h-8 sm:h-10 text-xs sm:text-sm px-2 sm:px-3"
          >
            <span className="truncate max-w-[80px] sm:max-w-none">{selectedStore}</span>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          </Button>
        </div>

        {/* Global search - Hidden on small screens */}
        <div className="relative max-w-md flex-1 hidden sm:block">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input placeholder="Zoek bestellingen, producten..." className="pl-10" />
        </div>
      </div>

      {/* Right side - Notifications and user */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Search button for mobile */}
        <Button variant="ghost" size="icon" className="sm:hidden h-8 w-8">
          <Search className="w-4 h-4" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative h-8 w-8 sm:h-10 sm:w-10">
          <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </Button>

        {/* User avatar with dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-1 sm:space-x-2 h-8 sm:h-10 px-2 sm:px-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-[#0050D8] rounded-full flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm font-medium">
                  {getUserInitials()}
                </span>
              </div>
              <span className="hidden sm:block text-sm">{getUserDisplayName()}</span>
              <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 hidden sm:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{getUserDisplayName()}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Uitloggen</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
