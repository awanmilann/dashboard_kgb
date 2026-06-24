"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils/cn"
import { Inbox } from "lucide-react"

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    onClick: () => void
  }
  className?: string
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <Card className={cn("w-full border-gray-300 dark:border-gray-800/60", className)}>
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div className="mb-4 text-gray-400 dark:text-gray-600">
          {icon ?? <Inbox className="h-16 w-16" />}
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
          {description}
        </p>
        {action && (
          <Button onClick={action.onClick}>{action.label}</Button>
        )}
      </CardContent>
    </Card>
  )
}
