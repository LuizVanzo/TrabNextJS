import { NextResponse } from "next/server";
import { getUsuarioPorIdDB, updateUsuarioDB } from "@/bd/useCases/usuarioUseCases";

export async function POST(request) {
  try {
    const { userId, currentPassword, newPassword } = await request.json();

    if (!userId || !currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Todos os campos são obrigatórios." },
        { status: 400 }
      );
    }

    const usuario = await getUsuarioPorIdDB(userId);
    if (!usuario) {
      return NextResponse.json(
        { message: "Usuário não encontrado." },
        { status: 404 }
      );
    }

    if (!usuario.senha || typeof usuario.senha !== "string") {
      return NextResponse.json(
        { message: "Erro: Senha do usuário não encontrada ou inválida." },
        { status: 500 }
      );
    }

    if (currentPassword != usuario.senha) {
      return NextResponse.json(
        { message: "Senha atual incorreta." },
        { status: 401 }
      );
    }

    await updateUsuarioDB({ id: userId, senha: newPassword });

    return NextResponse.json(
      { message: "Senha alterada com sucesso." },
      { status: 200 }
    );
  } catch (err) {
    console.error("Erro ao alterar senha:", err);
    const errorMessage = err.message || "Erro desconhecido no servidor";
    return NextResponse.json(
      { message: `Erro interno do servidor: ${err}` },
      { status: 500 }
    );
  }
}