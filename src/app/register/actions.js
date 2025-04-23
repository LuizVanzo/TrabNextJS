'use server';

import { createUsuarioDB } from '@/bd/useCases/usuarioUseCases';
import { redirect } from 'next/navigation';

export async function salvarUsuario(formData) {
    const objeto = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        senha: formData.get('senha'),
        telefone: formData.get('telefone'),
        tipo: formData.get('tipo'),
    };

    try {
        await createUsuarioDB(objeto);
        redirect('/'); // ou onde você quiser ir após o cadastro
    } catch (err) {
        if (err instanceof Error && err.message === 'NEXT_REDIRECT') {
            throw err; // deixa o Next.js tratar normalmente
        }
        throw new Error('Erro ao salvar usuário: ' + err);
    }
}
