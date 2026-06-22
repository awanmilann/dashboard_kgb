"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { DataTable } from "@/components/tables/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { type ColumnDef } from "@tanstack/react-table"
import { Shield, Plus, X } from "lucide-react"

interface RoleEntry {
  id: string
  nama: string
  permissions: string
  jumlahPengguna: number
}

const columns: ColumnDef<RoleEntry>[] = [
  { accessorKey: "nama", header: "Role" },
  { accessorKey: "permissions", header: "Hak Akses" },
  { accessorKey: "jumlahPengguna", header: "Jumlah Pengguna" },
]

const availablePermissions = [
  { id: "kasus.view", label: "Melihat Data Kasus" },
  { id: "kasus.create", label: "Membuat Kasus" },
  { id: "kasus.edit", label: "Mengedit Kasus" },
  { id: "kasus.delete", label: "Menghapus Kasus" },
  { id: "verifikasi.view", label: "Melihat Verifikasi" },
  { id: "verifikasi.verify", label: "Melakukan Verifikasi" },
  { id: "laporan.view", label: "Melihat Laporan" },
  { id: "laporan.generate", label: "Generate Laporan" },
  { id: "user.manage", label: "Mengelola Pengguna" },
  { id: "audit_log.view", label: "Melihat Audit Log" },
]

export default function RoleAksesPage() {
  const [showForm, setShowForm] = useState(false)
  const [namaRole, setNamaRole] = useState("")
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])

  const togglePermission = (permId: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permId) ? prev.filter((p) => p !== permId) : [...prev, permId]
    )
  }

  const handleSubmit = () => {
    alert(`Role "${namaRole}" berhasil dibuat.`)
    setShowForm(false)
    setNamaRole("")
    setSelectedPermissions([])
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Role & Hak Akses">
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-1" />
          Tambah Role
        </Button>
      </PageHeader>

      <DataTable
        columns={columns}
        data={[]}
        emptyTitle="Belum ada role"
        emptyDescription="Belum ada role yang dikonfigurasi dalam sistem."
      />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-lg mx-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Tambah Role Baru</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nama_role">Nama Role</Label>
                <Input id="nama_role" value={namaRole} onChange={(e) => setNamaRole(e.target.value)} placeholder="Masukkan nama role" />
              </div>
              <div className="space-y-2">
                <Label>Hak Akses</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto border rounded-md p-3">
                  {availablePermissions.map((perm) => (
                    <label key={perm.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedPermissions.includes(perm.id)}
                        onChange={() => togglePermission(perm.id)}
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
                      />
                      <span className="text-sm text-gray-700">{perm.label}</span>
                    </label>
                  ))}
                </div>
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
