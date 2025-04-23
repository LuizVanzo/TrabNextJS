'use client';

import { useState } from 'react';
import { salvarUsuario } from './actions'; // importa a função do arquivo separado
import CampoEntradaFloating from '@/componentes/comuns/CampoEntradaFloating';
import { Suspense } from 'react';
import Loading from '@/componentes/comuns/Loading';

const FormularioUsuario = () => {
    const [usuario, setUsuario] = useState({
        nome: '',
        email: '',
        senha: '',
        telefone: '',
        tipo: 'C',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuario((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div>
            <Suspense fallback={<Loading />}>
                <div className="text-center">
                    <h2>Cadastrar Novo Usuário</h2>
                </div>
                <form action={salvarUsuario}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-12 col-md-6">
                                <CampoEntradaFloating
                                    id="txtNome"
                                    label="Nome"
                                    name="nome"
                                    value={usuario.nome}
                                    tipo="text"
                                    onChange={handleChange}
                                    required={true}
                                />
                                <CampoEntradaFloating
                                    id="txtEmail"
                                    label="Email"
                                    name="email"
                                    value={usuario.email}
                                    tipo="email"
                                    onChange={handleChange}
                                    required={true}
                                />
                                <CampoEntradaFloating
                                    id="txtSenha"
                                    label="Senha"
                                    name="senha"
                                    value={usuario.senha}
                                    tipo="password"
                                    onChange={handleChange}
                                    required={true}
                                />
                                <CampoEntradaFloating
                                    id="txtTelefone"
                                    label="Telefone"
                                    name="telefone"
                                    value={usuario.telefone}
                                    tipo="text"
                                    onChange={handleChange}
                                    required={true}
                                />
                                <select name="tipo" className="form-select" required>
                                    <option value="">Selecione o tipo</option>
                                    <option value="A">Administrador</option>
                                    <option value="U">Usuário</option>
                                </select>
                                <div className="form-group text-center mt-3">
                                    <button type="submit" className="btn btn-success">
                                        Cadastrar <i className="bi bi-save"></i>
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

export default FormularioUsuario;
