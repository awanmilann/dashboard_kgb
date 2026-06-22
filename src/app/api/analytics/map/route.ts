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
    const level = url.searchParams.get("level") || "provinsi"
    const jenisKekerasan = url.searchParams.get("jenis_kekerasan") || ""
    const statusKasus = url.searchParams.get("status_kasus") || ""
    const periode = url.searchParams.get("periode") || ""

    const where: Record<string, unknown> = { is_archived: false }

    if (periode) {
      const year = parseInt(periode)
      where.reported_at = { gte: new Date(`${year}-01-01`), lte: new Date(`${year}-12-31`) }
    }
    if (statusKasus) where.case_status = statusKasus
    if (jenisKekerasan) {
      where.case_violence_types = { some: { violence_type_id: jenisKekerasan } }
    }

    const locationLevel = level === "provinsi" ? 1 : 2

    const locations = await prisma.location.findMany({
      where: { location_level: locationLevel, is_active: true },
      select: { id: true, name: true, latitude: true, longitude: true, location_code: true },
    })

    const caseCounts = await prisma.case.groupBy({
      by: ["reporting_location_id"],
      _count: true,
      where: { ...where, reporting_location_id: { not: null } } as any,
    })

    const countMap = new Map(caseCounts.map((c) => [c.reporting_location_id, c._count]))
    const highRiskWhere = { ...where, risk_level: { in: ["HIGH", "CRITICAL"] } }
    const highRiskCounts = await prisma.case.groupBy({
      by: ["reporting_location_id"],
      _count: true,
      where: highRiskWhere as any,
    })
    const highRiskMap = new Map(highRiskCounts.map((c) => [c.reporting_location_id, c._count]))

    const data = locations
      .map((loc) => ({
        id: loc.id,
        name: loc.name,
        latitude: loc.latitude,
        longitude: loc.longitude,
        total: countMap.get(loc.id) || 0,
        high_risk: highRiskMap.get(loc.id) || 0,
      }))
      .filter((d) => d.total > 0)

    const maxTotal = Math.max(...data.map((d) => d.total), 1)

    return NextResponse.json({
      success: true,
      data: data.map((d) => ({
        ...d,
        intensity: d.total / maxTotal,
      })),
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
