"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { PageHeader } from "@/components/shared/page-header"
import { FilterBar } from "@/components/shared/filter-bar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTable } from "@/components/tables/data-table"
import { CaseStatusBadge, VerificationStatusBadge, RiskBadge } from "@/components/shared/status-badge"
import { type ColumnDef } from "@tanstack/react-table"
import { Plus, Eye, Edit } from "lucide-react"

const PROVINSI = [
  "Aceh","Sumatera Utara","Sumatera Barat","Riau","Kepulauan Riau","Jambi","Sumatera Selatan",
  "Bangka Belitung","Bengkulu","Lampung","Banten","DKI Jakarta","Jawa Barat","Jawa Tengah",
  "DI Yogyakarta","Jawa Timur","Bali","Nusa Tenggara Barat","Nusa Tenggara Timur",
  "Kalimantan Barat","Kalimantan Tengah","Kalimantan Selatan","Kalimantan Timur","Kalimantan Utara",
  "Sulawesi Utara","Sulawesi Tengah","Sulawesi Barat","Sulawesi Selatan","Sulawesi Tenggara",
  "Gorontalo","Maluku","Maluku Utara","Papua Barat","Papua Barat Daya","Papua","Papua Tengah",
  "Papua Pegunungan","Papua Selatan",
]

const JENIS_KEKERASAN = [
  "Kekerasan Fisik","Kekerasan Psikis","Kekerasan Seksual","Penelantaran Ekonomi","Kekerasan Multi (Campuran)",
]

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

  const OTHER = "__other__"

export default function KasusPage() {
  const [search, setSearch] = useState("")
  const [periode, setPeriode] = useState("")
  const [wilayah, setWilayah] = useState("")
  const [status, setStatus] = useState("")
  const [jenisKekerasan, setJenisKekerasan] = useState("")
  const [statusVerifikasi, setStatusVerifikasi] = useState("")
  const [organisasi, setOrganisasi] = useState("")
  const [organisasiLain, setOrganisasiLain] = useState("")

  const periodeOptions = [
    { value: "2026", label: "2026" },
    { value: "2025", label: "2025" },
    { value: "2024", label: "2024" },
  ]

  const locationOptions = PROVINSI.map((p) => ({ value: p.toLowerCase().replace(/\s+/g, "_"), label: p }))

  const vtOptions = JENIS_KEKERASAN.map((j) => ({ value: j.toLowerCase().replace(/\s+/g, "_"), label: j }))

  const orgOptions = [
    { value: "upt_p2tp2a", label: "UPT P2TP2A" },
    { value: "dinas", label: "Dinas Sosial" },
    { value: "puskesmas", label: "Puskesmas" },
  ]

  const orgOptionsWithOther = [...orgOptions, { value: OTHER, label: "Lainnya (isi manual)" }]

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
          { key: "periode", label: "Periode", options: periodeOptions, value: periode, onChange: setPeriode },
          { key: "wilayah", label: "Wilayah", options: locationOptions, value: wilayah, onChange: setWilayah },
          { key: "status", label: "Status", options: statusOptions, value: status, onChange: setStatus },
          { key: "organisasi", label: "Organisasi", options: orgOptionsWithOther, value: organisasi, onChange: setOrganisasi },
          { key: "jenis_kekerasan", label: "Jenis Kekerasan", options: vtOptions, value: jenisKekerasan, onChange: setJenisKekerasan },
          { key: "status_verifikasi", label: "Status Verifikasi", options: verifikasiOptions, value: statusVerifikasi, onChange: setStatusVerifikasi },
        ]}
        onReset={() => { setSearch(""); setPeriode(""); setWilayah(""); setStatus(""); setOrganisasi(""); setOrganisasiLain(""); setJenisKekerasan(""); setStatusVerifikasi("") }}
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
