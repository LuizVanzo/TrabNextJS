import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { getClientesDB, deleteClienteDB } from '@/bd/useCases/clienteUseCases';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import Loading from '@/componentes/comuns/Loading';
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";

const deleteCliente = async (codigo) => {
  'use server';
  try {
    await deleteClienteDB(codigo);
  } catch (err) {
    console.log('Erro: ' + err);
    throw new Error('Erro: ' + err);
  }
  redirect('/privado/cliente/');
};

// Defina a página como dinâmica para evitar cache automático
export const dynamic = 'force-dynamic';

export default async function Clientes() {

  const session = await getServerSession(authOptions);

  if (!session) {
      redirect("/api/auth/signin");
  }
  
  const clientes = await getClientesDB();

  return (
    <Suspense fallback={<Loading />}>
      <div style={{ padding: '20px' }}>
        <h1>Clientes</h1>
        <Link className="btn btn-primary" href={`/privado/cliente/${0}/formulario`}>
          <i className="bi bi-file-earmark-plus"></i> Novo
        </Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>Ações</th>
              <th>Código</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>CPF</th>
              <th>Data de Nascimento</th>
              <th>Ativo</th>
              <th>Data de Cadastro</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.codigo}>
                <td align="center">
                  <Link className="btn btn-info" href={`/privado/cliente/${cliente.codigo}/formulario`}>
                    <i className="bi bi-pencil-square"></i>
                  </Link>
                  <form action={deleteCliente.bind(null, cliente.codigo)} className="d-inline">
                    <Button variant="danger" type="submit">
                      <i className="bi bi-trash"></i>
                    </Button>
                  </form>
                </td>
                <td>{cliente.codigo}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.cpf}</td>
                <td>{cliente.data_nascimento ? new Date(cliente.data_nascimento).toLocaleDateString() : '-'}</td>
                <td>{cliente.ativo ? 'Sim' : 'Não'}</td>
                <td>{cliente.data_cadastro ? new Date(cliente.data_cadastro).toLocaleDateString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Suspense>
  );
}