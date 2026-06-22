"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { FilterBar } from "@/components/shared/filter-bar"
import { MapCard } from "@/components/shared/map-card"

export default function PetaPage() {
  const [periode, setPeriode] = useState("")
  const [jenisKekerasan, setJenisKekerasan] = useState("")
  const [statusKasus, setStatusKasus] = useState("")
  const [levelWilayah, setLevelWilayah] = useState("")

  const periodeOptions = [
    { value: "2026", label: "2026" },
    { value: "2025", label: "2025" },
  ]

  const jenisKekerasanOptions = [
    { value: "fisik", label: "Kekerasan Fisik" },
    { value: "psikis", label: "Kekerasan Psikis" },
    { value: "seksual", label: "Kekerasan Seksual" },
    { value: "ekonomi", label: "Penelantaran Ekonomi" },
  ]

  const statusOptions = [
    { value: "DRAFT", label: "Draft" },
    { value: "VERIFIED", label: "Terverifikasi" },
    { value: "IN_PROGRESS", label: "Dalam Penanganan" },
    { value: "CLOSED", label: "Ditutup" },
  ]

  const wilayahOptions = [
    { value: "provinsi", label: "Provinsi" },
    { value: "kota", label: "Kota/Kabupaten" },
    { value: "kecamatan", label: "Kecamatan" },
    { value: "desa", label: "Desa/Kelurahan" },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Peta Persebaran Kasus" description="Visualisasi persebaran kasus KBG & TPKS berdasarkan wilayah" />

      <FilterBar
        filters={[
          { key: "periode", label: "Periode", options: periodeOptions, value: periode, onChange: setPeriode },
          { key: "jenis_kekerasan", label: "Jenis Kekerasan", options: jenisKekerasanOptions, value: jenisKekerasan, onChange: setJenisKekerasan },
          { key: "status_kasus", label: "Status Kasus", options: statusOptions, value: statusKasus, onChange: setStatusKasus },
          { key: "level_wilayah", label: "Level Wilayah", options: wilayahOptions, value: levelWilayah, onChange: setLevelWilayah },
        ]}
        onReset={() => { setPeriode(""); setJenisKekerasan(""); setStatusKasus(""); setLevelWilayah("") }}
      />

      <MapCard
        empty
        emptyMessage="Belum ada data persebaran yang dapat ditampilkan."
      />
    </div>
  )
}
