"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

const pathNames: Record<string, string> = {
  "/": "Dashboard",
  "/bestellingen": "Bestellingen",
  "/producten": "Producten",
  "/retouren": "Retouren",
  "/klantvragen": "Klantvragen",
  "/advertenties": "Advertenties",
  "/promoties": "Promoties",
  "/performance": "Performance",
  "/reviews": "Reviews",
  "/financien": "Financiën",
  "/analyse": "Analyse",
  "/instellingen": "Instellingen",
}

export function Breadcrumbs() {
  const pathname = usePathname()

  if (pathname === "/") {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 px-1">
        <Home className="w-4 h-4" />
        <span>Dashboard</span>
      </div>
    )
  }

  const pathSegments = pathname.split("/").filter(Boolean)

  return (
    <div className="flex items-center space-x-1 sm:space-x-2 text-sm text-gray-600 dark:text-gray-400 px-1 overflow-x-auto">
      <Link href="/" className="hover:text-[#0050D8] transition-colors flex-shrink-0">
        <Home className="w-4 h-4" />
      </Link>
      {pathSegments.map((segment, index) => {
        const path = "/" + pathSegments.slice(0, index + 1).join("/")
        const isLast = index === pathSegments.length - 1

        return (
          <div key={path} className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
            {isLast ? (
              <span className="font-medium text-gray-900 dark:text-gray-100 truncate">
                {pathNames[path] || segment}
              </span>
            ) : (
              <Link href={path} className="hover:text-[#0050D8] transition-colors truncate">
                {pathNames[path] || segment}
              </Link>
            )}
          </div>
        )
      })}
    </div>
  )
}
