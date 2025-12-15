import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    await db.execute("DELETE FROM appointments WHERE id = ?", [id]);

    return NextResponse.json({
      message: "Agendamento excluído com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao excluir agendamento:", error);
    return NextResponse.json(
      { error: "Erro ao excluir agendamento" },
      { status: 500 }
    );
  }
}
