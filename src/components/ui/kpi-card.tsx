"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface KpiCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: "increase" | "decrease"
  }
  icon: LucideIcon
  className?: string
  variant?: "default" | "bol" | "yellow"
}

export function KpiCard({ title, value, change, icon: Icon, className, variant = "default" }: KpiCardProps) {
  const variants = {
    default: "bg-white dark:bg-gray-800",
    bol: "bg-[#0050D8] text-white",
    yellow: "bg-[#FFD200] text-black",
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="w-full"
    >
      <Card className={cn(variants[variant], className)}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium truncate pr-2">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
        </CardHeader>
        <CardContent>
          <div className="text-xl sm:text-2xl font-bold truncate">{value}</div>
          {change && (
            <p className={cn("text-xs mt-1", change.type === "increase" ? "text-green-600" : "text-red-600")}>
              {change.type === "increase" ? "+" : "-"}
              {Math.abs(change.value)}% t.o.v. vorige periode
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
