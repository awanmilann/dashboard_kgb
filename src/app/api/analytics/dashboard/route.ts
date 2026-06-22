import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { auth } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(request.url)
    const periode = url.searchParams.get("periode") || ""
    const wilayah = url.searchParams.get("wilayah") || ""
    const organisasi = url.searchParams.get("organisasi") || ""
    const jenisKekerasan = url.searchParams.get("jenis_kekerasan") || ""

    const where: Record<string, unknown> = { is_archived: false }

    if (periode) {
      const year = parseInt(periode)
      where.reported_at = { gte: new Date(`${year}-01-01`), lte: new Date(`${year}-12-31`) }
    }
    if (wilayah) {
      where.reporting_location_id = wilayah
    }
    if (organisasi) {
      where.reporting_organization_id = organisasi
    }
    if (jenisKekerasan) {
      where.case_violence_types = { some: { violence_type_id: jenisKekerasan } }
    }

    const totalCases = await prisma.case.count({ where: where as any })
    const verifiedCases = await prisma.case.count({
      where: { ...where, verification_status: "APPROVED" } as any,
    })
    const inProgressCases = await prisma.case.count({
      where: { ...where, case_status: { in: ["IN_PROGRESS", "FOLLOW_UP"] } } as any,
    })
    const highRiskCases = await prisma.case.count({
      where: { ...where, risk_level: { in: ["HIGH", "CRITICAL"] } } as any,
    })
    const noReferral = await prisma.case.count({
      where: { ...where, referrals: { none: {} } } as any,
    })
    const pendingVerification = await prisma.case.count({
      where: { ...where, verification_status: "PENDING" } as any,
    })

    const byStatus = await prisma.case.groupBy({
      by: ["case_status"],
      _count: true,
      where: where as any,
    })

    const byVerificationStatus = await prisma.case.groupBy({
      by: ["verification_status"],
      _count: true,
      where: where as any,
    })

    return NextResponse.json({
      success: true,
      data: {
        total: totalCases,
        verified: verifiedCases,
        in_progress: inProgressCases,
        high_risk: highRiskCases,
        no_referral: noReferral,
        pending_verification: pendingVerification,
        by_status: byStatus,
        by_verification_status: byVerificationStatus,
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
