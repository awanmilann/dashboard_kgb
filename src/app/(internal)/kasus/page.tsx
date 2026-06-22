"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { FilterBar } from "@/components/shared/filter-bar"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/tables/data-table"
import { CaseStatusBadge, VerificationStatusBadge, RiskBadge } from "@/components/shared/status-badge"
import { type ColumnDef } from "@tanstack/react-table"
import { Plus, Eye, Edit } from "lucide-react"

interface Kasus {
  id: string
  nomorKasus: string
  tanggalLapor: string
  wilayah: string
  jenisKekerasan: string
  status: string
  statusVerifikasi: string
  risiko: string
}

const columns: ColumnDef<Kasus>[] = [
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
    accessorKey: "jenisKekerasan",
    header: "Jenis Kekerasan",
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
    accessorKey: "risiko",
    header: "Risiko",
    cell: ({ row }) => <RiskBadge status={row.original.risiko} />,
  },
  {
    id: "aksi",
    header: "Aksi",
    cell: ({ row }) => {
      const router = useRouter()
      return (
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/kasus/${row.original.id}`)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/kasus/${row.original.id}/edit`)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      )
    },
  },
]

export default function KasusPage() {
  const [search, setSearch] = useState("")
  const [periode, setPeriode] = useState("")
  const [wilayah, setWilayah] = useState("")
  const [status, setStatus] = useState("")
  const [jenisKekerasan, setJenisKekerasan] = useState("")
  const [statusVerifikasi, setStatusVerifikasi] = useState("")

  const wilayahOptions = [
    { value: "jakarta", label: "Jakarta" },
    { value: "jabar", label: "Jawa Barat" },
    { value: "jateng", label: "Jawa Tengah" },
  ]

  const statusOptions = [
    { value: "DRAFT", label: "Draft" },
    { value: "SUBMITTED", label: "Terkirim" },
    { value: "IN_VERIFICATION", label: "Menunggu Verifikasi" },
    { value: "VERIFIED", label: "Terverifikasi" },
    { value: "IN_PROGRESS", label: "Dalam Penanganan" },
    { value: "CLOSED", label: "Ditutup" },
  ]

  const verifikasiOptions = [
    { value: "PENDING", label: "Menunggu" },
    { value: "IN_REVIEW", label: "Ditinjau" },
    { value: "APPROVED", label: "Disetujui" },
    { value: "REJECTED", label: "Ditolak" },
    { value: "NEEDS_REVISION", label: "Perlu Perbaikan" },
  ]

  const jenisKekerasanOptions = [
    { value: "fisik", label: "Kekerasan Fisik" },
    { value: "psikis", label: "Kekerasan Psikis" },
    { value: "seksual", label: "Kekerasan Seksual" },
    { value: "ekonomi", label: "Penelantaran Ekonomi" },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Data Kasus">
        <Link href="/kasus/tambah">
          <Button>
            <Plus className="h-4 w-4 mr-1" />
            Tambah Kasus
          </Button>
        </Link>
      </PageHeader>

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari nomor kasus atau penyintas..."
        filters={[
          { key: "periode", label: "Periode", options: [], value: periode, onChange: setPeriode },
          { key: "wilayah", label: "Wilayah", options: wilayahOptions, value: wilayah, onChange: setWilayah },
          { key: "status", label: "Status", options: statusOptions, value: status, onChange: setStatus },
          { key: "jenis_kekerasan", label: "Jenis Kekerasan", options: jenisKekerasanOptions, value: jenisKekerasan, onChange: setJenisKekerasan },
          { key: "status_verifikasi", label: "Status Verifikasi", options: verifikasiOptions, value: statusVerifikasi, onChange: setStatusVerifikasi },
        ]}
        onReset={() => { setSearch(""); setPeriode(""); setWilayah(""); setStatus(""); setJenisKekerasan(""); setStatusVerifikasi("") }}
      />

      <DataTable
        columns={columns}
        data={[]}
        emptyTitle="Belum ada data kasus"
        emptyDescription="Belum ada data kasus. Mulai dengan menambahkan data kasus pertama."
        emptyAction={{
          label: "Tambah Kasus",
          onClick: () => window.location.href = "/kasus/tambah",
        }}
      />
    </div>
  )
}
