import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const organizations = await prisma.organization.findMany({
      orderBy: { name: "asc" },
    })

    return NextResponse.json({ success: true, data: organizations })
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
    const { name, organization_type, email, phone, province_code, district_code, address } = body

    if (!name || !organization_type) {
      return NextResponse.json({ success: false, error: "Nama dan tipe organisasi diperlukan" }, { status: 400 })
    }

    const org = await prisma.organization.create({
      data: { name, organization_type, email, phone, province_code, district_code, address },
    })

    return NextResponse.json({ success: true, data: org })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
