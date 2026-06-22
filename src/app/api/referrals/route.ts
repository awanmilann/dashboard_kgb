import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const referrals = await prisma.referral.findMany({
      include: {
        case: { select: { case_number: true } },
        survivor: { select: { survivor_code: true } },
        provider: { select: { provider_name: true, provider_type: true } },
        service_type: { select: { name: true } },
      },
      orderBy: { created_at: "desc" },
      take: 100,
    })

    const needsReferral = await prisma.case.count({
      where: { referrals: { none: {} }, is_archived: false, case_status: { not: "CLOSED" } },
    })
    const activeReferrals = await prisma.referral.count({
      where: { referral_status: { in: ["PENDING", "IN_PROGRESS"] } },
    })
    const pendingFollowUp = await prisma.referral.count({
      where: { referral_status: "PENDING" },
    })

    const data = referrals.map((r) => ({
      id: r.id,
      case_number: r.case.case_number,
      survivor_code: r.survivor?.survivor_code ?? "-",
      service_type: r.service_type.name,
      provider_name: r.provider?.provider_name ?? "-",
      provider_type: r.provider?.provider_type ?? "-",
      referral_status: r.referral_status,
      referral_date: r.referral_date,
      response_date: r.response_date,
      completion_date: r.completion_date,
      notes: r.notes,
    }))

    return NextResponse.json({
      success: true,
      data,
      summary: { needs_referral: needsReferral, active: activeReferrals, pending: pendingFollowUp },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { case_id, survivor_id, referral_provider_id, service_type_id, notes } = body

    if (!case_id || !service_type_id) {
      return NextResponse.json({ success: false, error: "case_id dan service_type_id diperlukan" }, { status: 400 })
    }

    const referral = await prisma.referral.create({
      data: {
        case_id,
        survivor_id,
        referral_provider_id,
        service_type_id,
        referred_by: session.user.id,
        referral_status: "PENDING",
      },
      include: {
        case: { select: { case_number: true } },
        service_type: { select: { name: true } },
      },
    })

    return NextResponse.json({ success: true, data: referral })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
