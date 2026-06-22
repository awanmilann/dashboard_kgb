import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { auth } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { report_type, format, period_start, period_end, wilayah, organisasi } = body

    if (!report_type || !format) {
      return NextResponse.json({ success: false, error: "Tipe laporan dan format diperlukan" }, { status: 400 })
    }

    await prisma.dataExportLog.create({
      data: {
        requested_by: session.user.id,
        export_type: report_type,
        export_format: format,
        filters: { period_start, period_end, wilayah, organisasi },
        contains_sensitive_data: false,
      },
    })

    return NextResponse.json({
      success: true,
      message: "Laporan sedang diproses",
      data: { report_type, format, period_start, period_end },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
