CREATE TABLE clientes (
    codigo SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefone VARCHAR(20),
    cpf VARCHAR(14) UNIQUE,
    data_nascimento DATE,
    ativo BOOLEAN NOT NULL,
    data_cadastro DATE NOT NULL
);

CREATE TABLE pedidos (
    codigo SERIAL PRIMARY KEY,
    cliente_codigo INTEGER NOT NULL,
    data_pedido DATE NOT NULL,
    valor_total NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    data_entrega_prevista DATE,
    FOREIGN KEY (cliente_codigo) REFERENCES clientes (codigo)
);

create table usuarios (
	email varchar(50) not null primary key, 
	senha text not null, 
	tipo char(1)  not null, 
	check (tipo = 'A' or tipo = 'U'),
	telefone varchar(14)  not null, 
	nome varchar(50) not null
);

ALTER TABLE usuarios
    ADD COLUMN id VARCHAR(255) NOT NULL,          -- Adiciona a coluna id
    ADD COLUMN randomKey INTEGER,                 -- Adiciona a coluna randomKey
    ALTER COLUMN email TYPE VARCHAR(255),         -- Modifica o tipo de email
    ALTER COLUMN telefone TYPE VARCHAR(20),       -- Modifica o tipo de telefone
    ALTER COLUMN nome TYPE VARCHAR(255),          -- Modifica o tipo de nome
    ALTER COLUMN senha TYPE VARCHAR(255),         -- Modifica o tipo de senha
    DROP CONSTRAINT usuarios_pkey,                -- Remove a PK atual (email)
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id),-- Define id como nova PK
    ADD CONSTRAINT unique_email UNIQUE (email);   -- Adiciona constraint UNIQUE para email
	
ALTER TABLE usuarios
ALTER COLUMN id TYPE INTEGER USING id::integer;

insert into usuarios (email, senha, tipo, telefone, nome, id) 
values ('luizvanzo.bsi@gmail.com', '123456', 'A','(54)99999-9999','Luiz Vanzo', 1);


select * from usuarios
