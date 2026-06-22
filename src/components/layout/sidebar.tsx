"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { cn } from "@/lib/utils/cn"
import { Button } from "@/components/ui/button"
import { PermissionGuard } from "@/components/shared/permission-guard"
import {
  LayoutDashboard,
  FileText,
  CheckCircle,
  GitBranch,
  Map,
  BarChart3,
  Settings,
  Users,
  Building2,
  Database,
  Shield,
  ClipboardList,
  UserCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react"
import { useState } from "react"
import { signOut } from "next-auth/react"
import type { PermissionCode } from "@/types"

interface MenuItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  permission?: PermissionCode
}

interface MenuSection {
  section: string
  items: MenuItem[]
}

const menuItems: MenuSection[] = [
  {
    section: "Utama",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    section: "Data",
    items: [
      { href: "/kasus", label: "Data Kasus", icon: FileText },
      { href: "/verifikasi", label: "Verifikasi", icon: CheckCircle },
      { href: "/rujukan", label: "Rujukan & Layanan", icon: GitBranch },
      { href: "/peta", label: "Peta Persebaran", icon: Map },
      { href: "/laporan", label: "Laporan", icon: BarChart3 },
    ],
  },
  {
    section: "Pengaturan",
    items: [
      {
        href: "/pengaturan/pengguna",
        label: "Pengguna",
        icon: Users,
        permission: "user.manage",
      },
      {
        href: "/pengaturan/organisasi",
        label: "Organisasi",
        icon: Building2,
        permission: "user.manage",
      },
      {
        href: "/pengaturan/master-data",
        label: "Master Data",
        icon: Database,
        permission: "user.manage",
      },
      {
        href: "/pengaturan/role-akses",
        label: "Role & Hak Akses",
        icon: Shield,
        permission: "user.manage",
      },
      {
        href: "/pengaturan/audit-log",
        label: "Audit Log",
        icon: ClipboardList,
        permission: "audit_log.view",
      },
    ],
  },
  {
    section: "Akun",
    items: [
      { href: "/profil", label: "Profil", icon: UserCircle },
    ],
  },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [collapsed, setCollapsed] = useState(false)
  const orgLogo = session?.user?.organization_logo

  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
          collapsed ? "-translate-x-full lg:translate-x-0 lg:w-16" : "translate-x-0 w-64"
        )}
      >
        <div className={cn(
          "flex items-center h-16 border-b border-gray-200 dark:border-gray-800",
          collapsed ? "justify-center px-2" : "px-4"
        )}>
          <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "flex-1 min-w-0")}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-sm">
              {orgLogo ? (
                <img src={orgLogo} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-bold text-sm">K</span>
              )}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                  KBG & TPKS
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  Dashboard Pemantauan
                </p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded shrink-0 ml-2"
              title="Perkecil sidebar"
            >
              <ChevronLeft className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-4">
          {menuItems.map((section) => (
            <div key={section.section}>
              {!collapsed && (
                <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 mb-2">
                  {section.section}
                </p>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/")

                  const link = (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                        isActive
                          ? "bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-medium"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200",
                        collapsed && "justify-center px-2"
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span>{item.label}</span>}
                    </Link>
                  )

                  if (item.permission) {
                    return (
                      <PermissionGuard key={item.href} permission={item.permission}>
                        {link}
                      </PermissionGuard>
                    )
                  }
                  return link
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-200 dark:border-gray-800">
          <Button
            variant="ghost"
            className={cn(
              "text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400",
              collapsed ? "w-full flex justify-center px-2" : "w-full justify-start"
            )}
            onClick={() => signOut({ callbackUrl: "/login" })}
            title={collapsed ? "Keluar" : undefined}
          >
            <LogOut className="h-5 w-5" />
            {!collapsed && <span className="ml-2">Keluar</span>}
          </Button>
        </div>
      </aside>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm lg:flex hidden"
          title="Perbesar sidebar"
        >
          <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400" />
        </button>
      )}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-sm lg:hidden"
          title="Buka menu"
        >
          <Menu className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
      )}
    </>
  )
}
