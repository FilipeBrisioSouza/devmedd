import { db } from "@/lib/db"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ message: "Campos obrigatórios ausentes." }, { status: 400 })
    }

    // 🔎 Verifica se o e-mail já está em uso
    const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email])
    if (Array.isArray(existingUser) && existingUser.length > 0) {
      return NextResponse.json({ message: "E-mail já cadastrado." }, { status: 409 })
    }

    // 🔐 Criptografa a senha
    const passwordHash = await bcrypt.hash(password, 10)

    // 💾 Salva o usuário no banco
    await db.query(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [name, email, passwordHash]
    )

    return NextResponse.json({ message: "Usuário cadastrado com sucesso!" }, { status: 201 })
  } catch (err) {
    console.error("Erro ao cadastrar usuário:", err)
    return NextResponse.json({ message: "Erro interno do servidor." }, { status: 500 })
  }
}
