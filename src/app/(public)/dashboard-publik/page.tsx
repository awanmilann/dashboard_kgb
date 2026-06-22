"use client"

import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { EmptyState } from "@/components/shared/empty-state"
import { KpiCard } from "@/components/shared/kpi-card"
import { Button } from "@/components/ui/button"
import { BarChart3, Users, CheckCircle, AlertTriangle, ArrowLeft } from "lucide-react"

export default function DashboardPublikPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Dashboard Publik KBG & TPKS" description="Data agregat kasus kekerasan berbasis gender dan TPKS">
        <Link href="/">
          <Button variant="outline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Kembali ke Beranda
          </Button>
        </Link>
      </PageHeader>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Total Kasus" value={0} icon={<BarChart3 className="h-5 w-5" />} variant="purple" href="/login" />
        <KpiCard title="Terverifikasi" value={0} icon={<CheckCircle className="h-5 w-5" />} variant="green" href="/login" />
        <KpiCard title="Dalam Penanganan" value={0} icon={<Users className="h-5 w-5" />} variant="blue" href="/login" />
        <KpiCard title="Risiko Tinggi" value={0} icon={<AlertTriangle className="h-5 w-5" />} variant="red" href="/login" />
      </div>

      <EmptyState
        title="Belum ada data publik yang tersedia."
        description="Data agregat akan ditampilkan setelah ada kasus yang tercatat dalam sistem."
      />
    </div>
  )
}
