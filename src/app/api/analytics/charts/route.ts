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
    if (wilayah) where.reporting_location_id = wilayah
    if (organisasi) where.reporting_organization_id = organisasi
    if (jenisKekerasan) {
      where.case_violence_types = { some: { violence_type_id: jenisKekerasan } }
    }

    const monthlyTrends = await prisma.case.findMany({
      where: {
        ...where,
        reported_at: periode
          ? { gte: new Date(`${parseInt(periode)}-01-01`), lte: new Date(`${parseInt(periode)}-12-31`) }
          : { gte: new Date(new Date().getFullYear() - 1, 0, 1) },
      } as any,
      select: { reported_at: true },
      orderBy: { reported_at: "asc" },
    })

    const monthMap: Record<string, number> = {}
    monthlyTrends.forEach((c) => {
      const key = `${c.reported_at.getFullYear()}-${String(c.reported_at.getMonth() + 1).padStart(2, "0")}`
      monthMap[key] = (monthMap[key] || 0) + 1
    })

    const monthlyData = Object.entries(monthMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, count]) => ({ month, count }))

    const violenceTypes = await prisma.violenceType.findMany({
      where: { is_active: true },
      select: { id: true, name: true, code: true },
    })

    let vtWhere: any = {}
    if (Object.keys(where).length > 1 || (where as any).is_archived === false) {
      vtWhere = { case: { ...where } }
    }

    const vtCounts = await prisma.caseViolenceType.groupBy({
      by: ["violence_type_id"],
      _count: true,
      where: vtWhere,
    })

    const vtMap = new Map(vtCounts.map((v) => [v.violence_type_id, v._count]))
    const violenceTypeData = violenceTypes.map((vt) => ({
      name: vt.name,
      value: vtMap.get(vt.id) || 0,
    }))

    const locationCases = await prisma.case.findMany({
      where: where as any,
      select: {
        reporting_location: { select: { id: true, name: true, parent_id: true } },
      },
    })

    const regionMap: Record<string, { total: number; verified: number; high_risk: number }> = {}
    locationCases.forEach((c) => {
      const name = c.reporting_location?.name || "Tidak Diketahui"
      if (!regionMap[name]) regionMap[name] = { total: 0, verified: 0, high_risk: 0 }
      regionMap[name].total++
    })

    const locationData = Object.entries(regionMap)
      .map(([name, counts]) => ({ name, ...counts }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 20)

    const statusLabels: Record<string, string> = {
      DRAFT: "Draft",
      REPORTED: "Dilaporkan",
      IN_PROGRESS: "Dalam Penanganan",
      FOLLOW_UP: "Tindak Lanjut",
      CLOSED: "Selesai",
      ARCHIVED: "Diarsipkan",
    }

    const statusData = await prisma.case.groupBy({
      by: ["case_status"],
      _count: true,
      where: where as any,
    })

    const statusChartData = statusData.map((s) => ({
      name: statusLabels[s.case_status] || s.case_status,
      value: s._count,
    }))

    return NextResponse.json({
      success: true,
      data: {
        monthly: monthlyData,
        violence_types: violenceTypeData,
        status: statusChartData,
        locations: locationData,
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
