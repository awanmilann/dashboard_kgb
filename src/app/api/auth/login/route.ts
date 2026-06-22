import { NextResponse } from "next/server"
import { signIn } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: "Email dan password diperlukan" },
        { status: 400 }
      )
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      return NextResponse.json(
        { success: false, error: "Email atau password salah" },
        { status: 401 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Terjadi kesalahan server" },
      { status: 500 }
    )
  }
}
