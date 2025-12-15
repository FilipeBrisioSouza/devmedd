"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  User,
  IdCard,
  Mail,
  Stethoscope,
  FileText,
  Loader2,
  CheckCircle2,
  Calendar as CalendarIcon,
  Clock
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format, isBefore, startOfDay, isWeekend } from "date-fns"
import { ptBR } from "date-fns/locale"

// Função para máscara e limite do CPF
function maskCpf(value: string) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
}

function isValidCpf(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, "")

  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false // rejeita repetidos tipo 111.111...

  let sum = 0
  for (let i = 0; i < 9; i++) sum += parseInt(cpf.charAt(i)) * (10 - i)
  let rev = 11 - (sum % 11)
  if (rev === 10 || rev === 11) rev = 0
  if (rev !== parseInt(cpf.charAt(9))) return false

  sum = 0
  for (let i = 0; i < 10; i++) sum += parseInt(cpf.charAt(i)) * (11 - i)
  rev = 11 - (sum % 11)
  if (rev === 10 || rev === 11) rev = 0
  if (rev !== parseInt(cpf.charAt(10))) return false

  return true
}

export function AppointmentForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [cpf, setCpf] = useState("")
  const [email, setEmail] = useState("")
  const [exam, setExam] = useState("")
  const [symptoms, setSymptoms] = useState("")
  const [date, setDate] = useState<Date | undefined>()
  const [timePref, setTimePref] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [redirecting, setRedirecting] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [exactTime, setExactTime] = useState("")

  useEffect(() => {
    const userName = localStorage.getItem("userName")
    const userEmail = localStorage.getItem("userEmail")
    const userCpf = localStorage.getItem("userCpf")

    if (userName) setName(userName)
    if (userEmail) setEmail(userEmail)
    if (userCpf) setCpf(userCpf)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const cleanCpf = cpf.replace(/\D/g, "")
    if (cleanCpf.length !== 11) {
      setError("CPF inválido")
      return
    }
    if (!isValidCpf(cleanCpf)) {
      setError("CPF inválido")
      return
    }
    if (!exam) {
      setError("Selecione um exame")
      return
    }
    if (!email.includes("@")) {
      setError("Informe um e-mail válido")
      return
    }
    if (!date) {
      setError("Selecione uma data")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          cpf,
          email,
          exam,
          symptoms,
          date: date.toISOString(),
          timePref,
        }),
      })

      if (!res.ok) throw new Error("Erro ao salvar agendamento")
      const data = await res.json()
      setExactTime(data.exactTime)
      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setError("Não foi possível salvar. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  // Redireciona após sucesso
  useEffect(() => {
    if (submitted && !redirecting) {
      const timer = setTimeout(() => {
        setRedirecting(true)
        setTimeout(() => router.push("/"), 600)
      }, 2500)
      return () => clearTimeout(timer)
    }
  }, [submitted, redirecting, router])

  // Tela de sucesso
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          animate={redirecting ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-6 text-center space-y-3 shadow-lg border border-green-100 rounded-2xl max-w-md mx-auto">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto" />
            </motion.div>
            <h2 className="text-xl font-semibold text-green-700">
              Consulta Agendada!
            </h2>
            <p className="text-sm text-gray-600">
              Obrigado, <span className="font-medium">{name}</span>. Exame:{" "}
              <span className="font-medium">{exam}</span> no dia{" "}
              <span className="font-medium">
                {date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : ""}
              </span> às <span className="font-medium">{exactTime}</span>.
            </p>
            <p className="text-xs text-gray-400 mt-3">
              Você será redirecionado em instantes...
            </p>
          </Card>
        </motion.div>
      </motion.div>
    )
  }

  // Formulário
  return (
    <Card className="shadow-md border border-gray-200 rounded-2xl w-full overflow-hidden p-0">
      <div className="bg-[#123456] text-white py-4 px-6">
        <h2 className="flex items-center gap-2 justify-center text-lg font-semibold">
          <CalendarIcon className="h-5 w-5" />
          Agende sua Consulta
        </h2>
      </div>

      <CardContent className="p-8 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6 text-sm">

          {/* Nome */}
          <div className="flex items-center gap-3 bg-white rounded-lg border px-4 py-3 shadow-sm">
            <User className="h-5 w-5 text-[#C89B3C]" />
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome completo"
              required
              className="border-0 focus:ring-0"
            />
          </div>

          {/* Email */}
          <div className="flex items-center gap-3 bg-white rounded-lg border px-4 py-3 shadow-sm">
            <Mail className="h-5 w-5 text-[#C89B3C]" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail"
              required
              className="border-0 focus:ring-0"
            />
          </div>

          {/* CPF */}
          <div className="flex items-center gap-3 bg-white rounded-lg border px-4 py-3 shadow-sm">
            <IdCard className="h-5 w-5 text-[#C89B3C]" />
            <Input
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(maskCpf(e.target.value))}
              placeholder="000.000.000-00"
              required
              maxLength={14}
              className="border-0 focus:ring-0"
            />
          </div>

          {/* Exame */}
          <div className="flex items-center gap-3 bg-white rounded-lg border px-4 py-3 shadow-sm">
            <Stethoscope className="h-5 w-5 text-[#C89B3C]" />
            <Select onValueChange={(value) => setExam(value)}>
              <SelectTrigger className="border-0 focus:ring-0 w-full">
                <SelectValue placeholder="Selecione um exame" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hemograma">Hemograma</SelectItem>
                <SelectItem value="Raio-X">Raio-X</SelectItem>
                <SelectItem value="Ultrassom">Ultrassom</SelectItem>
                <SelectItem value="Ressonância Magnética">
                  Ressonância Magnética
                </SelectItem>
                <SelectItem value="Tomografia">Tomografia</SelectItem>
                <SelectItem value="Endoscopia">Endoscopia</SelectItem>
                <SelectItem value="Exame de urina">Exame de urina</SelectItem>
                <SelectItem value="Mamografia">Mamografia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Data */}
          <div className="space-y-1">
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-[#C89B3C]" />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-11 rounded-lg text-sm pl-9 text-left font-normal bg-white shadow-sm",
                      !date && "text-gray-400"
                    )}
                  >
                    {date
                      ? format(date, "dd/MM/yyyy", { locale: ptBR })
                      : "Selecione a data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    locale={ptBR}
                    disabled={(date) => isBefore(date, startOfDay(new Date())) || isWeekend(date)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>


          {/* Preferência de horário */}
          <div className="flex items-center gap-3 bg-white rounded-lg border px-4 py-3 shadow-sm">
            <Clock className="h-5 w-5 text-[#C89B3C]" />
            <Select onValueChange={(value) => setTimePref(value)}>
              <SelectTrigger className="border-0 focus:ring-0 w-full">
                <SelectValue placeholder="Preferência de horário" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Manhã">Manhã</SelectItem>
                <SelectItem value="Tarde">Tarde</SelectItem>
                <SelectItem value="Noite">Noite</SelectItem>
                <SelectItem value="O quanto antes">O quanto antes possível</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Sintomas */}
          <div className="flex items-center gap-3 bg-white rounded-lg border px-4 py-3 shadow-sm">
            <FileText className="h-5 w-5 text-[#C89B3C]" />
            <Textarea
              id="symptoms"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Descreva seus sintomas..."
              className="border-0 focus:ring-0 min-h-[80px]"
              maxLength={250}
            />
          </div>

          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C89B3C] hover:bg-[#a67a2e] text-white font-medium text-base h-12 rounded-lg flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="animate-spin h-4 w-4" />}
            Confirmar Agendamento
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
