import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { auth } from "@/lib/auth"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    const { full_name, phone, is_active, organization_id, role_ids } = body

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...(full_name !== undefined && { full_name }),
        ...(phone !== undefined && { phone }),
        ...(is_active !== undefined && { is_active }),
        ...(organization_id !== undefined && { organization_id }),
      },
    })

    if (role_ids !== undefined) {
      await prisma.userRole.deleteMany({ where: { user_id: id } })
      if (role_ids.length > 0) {
        await prisma.userRole.createMany({
          data: role_ids.map((role_id: string) => ({ user_id: id, role_id })),
        })
      }
    }

    return NextResponse.json({ success: true, data: { id: user.id } })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    await prisma.user.update({ where: { id }, data: { is_active: false } })

    return NextResponse.json({ success: true, message: "Pengguna dinonaktifkan" })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
