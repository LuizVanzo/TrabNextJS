import { notFound, redirect } from 'next/navigation';
import { getClientePorCodigoDB, addClienteDB, updateClienteDB } from '@/bd/useCases/clienteUseCases';
import CampoEntradaFloating from '@/componentes/comuns/CampoEntradaFloating';
import { Suspense } from 'react';
import Loading from '@/componentes/comuns/Loading';

const FormularioPage = async ({ params }) => {
    let cliente = null;
    const { codigo } = await params;

    if (codigo == 0) {
        cliente = {
            codigo: 0,
            nome: "",
            email: "",
            telefone: "",
            cpf: "",
            data_nascimento: "",
            ativo: true,
            data_cadastro: new Date().toISOString().slice(0, 10),
        };
    } else {
        try {
            cliente = await getClientePorCodigoDB(codigo);
        } catch (err) {
            return notFound();
        }
    }

    const salvarCliente = async (formData) => {
        'use server';
        const objeto = {
            codigo: formData.get('codigo'),
            nome: formData.get('nome'),
            email: formData.get('email'),
            telefone: formData.get('telefone'),
            cpf: formData.get('cpf'),
            data_nascimento: formData.get('data_nascimento') || null,
            ativo: formData.get('ativo') === 'true',
            data_cadastro: formData.get('data_cadastro'),
        };

        try {
            if (objeto.codigo == 0) {
                await addClienteDB(objeto);
            } else {
                await updateClienteDB(objeto);
            }
        } catch (err) {
            throw new Error('Erro: ' + err);
        }
        redirect('/privado/cliente/');
    };

    return (
        <div>
            <Suspense fallback={<Loading />}>
                <div style={{ textAlign: 'center' }}>
                    <h2>Cliente</h2>
                </div>
                <form action={salvarCliente}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-6">
                                <CampoEntradaFloating 
                                    id="txtCodigo"
                                    label="Código"
                                    name="codigo"
                                    value={cliente.codigo}
                                    tipo="number"
                                    readOnly={true}
                                    required={false}
                                />
                                <CampoEntradaFloating 
                                    id="txtNome"
                                    label="Nome"
                                    name="nome"
                                    value={cliente.nome}
                                    tipo="text"
                                    readOnly={false}
                                    required={true}
                                />
                                <CampoEntradaFloating 
                                    id="txtEmail"
                                    label="Email"
                                    name="email"
                                    value={cliente.email}
                                    tipo="email"
                                    readOnly={false}
                                    required={false}
                                />
                                <CampoEntradaFloating 
                                    id="txtTelefone"
                                    label="Telefone"
                                    name="telefone"
                                    value={cliente.telefone}
                                    tipo="text"
                                    readOnly={false}
                                    required={false}
                                />
                                <CampoEntradaFloating 
                                    id="txtCpf"
                                    label="CPF"
                                    name="cpf"
                                    value={cliente.cpf}
                                    tipo="text"
                                    readOnly={false}
                                    required={true}
                                />
                                <CampoEntradaFloating 
                                    id="txtDataNascimento"
                                    label="Data de Nascimento"
                                    name="data_nascimento"
                                    value={cliente.data_nascimento ? new Date(cliente.data_nascimento).toISOString().split('T')[0] : ""}
                                    tipo="date"
                                    readOnly={false}
                                    required={false}
                                />
                                <CampoEntradaFloating 
                                    id="txtAtivo"
                                    label="Ativo"
                                    name="ativo"
                                    value={cliente.ativo.toString()}
                                    tipo="text"
                                    readOnly={false}
                                    required={true}
                                />
                                <CampoEntradaFloating 
                                    id="txtDataCadastro"
                                    label="Data de Cadastro"
                                    name="data_cadastro"
                                    value={cliente.data_cadastro ? new Date(cliente.data_cadastro).toISOString().split('T')[0] : ""}
                                    tipo="date"
                                    readOnly={true}
                                    required={true}
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
    );
};

export default FormularioPage;