import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"

export async function GET() {
  try {
    const locations = await prisma.location.findMany({
      where: { is_active: true },
      include: { parent: { select: { name: true } } },
      orderBy: [{ location_level: "asc" }, { name: "asc" }],
    })
    return NextResponse.json({ success: true, data: locations })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
