"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { ChartCard } from "@/components/charts/chart-card"
import { KpiCard } from "@/components/shared/kpi-card"
import { MonthlyTrendChart } from "@/components/charts/monthly-trend-chart"
import { ViolenceTypeChart } from "@/components/charts/violence-type-chart"
import { Button } from "@/components/ui/button"
import { BarChart3, CheckCircle, Clock, AlertTriangle, ArrowLeft, Loader2, ShieldAlert } from "lucide-react"

const SUPPRESSION_THRESHOLD = 3

function suppressValue(val: number): number | string {
  if (val > 0 && val < SUPPRESSION_THRESHOLD) return "<3"
  return val
}

function shouldSuppress(val: number): boolean {
  return val > 0 && val < SUPPRESSION_THRESHOLD
}

export default function DashboardPublikPage() {
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<any>(null)
  const [chartData, setChartData] = useState<any>(null)

  useEffect(() => {
    async function load() {
      try {
        const [sumRes, chartRes] = await Promise.all([
          fetch("/api/analytics/dashboard"),
          fetch("/api/analytics/charts"),
        ])
        const sumData = await sumRes.json()
        const chartDat = await chartRes.json()
        if (sumData.success) setSummary(sumData.data)
        if (chartDat.success) {
          const suppressed = {
            ...chartDat.data,
            location: (chartDat.data.locations || []).filter(
              (l: any) => !shouldSuppress(l.total)
            ),
          }
          setChartData(suppressed)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const totalValue = summary ? suppressValue(summary.total) : 0
  const verifiedValue = summary ? suppressValue(summary.verified) : 0
  const inProgressValue = summary ? suppressValue(summary.in_progress) : 0
  const highRiskValue = summary ? suppressValue(summary.high_risk) : 0

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div className="flex items-center gap-2 mb-2">
        <ShieldAlert className="h-4 w-4 text-amber-500" />
        <span className="text-xs text-amber-600 dark:text-amber-400">
          Data dengan jumlah di bawah {SUPPRESSION_THRESHOLD} tidak ditampilkan untuk melindungi privasi korban
        </span>
      </div>

      <PageHeader title="Dashboard Publik KBG & TPKS" description="Data agregat kasus kekerasan berbasis gender dan TPKS">
        <Link href="/">
          <Button variant="outline" className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Kembali ke Beranda
          </Button>
        </Link>
      </PageHeader>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <KpiCard title="Total Kasus" value={totalValue} icon={<BarChart3 className="h-5 w-5" />} variant="purple" href="/login" />
            <KpiCard title="Terverifikasi" value={verifiedValue} icon={<CheckCircle className="h-5 w-5" />} variant="green" href="/login" />
            <KpiCard title="Dalam Penanganan" value={inProgressValue} icon={<Clock className="h-5 w-5" />} variant="blue" href="/login" />
            <KpiCard title="Risiko Tinggi" value={highRiskValue} icon={<AlertTriangle className="h-5 w-5" />} variant="red" href="/login" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Tren Kasus per Bulan">
              <MonthlyTrendChart data={chartData?.monthly ?? []} />
            </ChartCard>
            <ChartCard title="Jenis Kekerasan">
              <ViolenceTypeChart data={chartData?.violence_types ?? []} />
            </ChartCard>
          </div>
        </>
      )}
    </div>
  )
}
