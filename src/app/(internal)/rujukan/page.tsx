"use client"

import { useState, useEffect } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { FilterBar } from "@/components/shared/filter-bar"
import { KpiCard } from "@/components/shared/kpi-card"
import { DataTable } from "@/components/tables/data-table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { type ColumnDef } from "@tanstack/react-table"
import { GitBranch, RefreshCw, Clock, Eye, Loader2 } from "lucide-react"
import { formatDate } from "@/lib/utils/format"

interface Rujukan {
  id: string
  case_number: string
  survivor_code: string
  service_type: string
  provider_name: string
  provider_type: string
  referral_status: string
  referral_date: string
  response_date: string | null
  completion_date: string | null
  notes: string | null
}

const statusBadge: Record<string, { label: string; variant: "default" | "purple" | "green" | "red" | "yellow" | "blue" | "gray" }> = {
  PENDING: { label: "Menunggu", variant: "gray" },
  IN_PROGRESS: { label: "Diproses", variant: "blue" },
  COMPLETED: { label: "Selesai", variant: "green" },
  REJECTED: { label: "Ditolak", variant: "red" },
  CANCELLED: { label: "Dibatalkan", variant: "gray" },
}

export default function RujukanPage() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [jenisLayanan, setJenisLayanan] = useState("")
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<Rujukan[]>([])
  const [summary, setSummary] = useState<any>(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/referrals")
        const result = await res.json()
        if (result.success) {
          setData(result.data || [])
          setSummary(result.summary)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const columns: ColumnDef<Rujukan>[] = [
    { accessorKey: "case_number", header: "ID Kasus" },
    { accessorKey: "survivor_code", header: "Kode Penyintas" },
    { accessorKey: "service_type", header: "Jenis Layanan" },
    { accessorKey: "provider_name", header: "Penyedia Layanan" },
    {
      accessorKey: "referral_status",
      header: "Status",
      cell: ({ row }) => {
        const s = row.getValue("referral_status") as string
        const badge = statusBadge[s] || { label: s, variant: "gray" as const }
        return <Badge variant={badge.variant}>{badge.label}</Badge>
      },
    },
    {
      accessorKey: "referral_date",
      header: "Tanggal Rujuk",
      cell: ({ row }) => formatDate(row.getValue("referral_date") as string),
    },
    {
      id: "aksi",
      header: "Aksi",
      cell: () => (
        <Button variant="ghost" size="sm" disabled>
          <Eye className="h-4 w-4 mr-1" />
          Detail
        </Button>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Rujukan & Layanan" description="Kelola rujukan dan layanan bagi penyintas" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard title="Butuh Rujukan" value={summary?.needs_referral ?? 0} icon={<GitBranch className="h-5 w-5" />} variant="yellow" />
        <KpiCard title="Rujukan Aktif" value={summary?.active ?? 0} icon={<RefreshCw className="h-5 w-5" />} variant="blue" />
        <KpiCard title="Belum Ditindaklanjuti" value={summary?.pending ?? 0} icon={<Clock className="h-5 w-5" />} variant="red" />
      </div>

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari kasus..."
        filters={[
          { key: "status", label: "Status", options: [], value: status, onChange: setStatus },
          { key: "jenis_layanan", label: "Jenis Layanan", options: [], value: jenisLayanan, onChange: setJenisLayanan },
        ]}
        onReset={() => { setSearch(""); setStatus(""); setJenisLayanan("") }}
      />

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={data}
          emptyTitle="Belum ada data rujukan"
          emptyDescription="Belum ada rujukan layanan yang tercatat dalam sistem."
        />
      )}
    </div>
  )
}
