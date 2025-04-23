class Pedido {
    constructor(codigo, cliente_codigo, data_pedido, valor_total, status, itens, data_entrega_prevista) {
        this.codigo = codigo;
        this.cliente_codigo = cliente_codigo;
        this.data_pedido = data_pedido;
        this.valor_total = valor_total;
        this.status = status;
        this.itens = itens; // lista de itens do pedido
        this.data_entrega_prevista = data_entrega_prevista;
    }
}

module.exports = Pedido;
