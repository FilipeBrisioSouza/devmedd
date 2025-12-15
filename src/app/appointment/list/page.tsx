"use client"

import { useEffect, useState } from "react"
import { Layout } from "@/components/layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2, Calendar } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Appointment {
  id: number
  name: string
  email: string
  cpf: string
  exam: string
  symptoms: string | null
  created_at: string
}

export default function AppointmentListPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true)
      try {
        // 👇 Busca o email salvo no login
        const userEmail = localStorage.getItem("userEmail")

        if (!userEmail) {
          toast({
            variant: "destructive",
            title: "Usuário não autenticado",
            description: "Por favor, faça login para visualizar seus agendamentos.",
          })
          setLoading(false)
          return
        }

        const res = await fetch("/api/appointments")
        if (!res.ok) throw new Error("Erro ao buscar agendamentos")

        const data = await res.json()
        // 🔹 Filtra apenas os exames do usuário logado
        const userAppointments = data.filter(
          (appt: Appointment) => appt.email === userEmail
        )

        setAppointments(userAppointments)
      } catch (err) {
        console.error(err)
        toast({
          variant: "destructive",
          title: "Erro ao carregar agendamentos",
          description: "Tente novamente em alguns instantes.",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir este agendamento?")) return
    setDeleting(id)
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Erro ao excluir agendamento")

      setAppointments((prev) => prev.filter((appt) => appt.id !== id))

      toast({
        title: "Agendamento excluído com sucesso ✅",
        description: "O exame foi removido da sua lista.",
      })
    } catch (err) {
      console.error(err)
      toast({
        variant: "destructive",
        title: "Erro ao excluir",
        description: "Não foi possível remover o agendamento.",
      })
    } finally {
      setDeleting(null)
    }
  }

  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center px-6 py-16 bg-gradient-to-br from-[#eef4fa] via-[#f9fbfd] to-[#e6f0ff]">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#123456] mb-3 tracking-tight">
            Meus Exames
          </h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Acompanhe os exames que você agendou e gerencie-os facilmente.
          </p>
        </div>

        {/* Lista */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-[#123456]" />
          </div>
        ) : appointments.length === 0 ? (
          <p className="text-center text-gray-500 py-10">
            Nenhum exame encontrado para este usuário.
          </p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
            {appointments.map((appt) => (
              <Card
                key={appt.id}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#f9fbfd] to-[#eef4fa] dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 border border-gray-200 dark:border-slate-700 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                {/* Cabeçalho */}
                <div className="bg-[#0b2545] text-white px-6 py-3 flex items-center justify-between shadow-inner">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 opacity-80" />
                    <span className="text-sm font-medium tracking-wide">
                      {new Date(appt.created_at).toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <span className="text-xs opacity-75 italic">DevMed</span>
                </div>

                {/* Conteúdo */}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-[#0b2545] mb-2 group-hover:text-[#123456] transition-colors">
                    {appt.exam}
                  </h2>

                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      <span className="font-medium text-[#123456]">Paciente:</span>{" "}
                      <span className="text-[#0b2545]">{appt.name}</span>
                    </p>

                    {appt.symptoms && (
                      <p>
                        <span className="font-medium text-[#123456]">Sintomas:</span>{" "}
                        <span className="text-gray-700">{appt.symptoms}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Rodapé */}
                <div className="px-6 pb-6">
                  <Button
                    onClick={() => handleDelete(appt.id)}
                    disabled={deleting === appt.id}
                    className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    {deleting === appt.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                    Excluir exame
                  </Button>
                </div>

                {/* Brilho animado */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none transition-opacity duration-700"></div>
              </Card>
            ))}
          </div>

        )}
      </div>
    </Layout>
  )
}
