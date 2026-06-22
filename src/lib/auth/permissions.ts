import { auth } from "./index"
import type { PermissionCode, RoleName } from "@/types"

export async function getCurrentUser() {
  const session = await auth()
  return session?.user ?? null
}

export function hasPermission(
  userPermissions: string[],
  permission: PermissionCode
): boolean {
  return userPermissions.includes(permission)
}

export function hasRole(userRoles: string[], role: RoleName): boolean {
  return userRoles.includes(role)
}

export function hasAnyRole(userRoles: string[], roles: RoleName[]): boolean {
  return roles.some((r) => userRoles.includes(r))
}

export function canAccessCase(
  userPermissions: string[],
  userRoles: string[],
  userOrganizationId: string | null,
  caseOrganizationId: string | null
): boolean {
  if (hasPermission(userPermissions, "case.view_all")) return true
  if (
    hasPermission(userPermissions, "case.view_own_organization") &&
    userOrganizationId === caseOrganizationId
  )
    return true
  return false
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")
  return user
}

export async function requirePermission(permission: PermissionCode) {
  const user = await requireAuth()
  if (!hasPermission(user.permissions, permission)) {
    throw new Error("Forbidden")
  }
  return user
}
