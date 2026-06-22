"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
  const [collapsed, setCollapsed] = useState(false)

  return (
    <>
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-md bg-white border shadow-sm"
        onClick={() => setCollapsed(!collapsed)}
      >
        <Menu className="h-5 w-5" />
      </button>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-white border-r border-gray-200 transition-all duration-300",
          collapsed ? "-translate-x-full lg:translate-x-0 lg:w-16" : "translate-x-0 w-64"
        )}
      >
        <div className="flex items-center h-16 px-4 border-b border-gray-200">
          {collapsed ? (
            <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-sm">K</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 w-full">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  KBG & TPKS
                </p>
                <p className="text-xs text-gray-500 truncate">
                  Dashboard Pemantauan
                </p>
              </div>
              <button
                onClick={() => setCollapsed(true)}
                className="ml-auto p-1 hover:bg-gray-100 rounded hidden lg:block"
              >
                <ChevronLeft className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-4">
          {menuItems.map((section) => (
            <div key={section.section}>
              {!collapsed && (
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
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
                          ? "bg-purple-50 text-purple-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
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

        {!collapsed && (
          <div className="p-3 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:text-red-600"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Keluar
            </Button>
          </div>
        )}

        {collapsed && (
          <div className="p-3 border-t border-gray-200 flex justify-center">
            <button
              onClick={() => setCollapsed(false)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              <ChevronRight className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
