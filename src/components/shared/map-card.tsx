"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface MapCardProps {
  title?: string
  empty?: boolean
  emptyMessage?: string
  children?: React.ReactNode
}

export function MapCard({
  title = "Peta Persebaran",
  empty = false,
  emptyMessage = "Belum ada data persebaran yang dapat ditampilkan.",
  children,
}: MapCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {empty ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <MapPin className="h-12 w-12 mb-3" />
            <p className="text-sm text-center max-w-sm">{emptyMessage}</p>
          </div>
        ) : (
          children ?? (
            <div className="flex items-center justify-center py-16 text-gray-400">
              <p className="text-sm">Peta akan ditampilkan di sini</p>
            </div>
          )
        )}
      </CardContent>
    </Card>
  )
}
