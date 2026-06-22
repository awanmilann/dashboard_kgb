import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"

export async function GET() {
  try {
    const types = await prisma.violenceType.findMany({
      where: { is_active: true },
      orderBy: { name: "asc" },
    })
    return NextResponse.json({ success: true, data: types })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
