"use client"

import { HeroCarousel } from "@/components/hero-carousel"
import { Layout } from "@/components/layout"
import Link from "next/link"

export default function Home() {
  return (
    <Layout>
      <HeroCarousel />

      {/* Seção Sobre */}
      <section id="about" className="py-20 container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-[#123456] dark:text-slate-100 mb-4">Sobre a DevMed</h2>
        <p className="text-gray-600 dark:text-slate-300 max-w-3xl mx-auto mb-6">
          A DevMed é uma clínica moderna que une tecnologia e cuidado humano para
          oferecer o melhor atendimento em saúde.
        </p>
        <Link href="/about" className="text-[#C89B3C] font-medium hover:underline">
          Saiba mais →
        </Link>
      </section>

      {/* Seção Serviços */}
      <section id="services" className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-[#123456] mb-10">Nossos Serviços</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#f7f9fb] p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-[#123456] mb-2">Consultas</h3>
              <p className="text-gray-600">
                Atendimento clínico geral e especializado, com profissionais experientes.
              </p>
            </div>
            <div className="bg-[#f7f9fb] p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-[#123456] mb-2">Exames</h3>
              <p className="text-gray-600">
                Realizamos exames laboratoriais e de imagem com rapidez e precisão.
              </p>
            </div>
            <div className="bg-[#f7f9fb] p-6 rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-[#123456] mb-2">Telemedicina</h3>
              <p className="text-gray-600">
                Consulte com médicos de forma online, prática e segura.
              </p>
            </div>
          </div>
          <Link href="/services" className="mt-6 inline-block text-[#C89B3C] font-medium hover:underline">
            Ver todos os serviços →
          </Link>
        </div>
      </section>

      {/* Contato */}
      <section id="contact" className="bg-[#123456] dark:bg-slate-800 text-white py-20 text-center transition-colors duration-300">
        <h2 className="text-3xl font-bold mb-4">Entre em Contato</h2>
        <p className="mb-4">Agende consultas ou tire dúvidas com nossa equipe.</p>
        <Link
          href="/contact"
          className="bg-[#C89B3C] text-white px-6 py-3 rounded-lg shadow hover:bg-[#a67a2e]"
        >
          Fale Conosco
        </Link>
      </section>
    </Layout>
  )
}
