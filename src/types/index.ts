export type RoleName =
  | "super_admin"
  | "organization_admin"
  | "data_entry"
  | "verifier"
  | "analyst"
  | "program_manager"
  | "public_viewer"

export type PermissionCode =
  | "case.create"
  | "case.view_own_organization"
  | "case.view_all"
  | "case.edit"
  | "case.verify"
  | "case.export_aggregate"
  | "case.export_sensitive"
  | "user.manage"
  | "report.view"
  | "report.generate"
  | "audit_log.view"

export interface SessionUser {
  id: string
  full_name: string
  email: string
  organization_id: string | null
  organization_name: string | null
  roles: RoleName[]
  permissions: PermissionCode[]
  is_active: boolean
}

export interface PaginationParams {
  page: number
  limit: number
  search?: string
  sort_by?: string
  sort_order?: "asc" | "desc"
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  total_pages: number
}

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
