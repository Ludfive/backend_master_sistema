import CompraDAO from "../persistencia/compraDAO.js"
export default class Compra {
    #id
    #quantidade
    #valor
    #fornecedor
    #metodoPag
    #cod

    constructor(
        id = "",
        quantidade = 0,
        valor = 0,
        fornecedor = {},
        metodoPag = "",
        cod = ""
    ) {
        this.#id = id
        this.#quantidade = quantidade
        this.#valor = valor
        this.#fornecedor = fornecedor
        this.#metodoPag = metodoPag
        this.#cod = cod
    }

    get id() {
        return this.#id
    }

    set id(novoId) {
        this.#id = novoId
    }

    get quantidade() {
        return this.#quantidade
    }

    set quantidade(novaQtd) {
        this.#quantidade = novaQtd
    }

    get valor() {
        return this.#valor
    }

    set valor(novoValor) {
        this.#valor = novoValor
    }   

    get fornecedor() {
        return this.#fornecedor
    }

    set fornecedor(novoFornecedor) {
        this.#fornecedor = novoFornecedor
    }

    get metodoPag() {
        return this.#metodoPag
    }   

    set metodoPag(novoPagamento) {
        this.#metodoPag = novoPagamento
    }

    get cod() {
        return this.#cod
    }

    set cod(novoCod) {
        this.#cod = novoCod
    }

    toString() {
        return `Compra: ${this.#id} - ${this.#quantidade} - ${this.#valor} - ${this.#fornecedor} - ${this.#metodoPag} - ${this.#cod}`
    }

    toJSON() {
        return {
            id: this.#id,
            quantidade: this.#quantidade,
            valor: this.#valor,
            fornecedor: this.fornecedor.toJSON(),
            metodoPag: this.#metodoPag,
            cod: this.#cod
        }
    }

    async gravar(){
        const compDAO = new CompraDAO();
        await compDAO.gravar(this);
    }

    async atualizar(){
        const compDAO = new CompraDAO();
        await compDAO.atualizar(this);
    }

    async excluir(){
        const compDAO = new CompraDAO();
        await compDAO.excluir(this);
    }

    async consultar(termo){
        const compDAO = new CompraDAO();
        const listaPurchases = await compDAO.consultar(termo);
        return listaPurchases;
    }
}