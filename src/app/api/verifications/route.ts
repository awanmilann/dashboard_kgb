import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const verifications = await prisma.case.findMany({
      where: {
        verification_status: { in: ["PENDING", "IN_REVIEW"] },
        is_archived: false,
      },
      include: {
        reporting_organization: { select: { name: true } },
        created_by_user: { select: { full_name: true } },
        incident_location: { select: { name: true } },
      },
      orderBy: { submitted_at: "asc" },
    })

    return NextResponse.json({ success: true, data: verifications })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
