import FornecedorDAO from "../persistencia/fornecedorDAO.js";

export default class Fornecedor {
  #id;
  #documento;
  #nome;
  #numTel;
  #email;
  #site;

  constructor(
    id = "",
    documento = "",
    nome = "",
    numTel = "",
    email = "",
    site = "",
  ) {
    this.#id = id;
    this.#documento = documento.replace(/\D/g, "");
    this.#nome = nome;
    this.#numTel = numTel.replace(/\D/g, "");
    this.#email = email;
    this.#site = site;
  }

  get id() {
    return this.#id;
  }

  set id(newId) {
    this.#id = newId;
  }

  get nome() {
    return this.#nome;
  }

  set nome(novoNOme) {
    this.#nome = novoNOme;
  }

  get documento() {
    return this.#documento;
  }

  set documento(novoDocumento) {
    this.#documento = novoDocumento;
  }

  get numTel() {
    return this.#numTel;
  }

  set numTel(novoTel) {
    this.#numTel = novoTel;
  }

  get email() {
    return this.#email;
  }

  set email(novoEmail) {
    this.#email = novoEmail;
  }

  get site() {
    return this.#site;
  }

  set site(novoSite) {
    this.#site = novoSite;
  }

  toJSON() {
    return {
      id: this.#id,
      documento: this.#documento,
      nome: this.#nome,
      numTel: this.#numTel,
      email: this.#email,
      site: this.#site,
    };
  }

  async gravar() {
    const fornDAO = new FornecedorDAO();
    await fornDAO.gravar(this);
  }

  async excluir() {
    const fornDAO = new FornecedorDAO();
    await fornDAO.excluir(this);
  }

  async atualizar() {
    const fornDAO = new FornecedorDAO();
    await fornDAO.atualizar(this);
  }

  async consultar(parametro) {
    const fornDAO = new FornecedorDAO();
    return await fornDAO.consultar(parametro);
  }
}
