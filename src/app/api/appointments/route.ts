import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import nodemailer from "nodemailer";
import { format, isBefore, startOfDay, isWeekend } from "date-fns";
import { ptBR } from "date-fns/locale";

export async function POST(req: Request) {
    try {
        const { name, cpf, exam, symptoms, email, date, timePref } = await req.json();

        if (!name || !cpf || !exam || !email || !date || !timePref) {
            return NextResponse.json({ error: "Campos obrigatórios faltando" }, { status: 400 });
        }

        // Validate date
        const selectedDate = new Date(date);
        const today = startOfDay(new Date());
        if (isBefore(selectedDate, today) || isWeekend(selectedDate)) {
            return NextResponse.json({ error: "Data inválida. Selecione uma data futura de segunda a sexta." }, { status: 400 });
        }

        // Calculate exact time
        const periods = {
            "Manhã": [7, 8, 9, 10, 11],
            "Tarde": [12, 13, 14, 15, 16, 17],
            "Noite": [18, 19]
        };

        let exactHour: number;
        if (timePref === "O quanto antes") {
            exactHour = 7;
        } else {
            const periodSlots = periods[timePref as keyof typeof periods];
            if (!periodSlots) {
                return NextResponse.json({ error: "Preferência de horário inválida" }, { status: 400 });
            }
            // For now, assume first slot available
            exactHour = periodSlots[0];
        }

        const exactTime = `${exactHour.toString().padStart(2, '0')}:00`;

        // salva no banco
        await db.execute(
            "INSERT INTO appointments (name, cpf, email, exam, symptoms) VALUES (?, ?, ?, ?, ?)",
            [name, cpf, email, exam, symptoms || null]
        );

        // transporte direto com Gmail
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "devmed765@gmail.com",
                pass: "fokt msbu dhrs pfqf",
            },
        });

        // corpo do email
        await transporter.sendMail({
            from: `"DevMed" <devmed765@gmail.com>`,
            to: email,
            subject: "Confirmação de Agendamento - DevMed",
            html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
    <!-- Cabeçalho -->
    <div style="background-color: #123456; color: white; padding: 20px; text-align: center;">
      <h1 style="margin: 0; font-size: 22px;">✅ Confirmação de Agendamento</h1>
    </div>

    <!-- Conteúdo -->
    <div style="padding: 24px; background-color: #f9fafb;">
      <h2 style="color: #111827; font-size: 20px; margin-bottom: 12px;">Olá, ${name}!</h2>
      <p style="color: #374151; font-size: 14px; margin-bottom: 20px;">
        Seu agendamento foi registrado com sucesso na <b>DevMed</b>.
      </p>

      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #123456; border-bottom: 1px solid #e5e7eb;">Exame</td>
          <td style="padding: 8px; color: #374151; border-bottom: 1px solid #e5e7eb;">${exam}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #123456; border-bottom: 1px solid #e5e7eb;">Data</td>
          <td style="padding: 8px; color: #374151; border-bottom: 1px solid #e5e7eb;">${format(selectedDate, "dd/MM/yyyy", { locale: ptBR })}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #123456; border-bottom: 1px solid #e5e7eb;">Horário</td>
          <td style="padding: 8px; color: #374151; border-bottom: 1px solid #e5e7eb;">${exactTime}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #123456; border-bottom: 1px solid #e5e7eb;">CPF</td>
          <td style="padding: 8px; color: #374151; border-bottom: 1px solid #e5e7eb;">${cpf}</td>
        </tr>
        <tr>
          <td style="padding: 8px; font-weight: bold; color: #123456;">Sintomas</td>
          <td style="padding: 8px; color: #374151;">${symptoms || "Não informado"}</td>
        </tr>
      </table>

      <p style="color: #374151; font-size: 14px; margin-bottom: 24px;">
        Em breve nossa equipe entrará em contato para confirmar sua consulta.
      </p>
    </div>

    <!-- Rodapé -->
    <div style="background-color: #f3f4f6; padding: 16px; text-align: center; font-size: 12px; color: #6b7280;">
      <p style="margin: 0;">© 2025 DevMed. Todos os direitos reservados.</p>
      <p style="margin: 0;">Este é um e-mail automático, por favor não responda.</p>
    </div>
  </div>
`,
        });

        return NextResponse.json({ message: "Agendamento criado e e-mail enviado com sucesso!" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao criar agendamento" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const [rows] = await db.execute("SELECT * FROM appointments ORDER BY created_at DESC");
        return NextResponse.json(rows);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Erro ao buscar agendamentos" }, { status: 500 });
    }
    
}
