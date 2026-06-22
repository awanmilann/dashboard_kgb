"use client"

import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: string
}

const statusMap: Record<string, { label: string; variant: "gray" | "yellow" | "green" | "red" | "blue" | "purple" }> = {
  DRAFT: { label: "Draft", variant: "gray" },
  SUBMITTED: { label: "Terkirim", variant: "yellow" },
  IN_VERIFICATION: { label: "Menunggu Verifikasi", variant: "yellow" },
  VERIFIED: { label: "Terverifikasi", variant: "green" },
  IN_PROGRESS: { label: "Dalam Penanganan", variant: "blue" },
  CLOSED: { label: "Ditutup", variant: "gray" },
  ARCHIVED: { label: "Diarsipkan", variant: "gray" },
}

export function CaseStatusBadge({ status }: StatusBadgeProps) {
  const config = statusMap[status] ?? { label: status, variant: "gray" as const }
  return <Badge variant={config.variant}>{config.label}</Badge>
}

const verificationMap: Record<string, { label: string; variant: "gray" | "yellow" | "green" | "red" | "blue" }> = {
  PENDING: { label: "Menunggu", variant: "gray" },
  IN_REVIEW: { label: "Ditinjau", variant: "yellow" },
  APPROVED: { label: "Disetujui", variant: "green" },
  REJECTED: { label: "Ditolak", variant: "red" },
  NEEDS_REVISION: { label: "Perlu Perbaikan", variant: "yellow" },
}

export function VerificationStatusBadge({ status }: StatusBadgeProps) {
  const config = verificationMap[status] ?? { label: status, variant: "gray" as const }
  return <Badge variant={config.variant}>{config.label}</Badge>
}

const riskMap: Record<string, { label: string; variant: "green" | "yellow" | "red" | "gray" }> = {
  LOW: { label: "Rendah", variant: "green" },
  MODERATE: { label: "Sedang", variant: "yellow" },
  HIGH: { label: "Tinggi", variant: "red" },
  CRITICAL: { label: "Kritis", variant: "red" },
}

export function RiskBadge({ status }: StatusBadgeProps) {
  const config = riskMap[status] ?? { label: status, variant: "gray" as const }
  return <Badge variant={config.variant}>{config.label}</Badge>
}
