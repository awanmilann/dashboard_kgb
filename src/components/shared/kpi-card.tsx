"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils/cn"

interface KpiCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  variant?: "default" | "purple" | "green" | "red" | "yellow" | "blue"
  href?: string
  trend?: {
    value: string
    positive: boolean
  }
}

const variantStyles = {
  default: "border-gray-200 dark:border-gray-700",
  purple: "border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/50",
  green: "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/50",
  red: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/50",
  yellow: "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950/50",
  blue: "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/50",
}

const iconStyles = {
  default: "text-purple-600 dark:text-purple-400",
  purple: "text-purple-600 dark:text-purple-400",
  green: "text-green-600 dark:text-green-400",
  red: "text-red-600 dark:text-red-400",
  yellow: "text-yellow-600 dark:text-yellow-400",
  blue: "text-blue-600 dark:text-blue-400",
}

export function KpiCard({
  title,
  value,
  description,
  icon,
  variant = "default",
  href,
  trend,
}: KpiCardProps) {
  const card = (
    <Card className={cn("dark:bg-gray-900/80", variantStyles[variant], href && "cursor-pointer hover:shadow-md hover:shadow-purple-900/5 dark:hover:shadow-purple-900/20 transition-all duration-200")}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {value}
            </p>
            {description && (
              <p className="text-xs text-gray-600 dark:text-gray-400">{description}</p>
            )}
            {trend && (
              <p
                className={cn(
                  "text-xs font-medium",
                  trend.positive ? "text-green-600" : "text-red-600"
                )}
              >
                {trend.value}
              </p>
            )}
          </div>
          {icon && (
            <div className={cn("p-2 rounded-lg", iconStyles[variant])}>
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  if (href) {
    return <Link href={href}>{card}</Link>
  }

  return card
}
