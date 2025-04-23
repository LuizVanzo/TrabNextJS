const { pool } = require('../config');
const Pedido = require('../entities/Pedido');

const getPedidosDB = async () => {
    try {
        const { rows } = await pool.query(`
            SELECT codigo, cliente_codigo, 
            to_char(data_pedido, 'YYYY-MM-DD') as data_pedido,
            valor_total, status,
            to_char(data_entrega_prevista, 'YYYY-MM-DD') as data_entrega_prevista
            FROM pedidos
            ORDER BY codigo
        `);

        return rows.map(pedido =>
            new Pedido(pedido.codigo, pedido.cliente_codigo, pedido.data_pedido,
                pedido.valor_total, pedido.status, [], pedido.data_entrega_prevista)
        );
    } catch (err) {
        throw "Erro ao buscar pedidos: " + err;
    }
}

const addPedidoDB = async (objeto) => {
    try {
        const { cliente_codigo, data_pedido, valor_total, status, data_entrega_prevista } = objeto;
        await pool.query(`
            INSERT INTO pedidos (cliente_codigo, data_pedido, valor_total, status, data_entrega_prevista)
            VALUES ($1, $2, $3, $4, $5)
        `, [cliente_codigo, data_pedido, valor_total, status, data_entrega_prevista]);
    } catch (err) {
        throw "Erro ao inserir pedido: " + err;
    }
}

const updatePedidoDB = async (objeto) => {
    try {
        const { codigo, cliente_codigo, data_pedido, valor_total, status, data_entrega_prevista } = objeto;
        const results = await pool.query(`
            UPDATE pedidos SET cliente_codigo = $2, data_pedido = $3, valor_total = $4,
            status = $5, data_entrega_prevista = $6 WHERE codigo = $1
        `, [codigo, cliente_codigo, data_pedido, valor_total, status, data_entrega_prevista]);

        if (results.rowCount === 0) {
            throw `Nenhum pedido encontrado com o código ${codigo}`;
        }
    } catch (err) {
        throw "Erro ao atualizar pedido: " + err;
    }
}

const deletePedidoDB = async (codigo) => {
    try {
        const results = await pool.query(`DELETE FROM pedidos WHERE codigo = $1`, [codigo]);
        if (results.rowCount === 0) {
            throw `Nenhum pedido encontrado com o código ${codigo}`;
        } else {
            return "Pedido removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover pedido: " + err;
    }
}

const getPedidoPorCodigoDB = async (codigo) => {
    try {
        const results = await pool.query(`
            SELECT codigo, cliente_codigo,
            to_char(data_pedido, 'YYYY-MM-DD') as data_pedido,
            valor_total, status,
            to_char(data_entrega_prevista, 'YYYY-MM-DD') as data_entrega_prevista
            FROM pedidos
            WHERE codigo = $1
        `, [codigo]);

        if (results.rowCount === 0) {
            throw `Nenhum pedido encontrado com o código ${codigo}`;
        } else {
            const pedido = results.rows[0];
            return new Pedido(pedido.codigo, pedido.cliente_codigo, pedido.data_pedido,
                pedido.valor_total, pedido.status, [], pedido.data_entrega_prevista);
        }
    } catch (err) {
        throw "Erro ao buscar pedido: " + err;
    }
}

module.exports = {
    getPedidosDB,
    addPedidoDB,
    updatePedidoDB,
    deletePedidoDB,
    getPedidoPorCodigoDB
}
