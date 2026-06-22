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
    const { name, organization_type, email, phone, province_code, district_code, address, is_active } = body

    const org = await prisma.organization.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(organization_type !== undefined && { organization_type }),
        ...(email !== undefined && { email }),
        ...(phone !== undefined && { phone }),
        ...(province_code !== undefined && { province_code }),
        ...(district_code !== undefined && { district_code }),
        ...(address !== undefined && { address }),
        ...(is_active !== undefined && { is_active }),
      },
    })

    return NextResponse.json({ success: true, data: org })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
