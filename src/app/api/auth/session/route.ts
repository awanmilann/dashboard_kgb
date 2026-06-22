import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()
    return NextResponse.json({ success: true, data: session })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
}
