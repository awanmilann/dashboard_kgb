"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils/cn"
import { ChevronLeft } from "lucide-react"

const tabs = [
  { id: "ringkasan", label: "Ringkasan" },
  { id: "kejadian", label: "Kejadian" },
  { id: "penyintas", label: "Penyintas" },
  { id: "penanganan", label: "Penanganan" },
  { id: "rujukan", label: "Rujukan" },
  { id: "verifikasi", label: "Verifikasi" },
  { id: "riwayat", label: "Riwayat" },
]

export default function DetailKasusPage() {
  const params = useParams()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("ringkasan")

  const caseNumber = `KBG/${params.id}`

  return (
    <div className="space-y-6">
      <PageHeader title={`Detail Kasus: ${caseNumber}`}>
        <Button variant="outline" onClick={() => router.push("/kasus")}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Kembali
        </Button>
      </PageHeader>

      <div className="border-b border-gray-200">
        <nav className="flex overflow-x-auto gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-3 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
                activeTab === tab.id
                  ? "border-purple-600 text-purple-700"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {tabs.find((t) => t.id === activeTab)?.label}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <p className="text-sm text-center max-w-md">
              Data kasus akan ditampilkan di sini setelah database terhubung.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
