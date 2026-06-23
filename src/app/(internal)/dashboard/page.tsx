"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { FilterBar } from "@/components/shared/filter-bar"
import { KpiCard } from "@/components/shared/kpi-card"
import { ChartCard } from "@/components/charts/chart-card"
import { MonthlyTrendChart } from "@/components/charts/monthly-trend-chart"
import { ViolenceTypeChart } from "@/components/charts/violence-type-chart"
import { StatusChart } from "@/components/charts/status-chart"
import { LocationBarChart } from "@/components/charts/location-bar-chart"
import { DashboardMap } from "@/components/shared/dashboard-map"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, BarChart3, CheckCircle, Clock, AlertTriangle, XCircle, FileSearch, Loader2 } from "lucide-react"

export default function DashboardPage() {
  const OTHER = "__other__"

  const [periode, setPeriode] = useState("")
  const [wilayah, setWilayah] = useState("")
  const [organisasi, setOrganisasi] = useState("")
  const [organisasiLain, setOrganisasiLain] = useState("")
  const [jenisKekerasan, setJenisKekerasan] = useState("")

  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<any>(null)
  const [chartData, setChartData] = useState<any>(null)
  const [mapData, setMapData] = useState<any[]>([])
  const [locationOptions, setLocationOptions] = useState<{ value: string; label: string }[]>([])
  const [orgOptions, setOrgOptions] = useState<{ value: string; label: string }[]>([])
  const [vtOptions, setVtOptions] = useState<{ value: string; label: string }[]>([])

  const orgOptionsWithOther = useMemo(
    () => [...orgOptions, { value: OTHER, label: "Lainnya (isi manual)" }],
    [orgOptions]
  )

  const buildQuery = useCallback(() => {
    const params = new URLSearchParams()
    if (periode) params.set("periode", periode)
    if (wilayah) params.set("wilayah", wilayah)
    if (organisasi && organisasi !== OTHER) params.set("organisasi", organisasi)
    if (jenisKekerasan) params.set("jenis_kekerasan", jenisKekerasan)
    return params.toString()
  }, [periode, wilayah, organisasi, jenisKekerasan])

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const qs = buildQuery()
      const [sumRes, chartRes, mapRes] = await Promise.all([
        fetch(`/api/analytics/dashboard?${qs}`),
        fetch(`/api/analytics/charts?${qs}`),
        fetch(`/api/analytics/map?level=provinsi&${qs}`),
      ])
      const sumData = await sumRes.json()
      const chartData = await chartRes.json()
      const mapData = await mapRes.json()

      if (sumData.success) setSummary(sumData.data)
      if (chartData.success) setChartData(chartData.data)
      if (mapData.success) setMapData(mapData.data)
    } catch (e) {
      console.error("Gagal memuat data dashboard:", e)
    } finally {
      setLoading(false)
    }
  }, [buildQuery])

  useEffect(() => {
    async function loadOptions() {
      try {
        const [locRes, orgRes, vtRes] = await Promise.all([
          fetch("/api/master/locations"),
          fetch("/api/organizations"),
          fetch("/api/master/violence-types"),
        ])
        const locData = await locRes.json()
        const orgData = await orgRes.json()
        const vtData = await vtRes.json()

        if (locData.success) {
          setLocationOptions(
            (locData.data || []).map((l: any) => ({ value: l.id, label: l.name }))
          )
        }
        if (orgData.success) {
          setOrgOptions(
            (orgData.data || []).map((o: any) => ({ value: o.id, label: o.name }))
          )
        }
        if (vtData.success) {
          setVtOptions(
            (vtData.data || []).map((v: any) => ({ value: v.id, label: v.name }))
          )
        }
      } catch (e) {
        console.error("Gagal memuat data referensi:", e)
      }
    }
    loadOptions()
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleReset = () => {
    setPeriode("")
    setWilayah("")
    setOrganisasi("")
    setOrganisasiLain("")
    setJenisKekerasan("")
  }

  const kpiCards = summary
    ? [
        { title: "Total Kasus", value: summary.total, variant: "purple" as const, href: "/kasus", icon: <BarChart3 className="h-5 w-5" /> },
        { title: "Terverifikasi", value: summary.verified, variant: "green" as const, href: "/verifikasi", icon: <CheckCircle className="h-5 w-5" /> },
        { title: "Dalam Penanganan", value: summary.in_progress, variant: "blue" as const, href: "/kasus", icon: <Clock className="h-5 w-5" /> },
        { title: "Risiko Tinggi", value: summary.high_risk, variant: "red" as const, href: "/kasus", icon: <AlertTriangle className="h-5 w-5" /> },
        { title: "Belum Dirujuk", value: summary.no_referral, variant: "yellow" as const, href: "/rujukan", icon: <XCircle className="h-5 w-5" /> },
        { title: "Belum Diverifikasi", value: summary.pending_verification, variant: "yellow" as const, href: "/verifikasi", icon: <FileSearch className="h-5 w-5" /> },
      ]
    : []

  const periodeOptions = [
    { value: "2026", label: "2026" },
    { value: "2025", label: "2025" },
    { value: "2024", label: "2024" },
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
          { key: "periode", label: "Periode", options: periodeOptions, value: periode, onChange: setPeriode },
          { key: "wilayah", label: "Wilayah", options: locationOptions, value: wilayah, onChange: setWilayah },
          { key: "organisasi", label: "Organisasi", options: orgOptionsWithOther, value: organisasi, onChange: setOrganisasi },
          { key: "jenis_kekerasan", label: "Jenis Kekerasan", options: vtOptions, value: jenisKekerasan, onChange: setJenisKekerasan },
        ]}
        onReset={handleReset}
      />

      {organisasi === OTHER && (
        <div className="max-w-xs">
          <Input
            placeholder="Ketik nama organisasi..."
            value={organisasiLain}
            onChange={(e) => setOrganisasiLain(e.target.value)}
          />
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {kpiCards.map((kpi) => (
              <KpiCard key={kpi.title} title={kpi.title} value={kpi.value} icon={kpi.icon} variant={kpi.variant} href={kpi.href} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Tren Kasus per Bulan">
              <MonthlyTrendChart data={chartData?.monthly ?? []} />
            </ChartCard>
            <ChartCard title="Jenis Kekerasan">
              <ViolenceTypeChart data={chartData?.violence_types ?? []} />
            </ChartCard>
            <ChartCard title="Status Penanganan">
              <StatusChart data={chartData?.status ?? []} />
            </ChartCard>
            <ChartCard title="Persebaran per Wilayah (Top 20)">
              <LocationBarChart data={chartData?.locations ?? []} />
            </ChartCard>
          </div>

          <DashboardMap
            title="Peta Persebaran Kasus per Provinsi"
            data={mapData}
            empty={!mapData || mapData.length === 0}
            emptyMessage="Belum ada data persebaran yang dapat ditampilkan."
          />
        </>
      )}
    </div>
  )
}
