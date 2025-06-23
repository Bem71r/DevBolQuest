"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/components/providers/auth-provider"
import { Loader2 } from "lucide-react"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!loading && mounted) {
      if (requireAuth && !user) {
        // Store the attempted URL
        if (pathname !== '/auth/login') {
          sessionStorage.setItem('redirectTo', pathname)
        }
        router.replace("/auth/login")
      } else if (!requireAuth && user) {
        // Redirect to the stored URL or default to dashboard
        const redirectTo = sessionStorage.getItem('redirectTo') || '/'
        sessionStorage.removeItem('redirectTo')
        router.replace(redirectTo)
      }
    }
  }, [user, loading, requireAuth, router, mounted, pathname])

  // Don't render anything until the component is mounted to prevent hydration issues
  if (!mounted) {
    return null
  }

  // Show loading state only for protected routes
  if (loading && requireAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Laden...</p>
        </div>
      </div>
    )
  }

  // Don't show protected content if not authenticated
  if (requireAuth && !user) {
    return null
  }

  // Don't show auth pages if already authenticated
  if (!requireAuth && user) {
    return null
  }

  return <>{children}</>
} 