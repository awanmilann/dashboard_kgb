"use client"

import { useState } from "react"
import { PageHeader } from "@/components/shared/page-header"
import { DataTable } from "@/components/tables/data-table"
import { Button } from "@/components/ui/button"
import { type ColumnDef } from "@tanstack/react-table"
import { cn } from "@/lib/utils/cn"
import { Plus, Edit } from "lucide-react"

interface MasterDataEntry {
  id: string
  kode: string
  nama: string
  deskripsi: string
  status: string
}

const tabs = [
  { id: "jenis_kekerasan", label: "Jenis Kekerasan" },
  { id: "jenis_layanan", label: "Jenis Layanan" },
  { id: "lokasi", label: "Lokasi" },
  { id: "status_kasus", label: "Status Kasus" },
  { id: "status_rujukan", label: "Status Rujukan" },
]

const columns: ColumnDef<MasterDataEntry>[] = [
  { accessorKey: "kode", header: "Kode" },
  { accessorKey: "nama", header: "Nama" },
  { accessorKey: "deskripsi", header: "Deskripsi" },
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

export default function MasterDataPage() {
  const [activeTab, setActiveTab] = useState("jenis_kekerasan")

  return (
    <div className="space-y-6">
      <PageHeader title="Pengelolaan Master Data">
        <Button>
          <Plus className="h-4 w-4 mr-1" />
          Tambah Data
        </Button>
      </PageHeader>

      <div className="border-b border-gray-200 dark:border-gray-800">
        <nav className="flex overflow-x-auto gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "px-3 py-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
                activeTab === tab.id
                  ? "border-purple-600 text-purple-700 dark:text-purple-300"
                  : "border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <DataTable
        columns={columns}
        data={[]}
        emptyTitle={`Belum ada data ${tabs.find((t) => t.id === activeTab)?.label.toLowerCase()}`}
        emptyDescription="Data akan tersedia setelah ditambahkan melalui form master data."
      />
    </div>
  )
}
