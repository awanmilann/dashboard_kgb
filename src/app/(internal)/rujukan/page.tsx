"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { FilterBar } from "@/components/shared/filter-bar"
import { KpiCard } from "@/components/shared/kpi-card"
import { DataTable } from "@/components/tables/data-table"
import { Button } from "@/components/ui/button"
import { type ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { GitBranch, RefreshCw, Clock, Eye } from "lucide-react"

interface Rujukan {
  id: string
  nomorKasus: string
  jenisLayanan: string
  tujuan: string
  status: string
  tanggalRujuk: string
}

const columns: ColumnDef<Rujukan>[] = [
  { accessorKey: "nomorKasus", header: "ID Kasus" },
  { accessorKey: "jenisLayanan", header: "Jenis Layanan" },
  { accessorKey: "tujuan", header: "Tujuan Rujukan" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "tanggalRujuk", header: "Tanggal Rujuk" },
  {
    id: "aksi",
    header: "Aksi",
    cell: () => {
      const router = useRouter()
      return (
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4 mr-1" />
          Detail
        </Button>
      )
    },
  },
]

export default function RujukanPage() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")
  const [jenisLayanan, setJenisLayanan] = useState("")

  return (
    <div className="space-y-6">
      <PageHeader title="Rujukan & Layanan" description="Kelola rujukan dan layanan bagi penyintas" />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard title="Butuh Rujukan" value={0} icon={<GitBranch className="h-5 w-5" />} variant="yellow" />
        <KpiCard title="Rujukan Aktif" value={0} icon={<RefreshCw className="h-5 w-5" />} variant="blue" />
        <KpiCard title="Belum Ditindaklanjuti" value={0} icon={<Clock className="h-5 w-5" />} variant="red" />
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

      <DataTable
        columns={columns}
        data={[]}
        emptyTitle="Belum ada data rujukan"
        emptyDescription="Belum ada rujukan layanan yang tercatat dalam sistem."
      />
    </div>
  )
}
