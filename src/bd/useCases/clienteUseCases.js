const { pool } = require('../config');
const Cliente = require('../entities/Cliente');

const getClientesDB = async () => {
    try {
        const { rows } = await pool.query(`
            SELECT codigo, nome, email, telefone, cpf, 
            to_char(data_nascimento, 'YYYY-MM-DD') as data_nascimento,
            ativo, to_char(data_cadastro, 'YYYY-MM-DD') as data_cadastro
            FROM clientes
            ORDER BY codigo
        `);
        return rows.map(cliente =>
            new Cliente(cliente.codigo, cliente.nome, cliente.email,
                cliente.telefone, cliente.cpf, cliente.data_nascimento,
                cliente.ativo, cliente.data_cadastro)
        );
    } catch (err) {
        throw "Erro ao buscar clientes: " + err;
    }
}

const addClienteDB = async (objeto) => {
    try {
        const { nome, email, telefone, cpf, data_nascimento, ativo, data_cadastro } = objeto;
        await pool.query(`
            INSERT INTO clientes (nome, email, telefone, cpf, data_nascimento, ativo, data_cadastro)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [nome, email, telefone, cpf, data_nascimento, ativo, data_cadastro]);
    } catch (err) {
        throw "Erro ao inserir cliente: " + err;
    }
}

const updateClienteDB = async (objeto) => {
    try {
        const { codigo, nome, email, telefone, cpf, data_nascimento, ativo, data_cadastro } = objeto;
        const results = await pool.query(`
            UPDATE clientes SET nome = $2, email = $3, telefone = $4, cpf = $5,
            data_nascimento = $6, ativo = $7, data_cadastro = $8
            WHERE codigo = $1
        `, [codigo, nome, email, telefone, cpf, data_nascimento, ativo, data_cadastro]);

        if (results.rowCount === 0) {
            throw `Nenhum cliente encontrado com o código ${codigo}`;
        }
    } catch (err) {
        throw "Erro ao atualizar cliente: " + err;
    }
}

const deleteClienteDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM clientes WHERE codigo = $1`, [codigo]);
        if (results.rowCount === 0) {
            throw `Nenhum cliente encontrado com o código ${codigo}`;
        } else {
            return "Cliente removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover cliente: " + err;
    }
}

const getClientePorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`
            SELECT codigo, nome, email, telefone, cpf,
            to_char(data_nascimento, 'YYYY-MM-DD') as data_nascimento,
            ativo, to_char(data_cadastro, 'YYYY-MM-DD') as data_cadastro
            FROM clientes
            WHERE codigo = $1
        `, [codigo]);

        if (results.rowCount === 0) {
            throw `Nenhum cliente encontrado com o código ${codigo}`;
        } else {
            const cliente = results.rows[0];
            return new Cliente(cliente.codigo, cliente.nome, cliente.email,
                cliente.telefone, cliente.cpf, cliente.data_nascimento,
                cliente.ativo, cliente.data_cadastro);
        }
    } catch (err) {
        throw "Erro ao buscar cliente: " + err;
    }
}

module.exports = {
    getClientesDB,
    addClienteDB,
    updateClienteDB,
    deleteClienteDB,
    getClientePorCodigoDB
}
