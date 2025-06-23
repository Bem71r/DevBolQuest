"use client"

import type React from "react"
import { useState } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { TopBar } from "@/components/layout/topbar"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { AuthProvider } from "@/components/providers/auth-provider"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <AuthProvider>
      <div className="relative flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex-1 flex flex-col overflow-hidden md:ml-64">
          <TopBar onMenuClick={() => setSidebarOpen(true)} />

          <main className="flex-1 overflow-auto">
            <div className="p-4 sm:p-6">
              <div className="mb-4 sm:mb-6">
                <Breadcrumbs />
              </div>
              <div className="max-w-full">{children}</div>
            </div>
          </main>
        </div>
      </div>
    </AuthProvider>
  )
}
