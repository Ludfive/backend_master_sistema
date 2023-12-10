CREATE DATABASE sistema;
USE sistema;

CREATE TABLE catogoria(
    cat_cod INT NOT NULL AUTO_INCREMENT,
    cat_nome VARCHAR(23) NOT NULL,
    cat_descricao VARCHAR(100) NOT NULL,
    CONSTRAINT pk_categoria PRIMARY KEY(cat_cod)
);

CREATE TABLE fornecedor(
    forn_id INT NOT NULL AUTO_INCREMENT,
    forn_documento VARCHAR(20) NOT NULL, //cnpj
    forn_nome VARCHAR(23) NOT NULL,
    forn_numTel VARCHAR(20) NOT NULL,
    forn_email VARCHAR(60) NOT NULL,
    forn_site VARCHAR(60) NOT NULL,
    CONSTRAINT pk_fornecedor PRIMARY KEY(forn_id)
); 

CREATE TABLE produto(
    prod_id INT NOT NULL AUTO_INCREMENT,
    prod_nome VARCHAR(23) NOT NULL,
    prod_descricao VARCHAR(100) NOT NULL,
    prod_precoUnit DECIMAL(10,2) NOT NULL DEFAULT 0,
    prod_qtdEstoque INT NOT NULL DEFAULT 0,
    prod_marca VARCHAR(20) NOT NULL,
    prod_modelo VARCHAR(20) NOT NULL,
    prod_dataProducao DATE,
    cat_cod INT NOT NULL,
    forn_cnpj INT NOT NULL,
    CONSTRAINT pk_produto PRIMARY KEY(prod_id),
    CONSTRAINT fk_prod_categoria FOREIGN KEY(cat_cod) REFERENCES categoria(cat_cod),
    CONSTRAINT fk_prod_fornecedor FOREIGN KEY(forn_cnpj) REFERENCES fornecedor(forn_cnpj)
);

CREATE TABLE cliente(
    cli_id INT NOT NULL AUTO_INCREMENT,
    cli_documento VARCHAR(11) NOT NULL, //cpf
    cli_nome VARCHAR(20) NOT NULL,
    cli_bairro VARCHAR(20) NOT NULL,
    cli_endereco VARCHAR(20) NOT NULL,
    cli_cidade VARCHAR(20) NOT NULL,
    cli_uf VARCHAR(2) NOT NULL,
    cli_numero VARCHAR (5) NOT NULL,
    cli_cep VARCHAR(8) NOT NULL,
    CONSTRAINT pk_cliente PRIMARY KEY(cli_id)
);
CREATE TABLE compra(
    comp_id INT NOT NULL AUTO_INCREMENT,
    comp_qtd INT NOT NULL DEFAULT 0,
    comp_valor DECIMAL(10,2) NOT NULL DEFAULT 0,
    comp_fornId INT NOT NULL,
    comp_pag VARCHAR(19) NOT NULL,
    CONSTRAINT pk_compra PRIMARY KEY(comp_id),
    CONSTRAINT fk_comp_fornId FOREIGN KEY(comp_fornId) REFERENCES fornecedor (forn_id)
);

CREATE TABLE venda(
    vend_id INT NOT NULL AUTO_INCREMENT,
    vend_clienteId INT NOT NULL,
    vend_valor DECIMAL(10,2) NOT NULL DEFAULT 0,
    vend_qtd INT NOT NULL DEFAULT 0,
    vend_metPag VARCHAR(20) NOT NULL,
    CONSTRAINT pk_venda PRIMARY KEY(vend_id),
    CONSTRAINT fk_vend_clientId FOREIGN KEY(vend_clientId) REFERENCES cliente (cli_id)
);