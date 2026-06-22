"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { FilterBar } from "@/components/shared/filter-bar"
import { DataTable } from "@/components/tables/data-table"
import { type ColumnDef } from "@tanstack/react-table"

interface AuditEntry {
  id: string
  waktu: string
  user: string
  aksi: string
  entity: string
  detail: string
  ipAddress: string
}

const columns: ColumnDef<AuditEntry>[] = [
  { accessorKey: "waktu", header: "Waktu" },
  { accessorKey: "user", header: "User" },
  { accessorKey: "aksi", header: "Aksi" },
  { accessorKey: "entity", header: "Entitas" },
  { accessorKey: "detail", header: "Detail" },
  { accessorKey: "ipAddress", header: "IP Address" },
]

export default function AuditLogPage() {
  const [search, setSearch] = useState("")
  const [aksi, setAksi] = useState("")
  const [entity, setEntity] = useState("")
  const [tanggal, setTanggal] = useState("")

  const aksiOptions = [
    { value: "create", label: "Membuat" },
    { value: "update", label: "Mengubah" },
    { value: "delete", label: "Menghapus" },
    { value: "verify", label: "Verifikasi" },
    { value: "login", label: "Login" },
    { value: "logout", label: "Logout" },
  ]

  const entityOptions = [
    { value: "kasus", label: "Kasus" },
    { value: "pengguna", label: "Pengguna" },
    { value: "organisasi", label: "Organisasi" },
    { value: "role", label: "Role" },
    { value: "master_data", label: "Master Data" },
  ]

  return (
    <div className="space-y-6">
      <PageHeader title="Audit Log" description="Riwayat aktivitas pengguna dalam sistem" />

      <FilterBar
        searchValue={search}
        onSearchChange={setSearch}
        searchPlaceholder="Cari aktivitas..."
        filters={[
          { key: "aksi", label: "Aksi", options: aksiOptions, value: aksi, onChange: setAksi },
          { key: "entity", label: "Entitas", options: entityOptions, value: entity, onChange: setEntity },
          { key: "tanggal", label: "Tanggal", options: [], value: tanggal, onChange: setTanggal },
        ]}
        onReset={() => { setSearch(""); setAksi(""); setEntity(""); setTanggal("") }}
      />

      <DataTable
        columns={columns}
        data={[]}
        emptyTitle="Belum ada aktivitas yang tercatat"
        emptyDescription="Riwayat aktivitas akan muncul setelah pengguna mulai menggunakan sistem."
      />
    </div>
  )
}
