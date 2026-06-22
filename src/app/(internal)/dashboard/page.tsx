"use client"

import { useState } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { FilterBar } from "@/components/shared/filter-bar"
import { KpiCard } from "@/components/shared/kpi-card"
import { ChartCard } from "@/components/charts/chart-card"
import { Button } from "@/components/ui/button"
import { Plus, BarChart3, CheckCircle, Clock, AlertTriangle, XCircle, FileSearch } from "lucide-react"

export default function DashboardPage() {
  const [periode, setPeriode] = useState("")
  const [wilayah, setWilayah] = useState("")
  const [organisasi, setOrganisasi] = useState("")
  const [jenisKekerasan, setJenisKekerasan] = useState("")

  const kpiData = [
    { title: "Total Kasus", value: 0, icon: <BarChart3 className="h-5 w-5" />, variant: "purple" as const, href: "/kasus" },
    { title: "Terverifikasi", value: 0, icon: <CheckCircle className="h-5 w-5" />, variant: "green" as const, href: "/verifikasi" },
    { title: "Dalam Penanganan", value: 0, icon: <Clock className="h-5 w-5" />, variant: "blue" as const, href: "/kasus" },
    { title: "Risiko Tinggi", value: 0, icon: <AlertTriangle className="h-5 w-5" />, variant: "red" as const, href: "/kasus" },
    { title: "Belum Dirujuk", value: 0, icon: <XCircle className="h-5 w-5" />, variant: "yellow" as const, href: "/rujukan" },
    { title: "Belum Diverifikasi", value: 0, icon: <FileSearch className="h-5 w-5" />, variant: "yellow" as const, href: "/verifikasi" },
  ]

  const filterOptions = [
    { value: "2026", label: "2026" },
    { value: "2025", label: "2025" },
    { value: "2024", label: "2024" },
  ]

  const wilayahOptions = [
    { value: "jakarta", label: "Jakarta" },
    { value: "jabar", label: "Jawa Barat" },
    { value: "jateng", label: "Jawa Tengah" },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard Pemantauan KBG & TPKS" description="Ringkasan data kasus dan penanganan">
        <Link href="/kasus/tambah">
          <Button>
            <Plus className="h-4 w-4 mr-1" />
            Tambah Data Kasus
          </Button>
        </Link>
      </PageHeader>

      <FilterBar
        filters={[
          { key: "periode", label: "Periode", options: filterOptions, value: periode, onChange: setPeriode },
          { key: "wilayah", label: "Wilayah", options: wilayahOptions, value: wilayah, onChange: setWilayah },
          { key: "organisasi", label: "Organisasi", options: [], value: organisasi, onChange: setOrganisasi },
          { key: "jenis_kekerasan", label: "Jenis Kekerasan", options: [], value: jenisKekerasan, onChange: setJenisKekerasan },
        ]}
        onReset={() => { setPeriode(""); setWilayah(""); setOrganisasi(""); setJenisKekerasan("") }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiData.map((kpi) => (
          <KpiCard key={kpi.title} title={kpi.title} value={kpi.value} icon={kpi.icon} variant={kpi.variant} href={kpi.href} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Tren Kasus per Bulan" empty emptyMessage="Belum ada data kasus yang dapat ditampilkan.">
          <div />
        </ChartCard>
        <ChartCard title="Jenis Kekerasan" empty emptyMessage="Belum ada data kasus yang dapat ditampilkan.">
          <div />
        </ChartCard>
        <ChartCard title="Status Penanganan" empty emptyMessage="Belum ada data kasus yang dapat ditampilkan.">
          <div />
        </ChartCard>
        <ChartCard title="Persebaran Kasus per Wilayah" empty emptyMessage="Belum ada data kasus yang dapat ditampilkan.">
          <div />
        </ChartCard>
      </div>
    </div>
  )
}
