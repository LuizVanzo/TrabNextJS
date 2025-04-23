class Usuario {
    constructor(id, nome, email, tipo, telefone, senha, randomKey) {
        this.id = id;               // Novo campo: chave primária
        this.nome = nome;
        this.email = email;
        this.tipo = tipo;
        this.telefone = telefone;
        this.senha = senha;         // Adicionado para refletir a tabela
        this.randomKey = randomKey; // Novo campo
    }
}

module.exports = Usuario;