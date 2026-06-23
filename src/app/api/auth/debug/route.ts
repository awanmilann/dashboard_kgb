import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import bcrypt from "bcryptjs"

export const dynamic = "force-dynamic"

async function authorize(email: string, password: string) {
  if (!email || !password) {
    return { step: "validation", passed: false, reason: "missing credentials" }
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
    return {
      step: "user_check",
      passed: false,
      userFound: !!user,
      isActive: user?.is_active ?? null,
    }
  }

  const isValid = await bcrypt.compare(password, user.password_hash)
  if (!isValid) {
    return { step: "password", passed: false }
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { last_login_at: new Date() },
  })

  return {
    step: "success",
    passed: true,
    user: { id: user.id, email: user.email, name: user.full_name },
  }
}

export async function GET() {
  try {
    const result = await authorize("admin@kapalperempuan.local", "Admin123!")
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({
      step: "error",
      passed: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const result = await authorize(email, password)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({
      step: "error",
      passed: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }, { status: 500 })
  }
}
