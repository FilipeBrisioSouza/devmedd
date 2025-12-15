"use client"

import { Layout } from "@/components/layout"
import { AppointmentForm } from "@/components/appointment-form"

export default function AppointmentPage() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-start px-4 py-12 bg-[#f9fafc] dark:bg-slate-900 transition-colors duration-300">

        {/* Cabeçalho */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#123456] dark:text-slate-100 mb-2">
            Agendamento de Consulta
          </h1>
          <p className="text-gray-600 dark:text-slate-300 max-w-lg mx-auto">
            Preencha seus dados e escolha o exame desejado. Nossa equipe entrará em contato
            para confirmar seu atendimento.
          </p>
        </div>

        {/* Grid conteúdo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-5xl w-full">
          {/* Form */}
          <div className="flex justify-center">
            <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8 border border-gray-100">
              <AppointmentForm />
            </div>
          </div>

          {/* Ilustração */}
          <div className="hidden md:flex flex-col items-center text-center">
            <img
              src="/Logo.png" 
              alt="Consulta médica"
              className="w-[320px] h-auto object-contain drop-shadow"
            />
            <p className="text-gray-500 text-sm max-w-xs mt-4">
              Atendimento rápido e humanizado com tecnologia a seu favor.
            </p>
          </div>
        </div>

        {/* Rodapé */}
        <div className="mt-10 text-center text-sm text-gray-500">
          Precisa de ajuda?{" "}
          <a href="/contact" className="text-[#123456] font-medium hover:underline">
            Fale conosco
          </a>
        </div>
      </div>
    </Layout>
  )
}
