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

interface Organisasi {
  id: string
  nama: string
  tipe: string
  provinsi: string
  kota: string
  status: string
}

const columns: ColumnDef<Organisasi>[] = [
  { accessorKey: "nama", header: "Nama Organisasi" },
  { accessorKey: "tipe", header: "Tipe" },
  { accessorKey: "provinsi", header: "Provinsi" },
  { accessorKey: "kota", header: "Kota/Kabupaten" },
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

export default function OrganisasiPage() {
  const [showForm, setShowForm] = useState(false)
  const [nama, setNama] = useState("")
  const [tipe, setTipe] = useState("")
  const [provinsi, setProvinsi] = useState("")
  const [kota, setKota] = useState("")

  const handleSubmit = () => {
    alert("Organisasi berhasil ditambahkan.")
    setShowForm(false)
    setNama("")
    setTipe("")
    setProvinsi("")
    setKota("")
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Pengelolaan Organisasi">
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4 mr-1" />
          Tambah Organisasi
        </Button>
      </PageHeader>

      <DataTable
        columns={columns}
        data={[]}
        emptyTitle="Belum ada organisasi"
        emptyDescription="Belum ada organisasi yang terdaftar dalam sistem."
      />

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Tambah Organisasi</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowForm(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="nama">Nama Organisasi</Label>
                <Input id="nama" value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Masukkan nama organisasi" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipe">Tipe Organisasi</Label>
                <Select
                  id="tipe"
                  placeholder="Pilih tipe"
                  options={[
                    { value: "upt", label: "UPT P2TP2A" },
                    { value: "dinas", label: "Dinas Sosial" },
                    { value: "puskesmas", label: "Puskesmas" },
                    { value: "polres", label: "Polres" },
                    { value: "rumah_sakit", label: "Rumah Sakit" },
                  ]}
                  value={tipe}
                  onChange={(e) => setTipe(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="provinsi">Provinsi</Label>
                <Select
                  id="provinsi"
                  placeholder="Pilih provinsi"
                  options={[
                    { value: "dki", label: "DKI Jakarta" },
                    { value: "jabar", label: "Jawa Barat" },
                    { value: "jateng", label: "Jawa Tengah" },
                  ]}
                  value={provinsi}
                  onChange={(e) => setProvinsi(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="kota">Kota/Kabupaten</Label>
                <Input id="kota" value={kota} onChange={(e) => setKota(e.target.value)} placeholder="Masukkan kota/kabupaten" />
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
