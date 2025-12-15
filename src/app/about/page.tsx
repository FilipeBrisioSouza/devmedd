import { Layout } from "@/components/layout"

export default function AboutPage() {
  return (
    <Layout>
      <section className="py-20 container mx-auto px-6">
        <h1 className="text-3xl font-bold text-[#123456] mb-8">
          Sobre a DevMed
        </h1>

        <div className="max-w-3xl space-y-6 text-gray-700 leading-relaxed">
          <p>
            A <strong>DevMed</strong> nasceu com o propósito de transformar a forma
            como as pessoas cuidam da sua saúde, unindo tecnologia, inovação e
            cuidado humano. Acreditamos que um atendimento de qualidade vai além do
            diagnóstico: ele envolve acolhimento, confiança, escuta ativa e uma
            experiência positiva em cada contato com o paciente.
          </p>

          <p>
            Nossa clínica oferece <strong>consultas presenciais</strong>,{" "}
            <strong>exames laboratoriais</strong> e{" "}
            <strong>telemedicina</strong>, proporcionando soluções completas,
            acessíveis e eficientes para diferentes necessidades de saúde.
            Utilizamos recursos tecnológicos modernos para otimizar processos,
            ampliar o acesso aos serviços e garantir mais agilidade, sem abrir mão
            do atendimento humanizado.
          </p>

          <p>
            Na DevMed, o paciente está sempre no centro de tudo. Trabalhamos com
            profissionais qualificados, ambientes acolhedores e processos pensados
            para oferecer <strong>segurança</strong>, <strong>conforto</strong> e{" "}
            <strong>excelência</strong> em todas as etapas do atendimento. Nosso
            compromisso é cuidar da saúde de forma integral, com responsabilidade,
            ética e respeito, promovendo bem-estar e qualidade de vida.
          </p>

          <p>
            Mais do que uma clínica, a DevMed é um espaço onde{" "}
            <strong>tecnologia e cuidado caminham juntos</strong>, construindo uma
            experiência de saúde moderna, confiável e verdadeiramente humana.
          </p>
        </div>
      </section>
    </Layout>

  )
}
