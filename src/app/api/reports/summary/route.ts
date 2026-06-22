import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const totalCases = await prisma.case.count({ where: { is_archived: false } })
    const verifiedCases = await prisma.case.count({
      where: { verification_status: "APPROVED", is_archived: false },
    })
    const inProgressCases = await prisma.case.count({
      where: { case_status: "IN_PROGRESS", is_archived: false },
    })
    const highRiskCases = await prisma.case.count({
      where: { risk_level: { in: ["HIGH", "CRITICAL"] }, is_archived: false },
    })
    const pendingVerification = await prisma.case.count({
      where: { verification_status: "PENDING", is_archived: false },
    })
    const noReferral = await prisma.case.count({
      where: {
        is_archived: false,
        referrals: { none: {} },
      },
    })

    const caseStatuses = await prisma.case.groupBy({
      by: ["case_status"],
      _count: true,
      where: { is_archived: false },
    })

    const violenceTypeCounts = await prisma.caseViolenceType.groupBy({
      by: ["violence_type_id"],
      _count: true,
    })

    return NextResponse.json({
      success: true,
      data: {
        total: totalCases,
        verified: verifiedCases,
        in_progress: inProgressCases,
        high_risk: highRiskCases,
        pending_verification: pendingVerification,
        no_referral: noReferral,
        by_status: caseStatuses,
        by_violence_type: violenceTypeCounts,
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
