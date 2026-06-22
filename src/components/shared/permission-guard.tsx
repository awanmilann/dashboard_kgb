"use client"

import { useSession } from "next-auth/react"
import type { PermissionCode, RoleName } from "@/types"

interface PermissionGuardProps {
  permission?: PermissionCode
  role?: RoleName
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PermissionGuard({
  permission,
  role,
  children,
  fallback = null,
}: PermissionGuardProps) {
  const { data: session } = useSession()

  if (!session?.user) return null

  if (permission && !session.user.permissions.includes(permission)) {
    return <>{fallback}</>
  }

  if (role && !session.user.roles.includes(role)) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

export function RoleGuard({
  roles,
  children,
  fallback = null,
}: {
  roles: RoleName[]
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  const { data: session } = useSession()

  if (!session?.user) return null

  const hasRole = roles.some((r) => session.user.roles.includes(r))
  if (!hasRole) return <>{fallback}</>

  return <>{children}</>
}
