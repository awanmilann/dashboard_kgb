import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import bcrypt from "bcryptjs"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // --- Exact replica of authorize function ---
    const email = "admin@kapalperempuan.local"
    const password = "Admin123!"

    if (!email || !password) {
      return NextResponse.json({ step: "validation", passed: false, reason: "missing credentials" })
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        organization: true,
        user_roles: {
          include: {
            role: {
              include: {
                role_permissions: {
                  include: {
                    permission: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    if (!user || !user.is_active) {
      return NextResponse.json({
        step: "user_check",
        passed: false,
        userFound: !!user,
        isActive: user?.is_active ?? null,
      })
    }

    const isValid = await bcrypt.compare(password, user.password_hash)
    if (!isValid) {
      return NextResponse.json({ step: "password", passed: false })
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { last_login_at: new Date() },
    })

    return NextResponse.json({
      step: "success",
      passed: true,
      user: { id: user.id, email: user.email, name: user.full_name },
    })
    // --- End of replica ---
  } catch (error) {
    return NextResponse.json({
      step: "error",
      passed: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    }, { status: 500 })
  }
}
