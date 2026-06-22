"use client"

import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Sun, Moon, Bell, User, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils/cn"
import { useState } from "react"
import Link from "next/link"

function getBreadcrumbs(pathname: string) {
  const paths = pathname.split("/").filter(Boolean)
  const labels: Record<string, string> = {
    dashboard: "Dashboard",
    kasus: "Data Kasus",
    tambah: "Tambah Kasus",
    verifikasi: "Verifikasi",
    rujukan: "Rujukan & Layanan",
    peta: "Peta Persebaran",
    laporan: "Laporan",
    pengaturan: "Pengaturan",
    pengguna: "Pengguna",
    organisasi: "Organisasi",
    "master-data": "Master Data",
    "role-akses": "Role & Hak Akses",
    "audit-log": "Audit Log",
    profil: "Profil",
    edit: "Edit",
  }

  return paths.map((p, i) => ({
    label: labels[p] ?? p,
    href: "/" + paths.slice(0, i + 1).join("/"),
  }))
}

export function TopNavbar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [profileOpen, setProfileOpen] = useState(false)

  const breadcrumbs = getBreadcrumbs(pathname)

  return (
    <header className="sticky top-0 z-30 flex items-center h-16 bg-white border-b border-gray-200 px-4 lg:px-6">
      <div className="flex items-center gap-2 ml-10 lg:ml-0">
        {breadcrumbs.map((crumb, i) => (
          <div key={crumb.href} className="flex items-center gap-2">
            {i > 0 && (
              <span className="text-gray-300 text-sm">/</span>
            )}
            {i === breadcrumbs.length - 1 ? (
              <span className="text-sm font-medium text-gray-900">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                {crumb.label}
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button className="relative p-2 rounded-md hover:bg-gray-100 text-gray-500">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-md hover:bg-gray-100 text-gray-500"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>

        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-100"
          >
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <User className="h-4 w-4 text-purple-600" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-gray-900 leading-tight">
                {session?.user?.full_name ?? "User"}
              </p>
              <p className="text-xs text-gray-500 leading-tight">
                {session?.user?.organization_name ?? ""}
              </p>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-500 hidden sm:block" />
          </button>

          {profileOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-md border shadow-lg z-20 py-1">
                <Link
                  href="/profil"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setProfileOpen(false)}
                >
                  Profil Saya
                </Link>
                <Link
                  href="/pengaturan/pengguna"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setProfileOpen(false)}
                >
                  Pengaturan
                </Link>
                <hr className="my-1" />
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                  onClick={() => {
                    setProfileOpen(false)
                    window.location.href = "/api/auth/signout"
                  }}
                >
                  Keluar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
