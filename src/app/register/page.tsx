"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import Image from "next/image"

// Função para máscara do CPF
function maskCpf(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
}

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setError("")

  if (password !== confirm) {
    setError("As senhas não coincidem.")
    return
  }

  setLoading(true)

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.message || "Erro ao realizar cadastro.")
      return
    }

    alert("✅ Cadastro realizado com sucesso!")
    router.push("/login")
  } catch (err) {
    setError("Erro ao conectar ao servidor.")
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#f0f6fc] via-white to-[#e6f0ff]">
      <div className="hidden md:flex md:w-1/2 relative">
        <Image
          src="/images/FOTOS-TCC2.jpeg"
          alt="Cadastro DevMed"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-[#0b2545]/50 flex flex-col justify-center items-center text-white p-10">
          <h2 className="text-4xl font-bold mb-4 text-center">
            Faça parte da DevMed
          </h2>
          <p className="text-center max-w-md text-gray-100">
            Cadastre-se para acessar consultas, exames e relatórios de saúde.
          </p>
        </div>
      </div>

      {/* Formulário */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <Card className="w-full max-w-md shadow-xl border border-gray-200 rounded-3xl p-8 bg-white/90 backdrop-blur-md">
          <div className="flex flex-col items-center mb-8">
            <Image
              src="/logo.png"
              alt="Logo DevMed"
              width={90}
              height={90}
              className="mb-4"
            />
            <h1 className="text-2xl font-bold text-[#0b2545]">
              Crie sua conta
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome completo
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Seu nome"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0b2545] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seuemail@exemplo.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0b2545] focus:outline-none"
              />
            </div>



            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0b2545] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirmar senha
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0b2545] focus:outline-none"
              />
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center mt-2">{error}</p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0b2545] hover:bg-[#123456] text-white rounded-xl py-2 mt-4 flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Cadastrar"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Já tem conta?{" "}
            <a
              href="/login"
              className="text-[#0b2545] font-medium hover:underline"
            >
              Entrar
            </a>
          </p>
        </Card>
      </div>
    </div>
  )
}
