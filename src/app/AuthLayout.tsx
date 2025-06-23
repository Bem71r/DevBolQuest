"use client"

import { usePathname } from "next/navigation"
import { useAuth } from "@/components/providers/auth-provider"
import ClientLayout from "./ClientLayout"
import { Loader2 } from "lucide-react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, loading } = useAuth()
  const pathname = usePathname()
  const isAuthPage = pathname.startsWith('/auth/')

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Bol Verkoper Suite
          </h1>
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Laden...</p>
        </div>
      </div>
    )
  }

  // If we're on an auth page, just show it
  if (isAuthPage) {
    return <>{children}</>
  }

  // If not authenticated and not on an auth page, don't show anything
  // The auth guard will handle redirection
  if (!user && !isAuthPage) {
    return null
  }

  // If authenticated, show the main layout
  return <ClientLayout>{children}</ClientLayout>
} 