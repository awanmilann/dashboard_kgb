"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { DataTable } from "@/components/tables/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type ColumnDef } from "@tanstack/react-table"
import { Plus, Edit, X } from "lucide-react"

interface User {
  id: string
  nama: string
  email: string
  role: string
  organisasi: string
  status: string
}

const columns: ColumnDef<User>[] = [
  { accessorKey: "nama", header: "Nama" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  { accessorKey: "organisasi", header: "Organisasi" },
  { accessorKey: "status", header: "Status" },
  {
    id: "aksi",
    header: "Aksi",
    cell: () => (
      <Button variant="ghost" size="sm">
        <Edit className="h-4 w-4" />
      </Button>
    ),
  },
]

export default function PenggunaPage() {
  const [showForm, setShowForm] = useState(false)
  const [nama, setNama] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [organisasi, setOrganisasi] = useState("")

  const handleSubmit = () => {
    alert("Pengguna berhasil ditambahkan.")
    setShowForm(false)
    setNama("")
    setEmail("")
    setRole("")
    setOrganisasi("")
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Pengelolaan Pengguna">
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-1" />
          Tambah Pengguna
        </Button>
      </PageHeader>

      <DataTable
        columns={columns}
        data={[]}
        emptyTitle="Belum ada pengguna"
        emptyDescription="Belum ada pengguna yang terdaftar dalam sistem."
      />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Tambah Pengguna</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Lengkap</Label>
                <Input id="nama" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Masukkan nama" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Masukkan email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  id="role"
                  placeholder="Pilih role"
                  options={[
                    { value: "admin", label: "Admin" },
                    { value: "verifikator", label: "Verifikator" },
                    { value: "pelapor", label: "Pelapor" },
                    { value: "viewer", label: "Viewer" },
                  ]}
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="organisasi">Organisasi</Label>
                <Select
                  id="organisasi"
                  placeholder="Pilih organisasi"
                  options={[
                    { value: "upt", label: "UPT P2TP2A" },
                    { value: "dinas", label: "Dinas Sosial" },
                  ]}
                  value={organisasi}
                  onChange={(e) => setOrganisasi(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button variant="outline" onClick={() => setShowForm(false)}>Batal</Button>
                <Button onClick={handleSubmit}>Simpan</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
