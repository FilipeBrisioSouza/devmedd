import { db } from "@/lib/db"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import type { RowDataPacket } from "mysql2"

interface User extends RowDataPacket {
  id: number
  email: string
  password_hash: string
  name?: string
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { message: "Campos obrigatórios ausentes." },
        { status: 400 }
      )
    }

    const [userRows] = await db.query<User[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    )

    if (!Array.isArray(userRows) || userRows.length === 0) {
      return NextResponse.json(
        { message: "Usuário não encontrado." },
        { status: 404 }
      )
    }

    const user = userRows[0]
    const isMatch = await bcrypt.compare(password, user.password_hash)

    if (!isMatch) {
      return NextResponse.json(
        { message: "Senha incorreta." },
        { status: 401 }
      )
    }

    const { password_hash, ...userSafe } = user

    const token = `session-${user.id}-${Date.now()}`

    const res = NextResponse.json(
      {
        message: "Login realizado com sucesso!",
        user: userSafe,
      },
      { status: 200 }
    )

    res.cookies.set("auth_token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 dia
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })

    return res
  } catch (err) {
    console.error("Erro ao realizar login:", err)
    return NextResponse.json(
      { message: "Erro interno do servidor." },
      { status: 500 }
    )
  }
}
