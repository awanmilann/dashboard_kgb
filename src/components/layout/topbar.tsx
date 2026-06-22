"use client"

import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import { Sun, Moon, Bell, User, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils/cn"
import { useState, useEffect } from "react"
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
  const [notifOpen, setNotifOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const breadcrumbs = getBreadcrumbs(pathname)
  const darkMode = mounted && theme === "dark"

  return (
    <header className="sticky top-0 z-30 flex items-center h-16 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 px-4 lg:px-6">
      <div className="flex items-center gap-2 ml-10 lg:ml-0">
        {breadcrumbs.map((crumb, i) => (
          <div key={crumb.href} className="flex items-center gap-2">
            {i > 0 && (
              <span className="text-gray-300 dark:text-gray-600 text-sm">/</span>
            )}
            {i === breadcrumbs.length - 1 ? (
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              >
                {crumb.label}
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
            title="Notifikasi"
          >
            <Bell className="h-5 w-5" />
          </button>

          {notifOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-72 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg z-20 py-2">
                <p className="px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
                  Notifikasi
                </p>
                <div className="py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-30" />
                  Belum ada notifikasi.
                </div>
              </div>
            </>
          )}
        </div>

        {mounted && (
          <button
            onClick={() => setTheme(darkMode ? "light" : "dark")}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
            title={darkMode ? "Mode terang" : "Mode gelap"}
          >
            {darkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>
        )}

        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center overflow-hidden">
              {session?.user?.image ? (
                <img src={session.user.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <User className="h-4 w-4 text-purple-600 dark:text-purple-300" />
              )}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-tight">
                {session?.user?.full_name ?? "User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
                {session?.user?.organization_name ?? ""}
              </p>
            </div>
            <ChevronDown className={cn("h-4 w-4 text-gray-500 dark:text-gray-400 hidden sm:block transition-transform", profileOpen && "rotate-180")} />
          </button>

          {profileOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setProfileOpen(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg z-20 py-1">
                <Link
                  href="/profil"
                  className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setProfileOpen(false)}
                >
                  Profil Saya
                </Link>
                <Link
                  href="/pengaturan/pengguna"
                  className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setProfileOpen(false)}
                >
                  Pengaturan
                </Link>
                <hr className="my-1 border-gray-200 dark:border-gray-700" />
                <button
                  className="block w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => {
                    setProfileOpen(false)
                    signOut({ callbackUrl: "/login" })
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
