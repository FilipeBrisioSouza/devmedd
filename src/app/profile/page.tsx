"use client"

import { useEffect, useState } from "react"
import { Layout } from "@/components/layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Loader2, Calendar, User } from "lucide-react"
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

// Simulated status - in real app this would come from DB
const getAppointmentStatus = (appointment: Appointment) => {
  const daysSinceCreated = Math.floor((Date.now() - new Date(appointment.created_at).getTime()) / (1000 * 60 * 60 * 24))
  if (daysSinceCreated < 1) return "pending"
  if (daysSinceCreated < 3) return "confirmed"
  if (daysSinceCreated < 7) return "completed"
  return "completed"
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending": return "bg-yellow-100 text-yellow-800"
    case "confirmed": return "bg-blue-100 text-blue-800"
    case "completed": return "bg-green-100 text-green-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "pending": return "Pendente"
    case "confirmed": return "Confirmado"
    case "completed": return "Concluído"
    default: return "Desconhecido"
  }
}

export default function ProfilePage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState<number | null>(null)
  const [userName, setUserName] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail")
    const name = localStorage.getItem("userName")

    if (!userEmail) {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Você precisa estar logado para acessar esta página.",
      })
      return
    }

    setUserEmail(userEmail)
    setUserName(name || "")

    const fetchAppointments = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/appointments")
        if (!res.ok) throw new Error("Erro ao buscar agendamentos")

        const data = await res.json()
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
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-[#eef4fa] via-[#f9fbfd] to-[#e6f0ff] dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-8 transition-colors duration-300">
        <div className="container mx-auto px-6 max-w-6xl">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-[#123456] dark:text-slate-100 mb-3 tracking-tight">
              Meu Perfil
            </h1>
            <p className="text-gray-600 dark:text-slate-300 max-w-xl mx-auto">
              Gerencie seus agendamentos médicos.
            </p>
          </div>

          {/* User Info Card */}
          <Card className="mb-8 p-6 bg-white shadow-lg border-0">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#123456] rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#123456]">{userName}</h2>
                <p className="text-gray-600">{userEmail}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Paciente desde {new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })}
                </p>
              </div>
            </div>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="appointments" className="w-full">
            <TabsList className="grid w-full grid-cols-1 mb-8">
              <TabsTrigger value="appointments" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Agendamentos
              </TabsTrigger>
            </TabsList>

            {/* Appointments Tab */}
            <TabsContent value="appointments">
              {loading ? (
                <div className="flex justify-center items-center py-10">
                  <Loader2 className="h-8 w-8 animate-spin text-[#123456]" />
                </div>
              ) : appointments.length === 0 ? (
                <Card className="p-8 text-center">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">Nenhum agendamento encontrado</h3>
                  <p className="text-gray-500 mb-4">
                    Você ainda não possui agendamentos marcados.
                  </p>
                  <Button asChild>
                    <a href="/appointment">Agendar Exame</a>
                  </Button>
                </Card>
              ) : (
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {appointments.map((appt) => {
                    const status = getAppointmentStatus(appt)
                    return (
                      <Card
                        key={appt.id}
                        className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-[#f9fbfd] to-[#eef4fa] border border-gray-200 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                      >
                        {/* Status Badge */}
                        <div className="absolute top-4 right-4 z-10">
                          <Badge className={`${getStatusColor(status)} border-0`}>
                            {getStatusText(status)}
                          </Badge>
                        </div>

                        {/* Header */}
                        <div className="bg-[#0b2545] text-white px-6 py-3 flex items-center justify-between shadow-inner">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 opacity-80" />
                            <span className="text-sm font-medium tracking-wide">
                              {new Date(appt.created_at).toLocaleString("pt-BR")}
                            </span>
                          </div>
                          <span className="text-xs opacity-75 italic">DevMed</span>
                        </div>

                        {/* Content */}
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

                        {/* Footer */}
                        <div className="px-6 pb-6 space-y-3">
                          <Button
                            onClick={() => handleDelete(appt.id)}
                            disabled={deleting === appt.id}
                            variant="outline"
                            className="w-full border-red-200 text-red-600 hover:bg-red-50 font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-200"
                          >
                            {deleting === appt.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                            Cancelar
                          </Button>
                        </div>

                        {/* Shine effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none transition-opacity duration-700"></div>
                      </Card>
                    )
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  )
}
