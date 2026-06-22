"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils/cn"
import { BarChart3 } from "lucide-react"

interface ChartCardProps {
  title: string
  children: React.ReactNode
  empty?: boolean
  emptyMessage?: string
  className?: string
  action?: React.ReactNode
}

export function ChartCard({
  title,
  children,
  empty = false,
  emptyMessage = "Belum ada data",
  className,
  action,
}: ChartCardProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
        {action}
      </CardHeader>
      <CardContent>
        {empty ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <BarChart3 className="h-10 w-10 mb-2" />
            <p className="text-sm">{emptyMessage}</p>
          </div>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  )
}
