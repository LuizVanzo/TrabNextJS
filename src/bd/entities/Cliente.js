class Cliente {
    constructor(codigo, nome, email, telefone, cpf, data_nascimento, ativo, data_cadastro) {
        this.codigo = codigo;
        this.nome = nome;
        this.email = email;
        this.telefone = telefone;
        this.cpf = cpf;
        this.data_nascimento = data_nascimento;
        this.ativo = ativo;
        this.data_cadastro = data_cadastro;
    }
}

module.exports = Cliente;
