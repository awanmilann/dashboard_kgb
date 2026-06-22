"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { FilterBar } from "@/components/shared/filter-bar"
import { DashboardMap } from "@/components/shared/dashboard-map"
import { Loader2 } from "lucide-react"

export default function PetaPage() {
  const [periode, setPeriode] = useState("")
  const [jenisKekerasan, setJenisKekerasan] = useState("")
  const [statusKasus, setStatusKasus] = useState("")
  const [levelWilayah, setLevelWilayah] = useState("provinsi")

  const [loading, setLoading] = useState(true)
  const [mapData, setMapData] = useState<any[]>([])
  const [vtOptions, setVtOptions] = useState<{ value: string; label: string }[]>([])

  useEffect(() => {
    async function loadVt() {
      try {
        const res = await fetch("/api/master/violence-types")
        const data = await res.json()
        if (data.success) {
          setVtOptions(data.data.map((v: any) => ({ value: v.id, label: v.name })))
        }
      } catch (e) {
        console.error(e)
      }
    }
    loadVt()
  }, [])

  useEffect(() => {
    async function loadMap() {
      setLoading(true)
      try {
        const params = new URLSearchParams({ level: levelWilayah })
        if (periode) params.set("periode", periode)
        if (jenisKekerasan) params.set("jenis_kekerasan", jenisKekerasan)
        if (statusKasus) params.set("status_kasus", statusKasus)

        const res = await fetch(`/api/analytics/map?${params}`)
        const data = await res.json()
        if (data.success) setMapData(data.data || [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadMap()
  }, [periode, jenisKekerasan, statusKasus, levelWilayah])

  const periodeOptions = [
    { value: "2026", label: "2026" },
    { value: "2025", label: "2025" },
  ]

  const statusOptions = [
    { value: "DRAFT", label: "Draft" },
    { value: "REPORTED", label: "Dilaporkan" },
    { value: "IN_PROGRESS", label: "Dalam Penanganan" },
    { value: "CLOSED", label: "Selesai" },
  ]

  const wilayahOptions = [
    { value: "provinsi", label: "Provinsi" },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Peta Persebaran Kasus" description="Visualisasi persebaran kasus KBG & TPKS berdasarkan wilayah" />

      <FilterBar
        filters={[
          { key: "periode", label: "Periode", options: periodeOptions, value: periode, onChange: setPeriode },
          { key: "jenis_kekerasan", label: "Jenis Kekerasan", options: vtOptions, value: jenisKekerasan, onChange: setJenisKekerasan },
          { key: "status_kasus", label: "Status Kasus", options: statusOptions, value: statusKasus, onChange: setStatusKasus },
          { key: "level_wilayah", label: "Level Wilayah", options: wilayahOptions, value: levelWilayah, onChange: setLevelWilayah },
        ]}
        onReset={() => { setPeriode(""); setJenisKekerasan(""); setStatusKasus(""); setLevelWilayah("provinsi") }}
      />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        </div>
      ) : (
        <DashboardMap
          title="Peta Persebaran Kasus per Provinsi"
          data={mapData}
          empty={!mapData || mapData.length === 0}
          emptyMessage="Belum ada data persebaran yang dapat ditampilkan."
        />
      )}
    </div>
  )
}
