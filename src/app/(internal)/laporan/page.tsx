"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { FilterBar } from "@/components/shared/filter-bar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils/cn"
import { FileText, FileSpreadsheet, Eye, Download } from "lucide-react"

const reportTypes = [
  { id: "bulanan", label: "Ringkasan Bulanan" },
  { id: "kuartalan", label: "Ringkasan Kuartalan" },
  { id: "wilayah", label: "Laporan Wilayah" },
  { id: "jenis_kekerasan", label: "Laporan Jenis Kekerasan" },
  { id: "status_penanganan", label: "Laporan Status Penanganan" },
]

export default function LaporanPage() {
  const [selectedType, setSelectedType] = useState("bulanan")
  const [periode, setPeriode] = useState("")
  const [wilayah, setWilayah] = useState("")
  const [organisasi, setOrganisasi] = useState("")
  const [format, setFormat] = useState("pdf")
  const [preview, setPreview] = useState(false)

  return (
    <div className="space-y-6">
      <PageHeader title="Laporan" description="Buat dan unduh laporan data kasus KBG & TPKS" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Jenis Laporan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {reportTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setSelectedType(type.id)}
                  className={cn(
                    "w-full text-left px-3 py-2 rounded-md text-sm transition-colors",
                    selectedType === type.id
                      ? "bg-purple-50 text-purple-700 font-medium"
                      : "text-gray-600 hover:bg-gray-50"
                  )}
                >
                  {type.label}
                </button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Filter Laporan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="periode">Periode</Label>
                <Input id="periode" type="month" value={periode} onChange={(e) => setPeriode(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wilayah">Wilayah</Label>
                <Select
                  id="wilayah"
                  placeholder="Semua wilayah"
                  options={[
                    { value: "jakarta", label: "Jakarta" },
                    { value: "jabar", label: "Jawa Barat" },
                    { value: "jateng", label: "Jawa Tengah" },
                  ]}
                  value={wilayah}
                  onChange={(e) => setWilayah(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organisasi">Organisasi</Label>
                <Select
                  id="organisasi"
                  placeholder="Semua organisasi"
                  options={[
                    { value: "upt", label: "UPT P2TP2A" },
                    { value: "dinas", label: "Dinas Sosial" },
                  ]}
                  value={organisasi}
                  onChange={(e) => setOrganisasi(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="format">Format</Label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFormat("pdf")}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border text-sm transition-colors",
                      format === "pdf"
                        ? "border-purple-600 bg-purple-50 text-purple-700"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <FileText className="h-4 w-4" />
                    PDF
                  </button>
                  <button
                    onClick={() => setFormat("excel")}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border text-sm transition-colors",
                      format === "excel"
                        ? "border-purple-600 bg-purple-50 text-purple-700"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <FileSpreadsheet className="h-4 w-4" />
                    Excel/CSV
                  </button>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" onClick={() => setPreview(!preview)}>
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
                <Button className="flex-1">
                  <Download className="h-4 w-4 mr-1" />
                  Generate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="min-h-[400px]">
            <CardHeader>
              <CardTitle>Pratinjau Laporan</CardTitle>
            </CardHeader>
            <CardContent>
              {preview ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <FileText className="h-12 w-12 mb-3" />
                  <p className="text-sm text-center max-w-sm">
                    Pratinjau laporan akan ditampilkan di sini setelah data tersedia.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <FileText className="h-12 w-12 mb-3" />
                  <p className="text-sm text-center max-w-sm">
                    Pilih jenis laporan dan filter, lalu klik Preview untuk melihat pratinjau.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
