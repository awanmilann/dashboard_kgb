"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

export function ErrorState({
  title = "Terjadi Kesalahan",
  message = "Gagal memuat data. Silakan coba lagi.",
  onRetry,
}: ErrorStateProps) {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center py-16">
        <div className="mb-4 p-3 rounded-full bg-red-100">
          <AlertCircle className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 text-center max-w-md mb-6">
          {message}
        </p>
        {onRetry && (
          <Button variant="outline" onClick={onRetry}>
            Coba Lagi
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
