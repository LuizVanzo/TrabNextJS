import { notFound, redirect } from 'next/navigation';
import { getPedidoPorCodigoDB, updatePedidoDB, addPedidoDB } from '@/bd/useCases/pedidoUseCases';
import CampoEntradaFloating from '@/componentes/comuns/CampoEntradaFloating';
import { Suspense } from 'react';
import Loading from '@/componentes/comuns/Loading';

const FormularioPage = async ({ params }) => {
    let pedido = null;
    // capturando os parametros
    const { codigo } = await params;
    if (codigo == 0) {
        pedido = { 
            codigo: 0, 
            cliente_codigo: "", 
            data_pedido: "", 
            valor_total: "", 
            status: "", 
            data_entrega_prevista: "" 
        };
    } else {
        try {
            pedido = await getPedidoPorCodigoDB(codigo);
        } catch (err) {
            return notFound();
        }
    }

    const salvarPedido = async (formData) => {
        'use server';
        const objeto = {
            codigo: formData.get('codigo'),
            cliente_codigo: formData.get('cliente_codigo'),
            data_pedido: formData.get('data_pedido'),
            valor_total: formData.get('valor_total'),
            status: formData.get('status'),
            data_entrega_prevista: formData.get('data_entrega_prevista') || null
        }
        try {
            if (objeto.codigo == 0) {
                await addPedidoDB(objeto);
            } else {
                await updatePedidoDB(objeto);
            }
        } catch (err) {
            throw new Error('Erro: ' + err);
        }
        redirect('/privado/pedido/');
    };

    return (
        <div>
            <Suspense fallback={<Loading />}>
                <div style={{ textAlign: 'center' }}>
                    <h2>Pedido</h2>
                </div>
                <form action={salvarPedido}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-6">
                                <CampoEntradaFloating 
                                    id="txtCodigo"
                                    label="Código"
                                    name="codigo" 
                                    value={pedido.codigo}
                                    tipo="number" 
                                    readOnly={true}
                                    required={false} 
                                />
                                <CampoEntradaFloating 
                                    id="txtClienteCodigo"
                                    label="Código do Cliente"
                                    name="cliente_codigo" 
                                    value={pedido.cliente_codigo}
                                    tipo="number" 
                                    readOnly={false}
                                    required={true} 
                                />
                                <CampoEntradaFloating 
                                    id="txtDataPedido"
                                    label="Data do Pedido"
                                    name="data_pedido" 
                                    value={pedido.data_pedido ? new Date(pedido.data_pedido).toISOString().split('T')[0] : ""}
                                    tipo="date" 
                                    readOnly={false}
                                    required={true} 
                                />
                                <CampoEntradaFloating 
                                    id="txtValorTotal"
                                    label="Valor Total"
                                    name="valor_total" 
                                    value={pedido.valor_total}
                                    tipo="number" 
                                    readOnly={false}
                                    required={true} 
                                    step="0.01"
                                />
                                <CampoEntradaFloating 
                                    id="txtStatus"
                                    label="Status"
                                    name="status" 
                                    value={pedido.status}
                                    tipo="text" 
                                    readOnly={false}
                                    required={true} 
                                />
                                <CampoEntradaFloating 
                                    id="txtDataEntregaPrevista"
                                    label="Data de Entrega Prevista"
                                    name="data_entrega_prevista" 
                                    value={pedido.data_entrega_prevista ? new Date(pedido.data_entrega_prevista).toISOString().split('T')[0] : ""}
                                    tipo="date" 
                                    readOnly={false}
                                    required={false} 
                                />
                                <div className="form-group text-center mt-3">
                                    <button type="submit" className="btn btn-success">
                                        Salvar <i className="bi bi-save"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Suspense>
        </div>
    )
};
export default FormularioPage;