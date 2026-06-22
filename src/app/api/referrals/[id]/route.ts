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
    const { referral_status, response_date, completion_date, notes } = body

    const data: Record<string, unknown> = {}
    if (referral_status) data.referral_status = referral_status
    if (response_date) data.response_date = new Date(response_date)
    if (completion_date) data.completion_date = new Date(completion_date)
    if (notes !== undefined) data.notes = notes

    const referral = await prisma.referral.update({
      where: { id },
      data,
      include: {
        case: { select: { case_number: true } },
        service_type: { select: { name: true } },
        provider: { select: { provider_name: true } },
      },
    })

    return NextResponse.json({ success: true, data: referral })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
