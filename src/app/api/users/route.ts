import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { auth } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const users = await prisma.user.findMany({
      include: {
        organization: { select: { name: true } },
        user_roles: { include: { role: { select: { role_name: true } } } },
      },
      orderBy: { created_at: "desc" },
    })

    const data = users.map((u) => ({
      id: u.id,
      full_name: u.full_name,
      email: u.email,
      phone: u.phone,
      is_active: u.is_active,
      organization_name: u.organization?.name ?? null,
      roles: u.user_roles.map((ur) => ur.role.role_name),
      last_login_at: u.last_login_at,
      created_at: u.created_at,
    }))

    return NextResponse.json({ success: true, data })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { full_name, email, password, phone, organization_id, role_ids } = body

    if (!full_name || !email || !password) {
      return NextResponse.json({ success: false, error: "Nama, email, dan password diperlukan" }, { status: 400 })
    }

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) {
      return NextResponse.json({ success: false, error: "Email sudah terdaftar" }, { status: 409 })
    }

    const password_hash = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: {
        full_name,
        email,
        password_hash,
        phone,
        organization_id,
        user_roles: role_ids?.length
          ? { create: role_ids.map((role_id: string) => ({ role_id })) }
          : undefined,
      },
      include: {
        organization: { select: { name: true } },
        user_roles: { include: { role: { select: { role_name: true } } } },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        organization_name: user.organization?.name ?? null,
        roles: user.user_roles.map((ur) => ur.role.role_name),
      },
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
