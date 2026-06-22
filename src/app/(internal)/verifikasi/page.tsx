"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { FilterBar } from "@/components/shared/filter-bar"
import { DataTable } from "@/components/tables/data-table"
import { VerificationStatusBadge, CaseStatusBadge } from "@/components/shared/status-badge"
import { Button } from "@/components/ui/button"
import { type ColumnDef } from "@tanstack/react-table"
import { useRouter } from "next/navigation"
import { Eye } from "lucide-react"

interface VerificationCase {
  id: string
  nomorKasus: string
  tanggalLapor: string
  wilayah: string
  status: string
  statusVerifikasi: string
}

const columns: ColumnDef<VerificationCase>[] = [
  {
    accessorKey: "nomorKasus",
    header: "ID Kasus",
  },
  {
    accessorKey: "tanggalLapor",
    header: "Tanggal Lapor",
  },
  {
    accessorKey: "wilayah",
    header: "Wilayah",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <CaseStatusBadge status={row.original.status} />,
  },
  {
    accessorKey: "statusVerifikasi",
    header: "Status Verifikasi",
    cell: ({ row }) => <VerificationStatusBadge status={row.original.statusVerifikasi} />,
  },
  {
    id: "aksi",
    header: "Aksi",
    cell: ({ row }) => {
      const router = useRouter()
      return (
        <Button variant="ghost" size="sm" onClick={() => router.push(`/verifikasi/${row.original.id}`)}>
          <Eye className="h-4 w-4 mr-1" />
          Detail
        </Button>
      )
    },
  },
]

const statusOptions = [
  { value: "PENDING", label: "Menunggu" },
  { value: "IN_REVIEW", label: "Ditinjau" },
  { value: "APPROVED", label: "Disetujui" },
  { value: "REJECTED", label: "Ditolak" },
  { value: "NEEDS_REVISION", label: "Perlu Perbaikan" },
]

export default function VerifikasiPage() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  return (
    <div className="space-y-6">
      <PageHeader title="Verifikasi Kasus" description="Kelola dan verifikasi data kasus yang masuk" />

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari nomor kasus..."
        filters={[
          { key: "status", label: "Status Verifikasi", options: statusOptions, value: statusFilter, onChange: setStatusFilter },
        ]}
        onReset={() => { setSearch(""); setStatusFilter("") }}
      />

      <DataTable
        columns={columns}
        data={[]}
        emptyTitle="Belum ada kasus yang perlu diverifikasi"
        emptyDescription="Semua kasus telah terverifikasi atau belum ada kasus baru yang masuk."
      />
    </div>
  )
}
