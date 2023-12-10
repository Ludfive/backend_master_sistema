import ProdutoDAO from "../persistencia/produtoDAO.js";

export default class Produto {
  #id;
  #nome;
  #descricao;
  #precoUnit;
  #qtdEstoque;
  #marca;
  #modelo;
  #dataProducao;
  #categoria;
  #fornecedor;

  constructor(
    id = "",
    nome = "",
    descricao = "",
    precoUnit = 0,
    qtdEstoque = 0,
    marca = "",
    modelo = "",
    dataProducao = "",
    categoria = {},
    fornecedor = {}
  ) {
    this.#id = id;
    this.#nome = nome;
    this.#descricao = descricao;
    this.#precoUnit = precoUnit;
    this.#qtdEstoque = qtdEstoque;
    this.#marca = marca;
    this.#modelo = modelo;
    this.#dataProducao = dataProducao;
    this.#categoria = categoria;
    this.#fornecedor = fornecedor;
  }

  get id() {
    return this.#id;
  }

  set id(novoId) {
    this.#id = novoId;
  }

  get nome() {
    return this.#nome;
  }

  set nome(novoNome) {
    this.#nome = novoNome;
  }

  get descricao() {
    return this.#descricao;
  }

  set descricao(novaDescricao) {
    this.#descricao = novaDescricao;
  }

  get precoUnit() {
    return this.#precoUnit;
  }

  set precoUnit(novoPreco) {
    this.#precoUnit = novoPreco;
  }

  get qtdEstoque() {
    return this.#qtdEstoque;
  }

  set qtdEstoque(novoEstoque) {
    this.#qtdEstoque = novoEstoque;
  }

  get marca() {
    return this.#marca;
  }

  set marca(novaMarca) {
    this.#marca = novaMarca;
  }

  get modelo() {
    return this.#modelo;
  }

  set modelo(novoModelo) {
    this.#modelo = novoModelo;
  }

  get dataProducao() {
    return this.#dataProducao;
  }

  set dataProducao(novaData) {
    this.#dataProducao = novaData;
  }

  get categoria() {
    return this.#categoria;
  }

  set categoria(novaCategoria) {
    this.#categoria = novaCategoria;
  }

  get fornecedor() {
    return this.#fornecedor;
  }

  set fornecedor(novoFornecedor) {
    this.#fornecedor = novoFornecedor;
  }

  toJSON() {
    return {
      id: this.#id,
      nome: this.#nome,
      descricao: this.#descricao,
      precoUnit: this.#precoUnit,
      qtdEstoque: this.#qtdEstoque,
      marca: this.#marca,
      modelo: this.#modelo,
      dataProducao: this.#dataProducao,
      categoria: this.#categoria.toJSON(),
      fornecedor: this.#fornecedor.toJSON(),
    };
  }

  async gravar() {
    const prodDAO = new ProdutoDAO();
    await prodDAO.gravar(this);
  }

  async excluir() {
    const prodDAO = new ProdutoDAO();
    await prodDAO.excluir(this);
  }

  async atualizar() {
    const prodDAO = new ProdutoDAO();
    await prodDAO.atualizar(this);
  }

  async consultar(parametro) {
    const prodDAO = new ProdutoDAO();
    return await prodDAO.consultar(parametro);
  }
}
