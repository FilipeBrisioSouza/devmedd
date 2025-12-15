import { Layout } from "@/components/layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, FileText, User, Stethoscope, Microscope, Heart, Brain, Bone, Eye, TestTube } from "lucide-react"

const services = [
  {
    icon: <Stethoscope className="w-8 h-8" />,
    title: "Consultas Médicas",
    description: "Atendimento clínico geral e especializado com profissionais qualificados.",
    details: ["Clínica Geral", "Cardiologia", "Dermatologia", "Ginecologia", "Ortopedia"],
    price: "A partir de R$ 150"
  },
  {
    icon: <Microscope className="w-8 h-8" />,
    title: "Exames Laboratoriais",
    description: "Análises clínicas completas com resultados rápidos e precisos.",
    details: ["Hemograma", "Colesterol", "Glicemia", "TSH", "Urina", "Fezes"],
    price: "A partir de R$ 25"
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: "Exames Cardiológicos",
    description: "Avaliação completa da saúde cardiovascular.",
    details: ["Eletrocardiograma", "Ecocardiograma", "Teste Ergométrico", "Holter"],
    price: "A partir de R$ 120"
  },
  {
    icon: <Brain className="w-8 h-8" />,
    title: "Exames Neurológicos",
    description: "Diagnóstico e acompanhamento de condições neurológicas.",
    details: ["Eletroencefalograma", "Ressonância Magnética", "Tomografia", "Doppler"],
    price: "A partir de R$ 200"
  },
  {
    icon: <Bone className="w-8 h-8" />,
    title: "Exames Ortopédicos",
    description: "Avaliação musculoesquelética completa.",
    details: ["Raio-X", "Densitometria", "Ressonância", "Ultrassom"],
    price: "A partir de R$ 80"
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: "Exames Oftalmológicos",
    description: "Cuidados completos com a saúde visual.",
    details: ["Acuidade Visual", "Tonometria", "Fundoscopia", "Campo Visual"],
    price: "A partir de R$ 60"
  },
  {
    icon: <TestTube className="w-8 h-8" />,
    title: "Exames de Imagem",
    description: "Tecnologia avançada para diagnósticos precisos.",
    details: ["Ultrassom", "Tomografia", "Ressonância", "Mamografia", "Densitometria"],
    price: "A partir de R$ 150"
  },
  {
    icon: <User className="w-8 h-8" />,
    title: "Telemedicina",
    description: "Consultas médicas online, práticas e seguras.",
    details: ["Consulta Online", "Acompanhamento", "Orientação", "Receitas Digitais"],
    price: "A partir de R$ 80"
  }
]

export default function ServicesPage() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-64px)] bg-gradient-to-br from-[#f7f9fb] to-[#eef4fa]">
        {/* Header */}
        <section className="py-16 bg-gradient-to-r from-[#123456] to-[#0b2545] dark:from-slate-800 dark:to-slate-900 text-white transition-colors duration-300">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Nossos Serviços</h1>
            <p className="text-xl text-blue-100 dark:text-slate-300 max-w-3xl mx-auto">
              Oferecemos uma ampla gama de serviços médicos com tecnologia de ponta
              e atendimento humanizado para cuidar da sua saúde.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 group border-0 shadow-md bg-white dark:bg-slate-800 dark:border-slate-700">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 bg-[#123456] group-hover:bg-[#C89B3C] rounded-full flex items-center justify-center mx-auto mb-4 transition-colors">
                      <div className="text-white">
                        {service.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#123456] mb-2">{service.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                    <p className="text-[#C89B3C] font-semibold text-lg mb-4">{service.price}</p>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-[#123456] mb-2">Inclui:</h4>
                    <ul className="text-sm text-gray-600 dark:text-slate-300 space-y-1">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#C89B3C] rounded-full"></span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button asChild className="w-full bg-[#123456] hover:bg-[#0b2545] group-hover:bg-[#C89B3C] group-hover:hover:bg-[#a67a2e]">
                    <Link href="/appointment">
                      Agendar
                    </Link>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-[#123456] text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para cuidar da sua saúde?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Agende seus exames online de forma rápida e segura.
              Nossa equipe está pronta para oferecer o melhor atendimento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[#C89B3C] hover:bg-[#a67a2e] text-white px-8 py-3">
                <Link href="/appointment" className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Agendar Exame
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-[#123456] px-8 py-3">
                <Link href="/contact" className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Fale Conosco
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-16 bg-white dark:bg-slate-900 transition-colors duration-300">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-20 h-20 bg-[#C89B3C] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-[#123456] dark:text-slate-100 mb-2">Resultados Rápidos</h3>
                <p className="text-gray-600 dark:text-slate-300">
                  Receba seus resultados em até 24 horas para exames laboratoriais.
                </p>
              </div>

              <div>
                <div className="w-20 h-20 bg-[#123456] dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <span className="text-2xl font-bold text-white">🔒</span>
                </div>
                <h3 className="text-xl font-bold text-[#123456] dark:text-slate-100 mb-2">Segurança Garantida</h3>
                <p className="text-gray-600 dark:text-slate-300">
                  Seus dados são protegidos com criptografia e LGPD compliance.
                </p>
              </div>

              <div>
                <div className="w-20 h-20 bg-[#0b2545] dark:bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                  <span className="text-2xl font-bold text-white">👨‍⚕️</span>
                </div>
                <h3 className="text-xl font-bold text-[#123456] dark:text-slate-100 mb-2">Profissionais Qualificados</h3>
                <p className="text-gray-600 dark:text-slate-300">
                  Equipe médica com anos de experiência e especializações.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
