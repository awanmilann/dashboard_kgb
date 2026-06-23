import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import bcrypt from "bcryptjs"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const userCount = await prisma.user.count()
    const user = await prisma.user.findUnique({
      where: { email: "admin@kapalperempuan.local" },
      select: { id: true, email: true, full_name: true, password_hash: true },
    })

    let bcryptResult = "not_tested"
    if (user) {
      const isValid = await bcrypt.compare("Admin123!", user.password_hash)
      bcryptResult = isValid ? "valid" : "invalid"
    }

    return NextResponse.json({
      success: true,
      database: "connected",
      userCount,
      userFound: !!user,
      bcryptResult,
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 })
  }
}
