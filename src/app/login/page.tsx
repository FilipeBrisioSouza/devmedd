"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import Image from "next/image"
import { useToast } from "../../components/ui/use-toast"
import { NextResponse } from "next/server";

export default function LoginPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        toast({
          variant: "destructive",
          title: "Erro ao fazer login",
          description: data.message || "Verifique suas credenciais e tente novamente.",
        })
        return
      }

      toast({
        title: "Login realizado com sucesso 🎉",
        description: "Bem-vindo(a) de volta à DevMed!",
      })

      localStorage.setItem("userEmail", email)
      localStorage.setItem("userName", data.user.name)
      
      setTimeout(() => {
        router.push("/") 
      }, 1000)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro de conexão",
        description: "Não foi possível conectar ao servidor.",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#f0f6fc] via-white to-[#e6f0ff] dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-colors duration-300">
      <div className="hidden md:flex md:w-1/2 relative">
        <Image
          src="/images/FOTO AMPARO.webp"
          alt="Clínica DevMed"
          fill
          className="object-cover brightness-75"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-[#0b2545]/50 dark:bg-slate-900/70 flex flex-col justify-center items-center text-white p-10 transition-colors duration-300">
          <h2 className="text-4xl font-bold mb-4 text-center">
            Bem-vindo(a) à DevMed
          </h2>
          <p className="text-center max-w-md text-gray-100 dark:text-slate-200">
            Sua saúde em boas mãos. Faça login para gerenciar agendamentos e exames.
          </p>
        </div>
      </div>

      {/* Lado direito: formulário */}
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
              Acesse sua conta
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0b2545] hover:bg-[#123456] text-white rounded-xl py-2 mt-4 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Entrando...
                </>
              ) : (
                "Entrar"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Ainda não tem conta?{" "}
            <a
              href="/register"
              className="text-[#0b2545] font-medium hover:underline"
            >
              Criar conta
            </a>
          </p>
        </Card>
      </div>
    </div>
  )
}
