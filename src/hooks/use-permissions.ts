"use client"

import { useSession } from "next-auth/react"
import type { PermissionCode, RoleName } from "@/types"

export function usePermissions() {
  const { data: session } = useSession()
  const user = session?.user

  const hasPermission = (permission: PermissionCode) =>
    user?.permissions.includes(permission) ?? false

  const hasRole = (role: RoleName) => user?.roles.includes(role) ?? false

  const hasAnyRole = (roles: RoleName[]) =>
    roles.some((r) => user?.roles.includes(r)) ?? false

  return {
    user,
    hasPermission,
    hasRole,
    hasAnyRole,
    isAuthenticated: !!user,
  }
}
