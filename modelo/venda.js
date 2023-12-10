import VendaDAO from "../persistencia/vendaDAO.js"

export default class Venda {
    #id
    #cliente
    #valor
    #qtd
    #metPag
    #codigo

    constructor(
        id = "",
        cliente = {},
        valor = 0,
        qtd = 0,
        metPag = "",
        codigo = ""
    ) {
        this.#id = id
        this.#cliente = cliente
        this.#valor = valor
        this.#qtd = qtd
        this.#metPag = metPag
        this.#codigo = codigo
    }

    get id() {
        return this.#id
    }

    set id(novoId) {
        this.#id = novoId
    }

    get cliente() {
        return this.#cliente
    }

    set cliente(novoCliente) {
        this.#cliente = novoCliente
    }

    get valor() {
        return this.#valor
    }

    set valor(novoValor) {
        this.#valor = novoValor
    }

    get qtd() {
        return this.#qtd
    }

    set qtd(novaQtd) {
        this.#qtd = novaQtd
    }   

    get metPag() {
        return this.#metPag
    }   

    set metPag(novoPag) {
        this.#metPag = novoPag
    }

    get codigo() {
        return this.#codigo
    }

    set codigo(novoCod) {
        this.#codigo = novoCod
    }

    toString() {
        return `Venda: ${this.#id} - ${this.#cliente} - ${this.#valor} - ${this.#qtd} - ${this.#metPag} - ${this.#codigo}`
    }

    toJSON() {
        return {
            id: this.#id,
            cliente: this.cliente.toJSON(),
            valor: this.#valor,
            qtd: this.#qtd,
            metPag: this.#metPag,
            codigo: this.#codigo
        }
    }

    async gravar(){
        const vendDAO = new VendaDAO();
        await vendDAO.gravar(this);
    }

    async atualizar(){
        const vendDAO = new VendaDAO();
        await vendDAO.atualizar(this);
    }

    async excluir(){
        const vendDAO = new VendaDAO();
        await vendDAO.excluir(this);
    }

    async consultar(termo){
        const vendDAO = new VendaDAO();
        const listaVenda = await vendDAO.consultar(termo);
        return listaVenda;
    }
}