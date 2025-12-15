import { NextResponse } from "next/server"

export async function POST(): Promise<NextResponse> {
  try {
    const res = NextResponse.json(
      { message: "Logout realizado com sucesso!" },
      { status: 200 }
    )

    // Clear the auth_token cookie
    res.cookies.set("auth_token", "", {
      httpOnly: true,
      path: "/",
      maxAge: 0, // Expire immediately
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })

    return res
  } catch (err) {
    console.error("Erro ao realizar logout:", err)
    return NextResponse.json(
      { message: "Erro interno do servidor." },
      { status: 500 }
    )
  }
}
