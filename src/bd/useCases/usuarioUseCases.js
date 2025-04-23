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

async function createUsuarioDB(dados) {
    try {
        const { nome, email, senha, tipo, telefone } = dados;

        const existe = await pool.query(`SELECT 1 FROM usuarios WHERE email = $1`, [email]);
        if (existe.rowCount > 0) {
            throw "Email já cadastrado";
        }

        // Busca o maior ID atual e incrementa manualmente
        const resultadoId = await pool.query(`SELECT COALESCE(MAX(id), 0) + 1 AS proximoId FROM usuarios`);
        const proximoId = resultadoId.rows[0].proximoid;

        const result = await pool.query(
            `INSERT INTO usuarios (id, nome, email, senha, tipo, telefone)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING id, nome, email, tipo, telefone, senha, randomKey`,
            [proximoId, nome, email, senha, tipo, telefone]
        );

        const usuario = result.rows[0];
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
        console.error("Erro ao criar usuário:", err);
        throw "Erro ao criar usuário: " + err;
    }
}


module.exports = {
    Usuario,
    autenticaUsuarioDB,
    getUsuarioPorIdDB,
    updateUsuarioDB,
    createUsuarioDB,
};