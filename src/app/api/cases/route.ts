import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const cases = await prisma.case.findMany({
      include: {
        reporting_organization: { select: { name: true } },
        incident_location: { select: { name: true } },
        reporting_location: { select: { name: true } },
        created_by_user: { select: { full_name: true } },
        case_violence_types: {
          include: { violence_type: { select: { name: true } } },
        },
        survivors: { select: { survivor_code: true, gender: true, age_group: true } },
      },
      orderBy: { created_at: "desc" },
    })

    const data = cases.map((c) => ({
      id: c.id,
      case_number: c.case_number,
      reported_at: c.reported_at,
      case_status: c.case_status,
      verification_status: c.verification_status,
      risk_level: c.risk_level,
      urgency_level: c.urgency_level,
      case_category: c.case_category,
      organization_name: c.reporting_organization?.name ?? "-",
      incident_location: c.incident_location?.name ?? "-",
      reporting_location: c.reporting_location?.name ?? "-",
      created_by: c.created_by_user?.full_name ?? "-",
      violence_types: c.case_violence_types.map((vt) => vt.violence_type.name),
      survivor_count: c.survivors.length,
      is_archived: c.is_archived,
      created_at: c.created_at,
    }))

    return NextResponse.json({ success: true, data })
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
    const { reported_at, case_category, incident_date_start, summary } = body

    if (!reported_at) {
      return NextResponse.json({ success: false, error: "Tanggal pelaporan diperlukan" }, { status: 400 })
    }

    const year = new Date().getFullYear()
    const count = await prisma.case.count()
    const case_number = `KBG/${session.user.organization_id?.slice(0, 4) ?? "XXX"}/${year}/${(count + 1).toString().padStart(4, "0")}`

    const caseData = await prisma.case.create({
      data: {
        case_number,
        reporting_organization_id: session.user.organization_id,
        created_by: session.user.id,
        reported_at: new Date(reported_at),
        incident_date_start: incident_date_start ? new Date(incident_date_start) : null,
        case_category: case_category ?? "KBG",
        summary,
        case_status: "DRAFT",
        verification_status: "PENDING",
      },
    })

    await prisma.auditLog.create({
      data: {
        user_id: session.user.id,
        organization_id: session.user.organization_id,
        action: "CREATE_CASE",
        entity_type: "Case",
        entity_id: caseData.id,
        new_value: { case_number },
      },
    })

    return NextResponse.json({ success: true, data: caseData })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
