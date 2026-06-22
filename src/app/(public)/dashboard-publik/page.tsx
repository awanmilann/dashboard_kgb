"use client"

import { PageHeader } from "@/components/shared/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { KpiCard } from "@/components/shared/kpi-card"
import { BarChart3, Users, CheckCircle, AlertTriangle } from "lucide-react"

export default function DashboardPublikPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard Publik KBG & TPKS" description="Data agregat kasus kekerasan berbasis gender dan TPKS" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Kasus" value={0} icon={<BarChart3 className="h-5 w-5" />} variant="purple" />
        <KpiCard title="Terverifikasi" value={0} icon={<CheckCircle className="h-5 w-5" />} variant="green" />
        <KpiCard title="Dalam Penanganan" value={0} icon={<Users className="h-5 w-5" />} variant="blue" />
        <KpiCard title="Risiko Tinggi" value={0} icon={<AlertTriangle className="h-5 w-5" />} variant="red" />
      </div>

      <EmptyState
        title="Belum ada data publik yang tersedia."
        description="Data agregat akan ditampilkan setelah ada kasus yang tercatat dalam sistem."
      />
    </div>
  )
}
