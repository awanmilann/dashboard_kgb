import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { auth } from "@/lib/auth"
import type { Prisma } from "@prisma/client"

export async function GET(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(request.url)
    const action = url.searchParams.get("action")
    const entity_type = url.searchParams.get("entity_type")
    const user_id = url.searchParams.get("user_id")
    const startDate = url.searchParams.get("start_date")
    const endDate = url.searchParams.get("end_date")

    const where: Prisma.AuditLogWhereInput = {}
    if (action) where.action = action
    if (entity_type) where.entity_type = entity_type
    if (user_id) where.user_id = user_id
    if (startDate || endDate) {
      where.created_at = {}
      if (startDate) where.created_at.gte = new Date(startDate)
      if (endDate) where.created_at.lte = new Date(endDate)
    }

    const logs = await prisma.auditLog.findMany({
      where,
      include: {
        user: { select: { full_name: true, email: true } },
        organization: { select: { name: true } },
      },
      orderBy: { created_at: "desc" },
      take: 100,
    })

    return NextResponse.json({ success: true, data: logs })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
