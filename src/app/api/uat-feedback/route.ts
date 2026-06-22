import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const feedback = await prisma.uatFeedback.findMany({
      include: { user: { select: { full_name: true } } },
      orderBy: { created_at: "desc" },
      take: 100,
    })
    return NextResponse.json({ success: true, data: feedback })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    const body = await request.json()
    const { page_url, rating, feedback_text, category, browser_info } = body

    if (!page_url || !rating) {
      return NextResponse.json({ success: false, error: "page_url dan rating diperlukan" }, { status: 400 })
    }

    const feedback = await prisma.uatFeedback.create({
      data: {
        user_id: session?.user?.id ?? null,
        page_url,
        rating,
        feedback_text,
        category,
        browser_info,
      },
    })

    return NextResponse.json({ success: true, data: feedback })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
