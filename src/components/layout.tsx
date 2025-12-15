"use client"

import Link from "next/link"
import { ReactNode, useEffect, useState } from "react"
import Image from "next/image"
import Logo from "../../public/logo.png"
import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "./ui/use-toast"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")

  useEffect(() => {
    // Check if user is logged in by checking localStorage or cookie
    const userEmail = localStorage.getItem("userEmail")
    const name = localStorage.getItem("userName")
    setIsLoggedIn(!!userEmail)
    setUserName(name || "")
  }, [])

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
      })

      if (res.ok) {
        localStorage.removeItem("userEmail")
        setIsLoggedIn(false)
        toast({
          title: "Logout realizado com sucesso",
          description: "Você foi desconectado.",
        })
        router.push("/login")
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao fazer logout",
          description: "Tente novamente.",
        })
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro de conexão",
        description: "Não foi possível conectar ao servidor.",
      })
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f9fb] flex flex-col">
      {/* Header fixo */}
      <header className="bg-[#123456] text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-2xl font-bold">
            <Link href="/" className="flex items-center gap-2">
              <Image src={Logo} alt="DevMed" width={32} height={32} />
              <span className="text-xl font-bold">DevMed</span>
            </Link>
          </h1>

          <nav className="space-x-6">
            {isLoggedIn && (
              <Link href="/profile" className="hover:opacity-70 transition-opacity duration-300">
                Perfil
              </Link>
            )}
            <Link href="/about" className="hover:opacity-70 transition-opacity duration-300">
              Sobre
            </Link>
            <Link href="/services" className="hover:opacity-70 transition-opacity duration-300">
              Serviços
            </Link>
            <Link href="/appointment" className="hover:opacity-70 transition-opacity duration-300">
              Agendamento
            </Link>
            <Link href="/contact" className="hover:opacity-70 transition-opacity duration-300">
              Contato
            </Link>
          </nav>

          {isLoggedIn && (
            <div className="flex items-center space-x-4">
              <span className="text-white">Olá, {userName}</span>
              <Button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Logout
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Conteúdo */}
      <div className="flex-1">{children}</div>

      {/* Footer fixo */}
      <footer className="bg-[#123456] text-white text-center py-4">
        <p>© 2025 DevMed. Todos os direitos reservados.</p>
      </footer>
    </main>
  )
}
