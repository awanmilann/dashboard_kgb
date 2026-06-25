"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { ChevronLeft, CheckCircle, XCircle, RefreshCw } from "lucide-react"

export default function VerifikasiDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [catatan, setCatatan] = useState("")

  const handleAction = (action: "verifikasi" | "tolak" | "perbaikan") => {
    const messages: Record<string, string> = {
      verifikasi: "Kasus berhasil diverifikasi.",
      tolak: "Kasus ditolak.",
      perbaikan: "Permintaan perbaikan telah dikirim ke pelapor.",
    }
    alert(messages[action])
    router.push("/verifikasi")
  }

  return (
    <div className="space-y-6">
      <PageHeader title={`Verifikasi Kasus: KBG/${params.id}`}>
        <Button variant="outline" onClick={() => router.push("/verifikasi")}>
          <ChevronLeft className="h-4 w-4 mr-1" />
          Kembali
        </Button>
      </PageHeader>

      <Card>
        <CardHeader>
          <CardTitle>Ringkasan Kasus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-gray-400">
            <p className="text-sm text-center max-w-md">
              Data kasus akan ditampilkan di sini setelah database terhubung.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tindakan Verifikasi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="catatan">Catatan Verifikasi</Label>
            <textarea
              id="catatan"
              className="flex min-h-[120px] w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2"
              placeholder="Tambahkan catatan untuk tindakan verifikasi..."
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button variant="warning" onClick={() => handleAction("perbaikan")}>
              <RefreshCw className="h-4 w-4 mr-1" />
              Minta Perbaikan
            </Button>
            <Button variant="destructive" onClick={() => handleAction("tolak")}>
              <XCircle className="h-4 w-4 mr-1" />
              Tolak
            </Button>
            <Button variant="success" onClick={() => handleAction("verifikasi")}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Verifikasi
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
