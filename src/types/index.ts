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

export interface NotificationItem {
  id: string
  user_id: string
  title: string
  message: string | null
  notification_type: string
  related_entity_type: string | null
  related_entity_id: string | null
  is_read: boolean
  created_at: string
  read_at: string | null
}

export interface UatFeedbackItem {
  id: string
  user_id: string | null
  page_url: string
  rating: number
  feedback_text: string | null
  category: string | null
  browser_info: string | null
  created_at: string
  user?: { full_name: string }
}

export interface DashboardSummary {
  total: number
  verified: number
  in_progress: number
  high_risk: number
  no_referral: number
  pending_verification: number
  by_status: { case_status: string; _count: number }[]
  by_verification_status: { verification_status: string; _count: number }[]
}

export interface ChartData {
  monthly: { month: string; count: number }[]
  violence_types: { name: string; value: number }[]
  status: { name: string; value: number }[]
  locations: { name: string; total: number; verified: number; high_risk: number }[]
}

export interface MapDataPoint {
  id: string
  name: string
  latitude: number
  longitude: number
  total: number
  high_risk: number
  intensity: number
}
