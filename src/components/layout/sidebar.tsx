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
  ThumbsUp,
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
      { href: "/uat", label: "UAT Feedback", icon: ThumbsUp },
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
          "fixed inset-y-0 left-0 z-40 flex flex-col bg-[#0d0a14] border-r border-purple-900/20 transition-all duration-300",
          collapsed ? "-translate-x-full lg:translate-x-0 lg:w-16" : "translate-x-0 w-64"
        )}
      >
        <div className={cn(
          "flex items-center h-16 border-b border-purple-900/20",
          collapsed ? "justify-center px-2" : "px-4"
        )}>
          <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "flex-1 min-w-0")}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center flex-shrink-0 overflow-hidden shadow-lg shadow-purple-600/20">
              {orgLogo ? (
                <img src={orgLogo} alt="" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-bold text-sm">K</span>
              )}
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-purple-100 truncate">
                  KBG & TPKS
                </p>
                <p className="text-xs text-purple-300/60 truncate">
                  Dashboard Pemantauan
                </p>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="p-1.5 hover:bg-purple-900/30 rounded shrink-0 ml-2 transition-colors"
              title="Perkecil sidebar"
            >
              <ChevronLeft className="h-4 w-4 text-purple-400" />
            </button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-thin scrollbar-thumb-purple-900/30">
          {menuItems.map((section) => (
            <div key={section.section}>
              {!collapsed && (
                <p className="text-xs font-semibold text-purple-400/50 uppercase tracking-wider px-3 mb-2">
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
                        "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200",
                        isActive
                          ? "bg-purple-600/20 text-purple-300 font-medium border-l-2 border-purple-500"
                          : "text-purple-300/60 hover:text-purple-200 hover:bg-purple-900/20 border-l-2 border-transparent",
                        collapsed && "justify-center px-2 border-l-0"
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

        <div className="p-3 border-t border-purple-900/20">
          <Button
            variant="ghost"
            className={cn(
              "text-purple-300/60 hover:text-red-400 hover:bg-red-950/30",
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
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-[#0d0a14] border border-purple-900/40 shadow-lg lg:flex hidden hover:bg-purple-900/30 transition-colors"
          title="Perbesar sidebar"
        >
          <ChevronRight className="h-4 w-4 text-purple-400" />
        </button>
      )}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-[#0d0a14] border border-purple-900/40 shadow-lg lg:hidden hover:bg-purple-900/30 transition-colors"
          title="Buka menu"
        >
          <Menu className="h-5 w-5 text-purple-300" />
        </button>
      )}
    </>
  )
}
