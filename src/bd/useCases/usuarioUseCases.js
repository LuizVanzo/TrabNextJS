const { pool } = require('../config');
const Usuario = require('../entities/Usuario');

const autenticaUsuarioDB = async (objeto) => {
    try {
        const { email, senha } = objeto;
        console.log('Email: ' + email);
        
        // Busca o usuário pelo email
        const results = await pool.query(
            `SELECT * FROM usuarios WHERE email = $1`,
            [email]
        );
        

        if (results.rowCount === 0) {
            throw "Usuário ou senha inválidos";
        }
        
        const usuario = results.rows[0];
        console.log('senha ', senha);
        console.log('aaaa ',usuario.senha);

        // Verifica a senha 
        if (senha != usuario.senha) {
            throw "Usuário ou senha inválidos";
        }

        // Retorna uma instância completa do usuário
        return new Usuario(
            usuario.id,
            usuario.nome,
            usuario.email,
            usuario.tipo,
            usuario.telefone,
            usuario.senha,
            usuario.randomkey
        );
    } catch (err) {
        throw "Erro ao autenticar o usuário: " + err;
    }
};

async function getUsuarioPorIdDB(userId) {
    try {
        console.log("Buscando usuário com ID: " + userId);
        const results = await pool.query(
            `SELECT id, nome, email, senha, tipo, telefone, randomKey FROM usuarios WHERE email = $1`,
            [userId]
        );

        if (results.rowCount === 0) {
            throw "Usuário não encontrado";
        }

        const usuario = results.rows[0];
        return new Usuario(
            usuario.id,
            usuario.nome,
            usuario.email,
            usuario.tipo,
            usuario.telefone,
            usuario.senha,
            usuario.randomkey
        );
    } catch (err) {
        console.error("Erro ao buscar usuário por ID:", err);
        throw "Erro ao buscar usuário: " + err;
    }
}

async function updateUsuarioDB({ id, senha }) {
    try {
        console.log("Atualizando senha para usuário com ID: " + id);
        const results = await pool.query(
            `UPDATE usuarios SET senha = $1 WHERE email = $2 RETURNING id, nome, email, tipo, telefone, senha, randomKey`,
            [senha, id]
        );

        if (results.rowCount === 0) {
            throw "Usuário não encontrado";
        }

        const usuario = results.rows[0];
        return new Usuario(
            usuario.id,
            usuario.nome,
            usuario.email,
            usuario.tipo,
            usuario.telefone,
            usuario.senha,
            usuario.randomkey
        );
    } catch (err) {
        console.error("Erro ao atualizar usuário:", err);
        throw "Erro ao atualizar usuário: " + err;
    }
}

module.exports = {
    Usuario,
    autenticaUsuarioDB,
    getUsuarioPorIdDB,
    updateUsuarioDB,
};