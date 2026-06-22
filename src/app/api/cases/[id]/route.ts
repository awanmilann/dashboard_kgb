import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { auth } from "@/lib/auth"

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const caseData = await prisma.case.findUnique({
      where: { id },
      include: {
        reporting_organization: true,
        incident_location: true,
        reporting_location: true,
        created_by_user: { select: { id: true, full_name: true } },
        verified_by_user: { select: { id: true, full_name: true } },
        incidents: { include: { location: true } },
        case_violence_types: { include: { violence_type: true } },
        survivors: { include: { sensitive_profile: true } },
        services: { include: { service_type: true, survivor: { select: { survivor_code: true } } } },
        referrals: { include: { provider: true, service_type: true } },
        verifications: { include: { verified_by_user: { select: { full_name: true } } } },
        status_history: { include: { changed_by_user: { select: { full_name: true } } }, orderBy: { changed_at: "desc" } },
        documents: { include: { uploaded_by_user: { select: { full_name: true } } } },
      },
    })

    if (!caseData) {
      return NextResponse.json({ success: false, error: "Kasus tidak ditemukan" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: caseData })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()

    const caseData = await prisma.case.update({
      where: { id },
      data: body,
    })

    await prisma.auditLog.create({
      data: {
        user_id: session.user.id,
        organization_id: session.user.organization_id,
        action: "UPDATE_CASE",
        entity_type: "Case",
        entity_id: id,
        new_value: body,
      },
    })

    return NextResponse.json({ success: true, data: caseData })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const url = new URL(request.url)
    const action = url.searchParams.get("action")

    if (action === "submit") {
      const caseData = await prisma.case.update({
        where: { id },
        data: {
          case_status: "SUBMITTED",
          verification_status: "PENDING",
          submitted_at: new Date(),
        },
      })

      await prisma.caseStatusHistory.create({
        data: {
          case_id: id,
          previous_status: "DRAFT",
          new_status: "SUBMITTED",
          changed_by: session.user.id,
          notes: "Draft dikirim untuk verifikasi",
        },
      })

      return NextResponse.json({ success: true, data: caseData })
    }

    if (action === "archive") {
      const caseData = await prisma.case.update({
        where: { id },
        data: { is_archived: true, case_status: "ARCHIVED" },
      })

      return NextResponse.json({ success: true, data: caseData })
    }

    return NextResponse.json({ success: false, error: "Aksi tidak dikenal" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
