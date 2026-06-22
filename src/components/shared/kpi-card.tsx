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
  default: "border-gray-200",
  purple: "border-purple-200 bg-purple-50",
  green: "border-green-200 bg-green-50",
  red: "border-red-200 bg-red-50",
  yellow: "border-yellow-200 bg-yellow-50",
  blue: "border-blue-200 bg-blue-50",
}

const iconStyles = {
  default: "text-purple-600",
  purple: "text-purple-600",
  green: "text-green-600",
  red: "text-red-600",
  yellow: "text-yellow-600",
  blue: "text-blue-600",
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
    <Card className={cn(variantStyles[variant], href && "cursor-pointer hover:shadow-md transition-shadow")}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">
              {value}
            </p>
            {description && (
              <p className="text-xs text-gray-500">{description}</p>
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
