import { NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 })
    }

    const notifications = await prisma.notification.findMany({
      where: { user_id: session.user.id },
      orderBy: { created_at: "desc" },
      take: 50,
    })

    const unreadCount = await prisma.notification.count({
      where: { user_id: session.user.id, is_read: false },
    })

    return NextResponse.json({ success: true, data: notifications, unread_count: unreadCount })
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
    const { title, message, notification_type, related_entity_type, related_entity_id, user_id } = body

    if (!title || !notification_type || !user_id) {
      return NextResponse.json({ success: false, error: "Title, notification_type, dan user_id diperlukan" }, { status: 400 })
    }

    const notification = await prisma.notification.create({
      data: { title, message, notification_type, related_entity_type, related_entity_id, user_id },
    })

    return NextResponse.json({ success: true, data: notification })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Terjadi kesalahan server" }, { status: 500 })
  }
}
