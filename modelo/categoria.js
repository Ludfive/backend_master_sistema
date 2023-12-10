import CategoriaDAO from "../persistencia/categoriaDAO.js";

export default class Categoria {
  #cod;
  #nome;
  #descricao;

  constructor(cod = 0, nome = "", descricao = "") {
    this.#cod = cod;
    this.#nome = nome;
    this.#descricao = descricao;
  }

  get cod(){
    return this.#cod;
  }

  set cod(novoCod){
    this.#cod = novoCod;
  }
  
  get nome() {
    return this.#nome;
  }

  set nome(novoNome) {
    novoNome = this.#nome;
  }

  get descricao() {
    return this.#descricao;
  }

  set descricao(novaDescricao) {
    this.#descricao = novaDescricao;
  }

  toJSON() {
    return {
      cod: this.#cod,
      nome: this.#nome,
      descricao: this.#descricao,
    };
  }

  async gravar() {
    const catDAO = new CategoriaDAO();
    await catDAO.gravar(this);
  }

  async excluir() {
    const catDAO = new CategoriaDAO();
    await catDAO.excluir(this);
  }

  async atualizar() {
    const catDAO = new CategoriaDAO();
    await catDAO.atualizar(this);
  }

  async consultar(parametro) {
    const catDAO = new CategoriaDAO();
    return await catDAO.consultar(parametro);
  }
}
