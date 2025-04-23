import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { getPedidosDB, deletePedidoDB } from '@/bd/useCases/pedidoUseCases';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import Loading from '@/componentes/comuns/Loading';
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";

export const dynamic = 'force-dynamic';

export default async function Pedidos() {

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin");
    }

    const pedidos = await getPedidosDB();

    const deletePedido = async (codigo) => {
        'use server';
        try {
            await deletePedidoDB(codigo);
        } catch (err) {
            console.log('Erro: ' + err);
            throw new Error('Erro: ' + err);
        }
        redirect('/privado/pedido');
    }

    return (
        <div style={{ padding: '20px' }}>
            <Suspense fallback={<Loading />}>
                <h1>Pedidos</h1>
                <Link className='btn btn-primary'
                    href={`/privado/pedido/${0}/formulario`}>
                    <i className='bi bi-file-earmark-plus'></i> Novo
                </Link>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Ações</th>
                            <th>Código</th>
                            <th>Cliente Código</th>
                            <th>Data Pedido</th>
                            <th>Valor Total</th>
                            <th>Status</th>
                            <th>Data Entrega Prevista</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedidos.map((pedido) => (
                            <tr key={pedido.codigo}>
                                <td align="center">
                                    <Link className="btn btn-info"
                                        href={`/privado/pedido/${pedido.codigo}/formulario`}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Link>
                                    <form
                                        action={deletePedido.bind(null, pedido.codigo)}
                                        className='d-inline'>
                                        <Button variant="danger" type='submit'>
                                            <i className="bi bi-trash"></i>
                                        </Button>
                                    </form>
                                </td>
                                <td>{pedido.codigo}</td>
                                <td>{pedido.cliente_codigo}</td>
                                <td>{new Date(pedido.data_pedido).toLocaleDateString()}</td>
                                <td>{pedido.valor_total}</td>
                                <td>{pedido.status}</td>
                                <td>{pedido.data_entrega_prevista ? new Date(pedido.data_entrega_prevista).toLocaleDateString() : '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Suspense>
        </div>
    )
}