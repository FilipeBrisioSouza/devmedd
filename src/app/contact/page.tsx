import { Layout } from "@/components/layout"

export default function ContactPage() {
  return (
    <Layout>
      <section className="py-20 container mx-auto px-6">
        <h1 className="text-3xl font-bold text-[#123456] mb-6">Contato</h1>
        <p className="text-gray-700 mb-6">Entre em contato com nossa equipe:</p>
        <ul className="mb-10 space-y-2 text-gray-600">
          <li>📞 (79) 99999-9999</li>
          <li>✉️ contato@devmed.com</li>
          <li>📍 Estrada do aloque</li>
        </ul>

        <form className="max-w-lg space-y-4">
          <input type="text" placeholder="Seu nome" className="w-full border rounded-lg px-3 py-2" />
          <input type="email" placeholder="Seu email" className="w-full border rounded-lg px-3 py-2" />
          <textarea placeholder="Mensagem" className="w-full border rounded-lg px-3 py-2 h-28"></textarea>
          <button className="w-full bg-[#C89B3C] text-white py-3 rounded-lg hover:bg-[#a67a2e]">
            Enviar
          </button>
        </form>
      </section>
    </Layout>
  )
}
