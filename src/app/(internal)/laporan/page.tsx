"use client"

import { useState, useEffect, useCallback } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils/cn"
import { FileText, FileSpreadsheet, Download, Loader2, Eye } from "lucide-react"

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
  const [loading, setLoading] = useState(false)
  const [previewData, setPreviewData] = useState<any>(null)
  const [error, setError] = useState("")
  const [locationOptions, setLocationOptions] = useState<{ value: string; label: string }[]>([])
  const [orgOptions, setOrgOptions] = useState<{ value: string; label: string }[]>([])

  useEffect(() => {
    async function load() {
      try {
        const [locRes, orgRes] = await Promise.all([
          fetch("/api/master/locations"),
          fetch("/api/organizations"),
        ])
        const locData = await locRes.json()
        const orgData = await orgRes.json()
        if (locData.success) setLocationOptions(locData.data.map((l: any) => ({ value: l.id, label: l.name })))
        if (orgData.success) setOrgOptions(orgData.data.map((o: any) => ({ value: o.id, label: o.name })))
      } catch (e) { console.error(e) }
    }
    load()
  }, [])

  const handlePreview = useCallback(async () => {
    setLoading(true)
    setError("")
    try {
      const params = new URLSearchParams()
      if (periode) params.set("periode", periode)
      if (wilayah) params.set("wilayah", wilayah)
      if (organisasi) params.set("organisasi", organisasi)

      const res = await fetch(`/api/analytics/dashboard?${params}`)
      const data = await res.json()
      if (data.success) {
        setPreviewData(data.data)
        setPreview(true)
      } else {
        setError("Gagal memuat data")
      }
    } catch (e) {
      setError("Terjadi kesalahan server")
    } finally {
      setLoading(false)
    }
  }, [periode, wilayah, organisasi])

  const handleExport = useCallback(async () => {
    setLoading(true)
    setError("")
    try {
      const params = new URLSearchParams()
      if (periode) params.set("periode", periode)
      if (wilayah) params.set("wilayah", wilayah)
      if (organisasi) params.set("organisasi", organisasi)

      const res = await fetch(`/api/analytics/dashboard?${params}`)
      const data = await res.json()

      if (!data.success) {
        setError("Gagal memuat data")
        setLoading(false)
        return
      }

      const d = data.data
      const rows = [
        ["Metrik", "Jumlah"],
        ["Total Kasus", d.total],
        ["Terverifikasi", d.verified],
        ["Dalam Penanganan", d.in_progress],
        ["Risiko Tinggi", d.high_risk],
        ["Belum Dirujuk", d.no_referral],
        ["Belum Diverifikasi", d.pending_verification],
      ]

      if (format === "pdf") {
        const { default: jsPDF } = await import("jspdf")
        const { default: autoTable } = await import("jspdf-autotable")
        const doc = new jsPDF()
        doc.setFontSize(16)
        doc.text("Laporan Dashboard KBG & TPKS", 14, 20)
        doc.setFontSize(10)
        doc.text(`Periode: ${periode || "Semua"} | Wilayah: ${wilayah || "Semua"}`, 14, 28)
        autoTable(doc, {
          head: [rows[0]],
          body: rows.slice(1),
          startY: 35,
          styles: { fontSize: 10 },
          headStyles: { fillColor: [124, 58, 237] },
        })
        doc.save(`laporan-kbg-${periode || "all"}.pdf`)
      } else {
        const { default: XLSX } = await import("xlsx")
        const ws = XLSX.utils.aoa_to_sheet(rows)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, "Laporan")
        XLSX.writeFile(wb, `laporan-kbg-${periode || "all"}.xlsx`)
      }

      await fetch("/api/reports/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          report_type: selectedType,
          format,
          period_start: periode ? `${periode}-01-01` : null,
          period_end: periode ? `${periode}-12-31` : null,
          wilayah,
          organisasi,
        }),
      })
    } catch (e) {
      setError("Gagal mengekspor laporan")
    } finally {
      setLoading(false)
    }
  }, [periode, wilayah, organisasi, format, selectedType])

  return (
    <div className="space-y-6">
      <PageHeader title="Laporan" description="Buat dan unduh laporan data kasus KBG & TPKS" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader><CardTitle>Jenis Laporan</CardTitle></CardHeader>
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
            <CardHeader><CardTitle>Filter Laporan</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="periode">Periode</Label>
                <Input id="periode" type="month" value={periode} onChange={(e) => setPeriode(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wilayah">Wilayah</Label>
                <Select id="wilayah" placeholder="Semua wilayah" options={locationOptions} value={wilayah} onChange={(e) => setWilayah(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organisasi">Organisasi</Label>
                <Select id="organisasi" placeholder="Semua organisasi" options={orgOptions} value={organisasi} onChange={(e) => setOrganisasi(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="format">Format</Label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFormat("pdf")}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border text-sm transition-colors",
                      format === "pdf" ? "border-purple-600 bg-purple-50 text-purple-700" : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <FileText className="h-4 w-4" /> PDF
                  </button>
                  <button
                    onClick={() => setFormat("excel")}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md border text-sm transition-colors",
                      format === "excel" ? "border-purple-600 bg-purple-50 text-purple-700" : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <FileSpreadsheet className="h-4 w-4" /> Excel
                  </button>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1" onClick={handlePreview} disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <FileText className="h-4 w-4 mr-1" />}
                  Preview
                </Button>
                <Button className="flex-1" onClick={handleExport} disabled={loading}>
                  {loading ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Download className="h-4 w-4 mr-1" />}
                  {loading ? "Memproses..." : "Download"}
                </Button>
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="min-h-[400px]">
            <CardHeader><CardTitle>Pratinjau Laporan</CardTitle></CardHeader>
            <CardContent>
              {preview && previewData ? (
                <div className="space-y-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 font-medium text-gray-500">Metrik</th>
                        <th className="text-right py-2 font-medium text-gray-500">Jumlah</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Total Kasus", previewData.total],
                        ["Terverifikasi", previewData.verified],
                        ["Dalam Penanganan", previewData.in_progress],
                        ["Risiko Tinggi", previewData.high_risk],
                        ["Belum Dirujuk", previewData.no_referral],
                        ["Belum Diverifikasi", previewData.pending_verification],
                      ].map(([label, val]) => (
                        <tr key={label as string} className="border-b border-gray-100">
                          <td className="py-2 text-gray-700">{label as string}</td>
                          <td className="py-2 text-right font-semibold">{val as number}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-400">
                    Laporan ini dihasilkan dari data agregat dashboard. Format export: {format.toUpperCase()}
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
