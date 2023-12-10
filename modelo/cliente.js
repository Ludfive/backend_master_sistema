import ClienteDAO from "../persistencia/clienteDAO.js";

export default class Cliente {
  #id;
  #documento;
  #nome;
  #bairro;
  #endereco;
  #cidade;
  #uf;
  #numero;
  #cep;

  constructor(
    id = 0,
    documento = "",
    nome = "",
    bairro = "",
    endereco = "",
    cidade = "",
    uf = "",
    numero = "",
    cep = ""
  ) {
    this.#id = id;
    this.#documento = documento;
    this.#nome = nome;
    this.#bairro = bairro;
    this.#endereco = endereco;
    this.#cidade = cidade;
    this.#uf = uf;
    this.#numero = numero;
    this.#cep = cep;
  }

  toJSON() {
    return {
      id: this.#id,
      documento: this.#documento,
      nome: this.#nome,
      bairro: this.#bairro,
      endereco: this.#endereco,
      cidade: this.#cidade,
      uf: this.#uf,
      numero: this.#numero,
      cep: this.#cep,
    };
  }

  get id(){
    return this.#id;
  }
  set id(novoId){
    this.#id = novoId;
  }

  get documento() {
    return this.#documento;
  }
  
  set documento(novoDoc) {
    this.#documento = novoDoc;
  }

  get nome() {
    return this.#nome;
  }
  
  set nome(novoNome) {
    this.#nome = novoNome;
  }

  get bairro() {
    return this.#bairro;
  }
  set bairro(novoBairro) {
    this.#bairro = novoBairro;
  }

  get endereco() {
    return this.#endereco;
  }
  set endereco(novoEnd) {
    this.#endereco = novoEnd;
  }

  get cidade() {
    return this.#cidade;
  }
  set cidade(novaCid) {
    this.#cidade = novaCid;
  }

  get uf() {
    return this.#uf;
  }
  set uf(novoUf) {
    this.#uf = novoUf;
  }

  get numero() {
    return this.#numero;
  }
  set numero(novoNumero) {
    this.#numero = novoNumero;
  }

  get cep() {
    return this.#cep;
  }
  set cep(novoCep) {
    this.#cep = novoCep;
  }

  async gravar() {
    const cliDAO = new ClienteDAO();
    await cliDAO.gravar(this);
  }

  async excluir() {
    const cliDAO = new ClienteDAO();
    await cliDAO.excluir(this);
  }

  async atualizar() {
    const cliDAO = new ClienteDAO();
    await cliDAO.atualizar(this);
  }

  async consultar(parametro) {
    const cliDAO = new ClienteDAO();
    return await cliDAO.consultar(parametro);
  }
}
