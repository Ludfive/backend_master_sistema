import Venda from '../modelo/venda.js';
import Cliente from '../modelo/cliente.js';


export default class VendaCtrl {

    post(req, res) {
        res.type('application/json');
        if (req.method === "POST") {
            try {
                const { 
                    cliente, 
                    valor, 
                    qtd, 
                    metPag, 
                    codigo, 
                } = req.body;
                if (
                    cliente && 
                    valor && 
                    qtd && 
                    metPag && 
                    codigo
                ) {
                    let cliente;
                    const clientePromise = new Cliente(cliente).consultar(cliente);
                    clientePromise.then((resposta) => {
                        cliente = resposta[0];
                        if (!cliente) {
                            return res.status(400).send({
                                status: false,
                                message: "Cliente informado é inválido!"
                            })
                        }
                        const venda = new Venda(0, cliente, valor, qtd, metPag, codigo);
                        venda.gravar().then((resposta) => {
                            return res.status(201).send({
                                status: true,
                                message: "Venda cadastrada com sucesso!",
                                lista: resposta
                            })
                        }).catch((erro) => {
                            return res.status(400).send({
                                status: false,
                                message: "Erro ao cadastrar a Venda!",
                                data: erro
                            })
                        })
                    }).catch((erro) => {
                        return res.status(400).send({
                            status: false,
                            message: "Erro ao consultar o cliente!",
                            data: erro
                        })
                    })
                } else {
                    return res.status(400).send({
                        status: false,
                        message: "Tem dados obrigatórios que não foram preenchidos!"
                    })
                }
            } catch (e) {
                return res.status(400).send({
                    status: false,
                    message: e,
                });
            }
        } else return res.status(400).send();
    }

    put(req, res) {
        res.type('application/json');
        if (req.method === "PUT") {
            try {
                const id = req.params.id
                const { cliente, valor, qtd, metPag, codigo } = req.body;
                if (id && cliente && valor && qtd && metPag && codigo) {
                    let cliente;
                    const clientePromise = new Cliente(cliente).consultar(cliente);
                    clientePromise.then((resposta) => {
                        cliente = resposta[0];
                        if (!cliente) {
                            return res.status(400).send({
                                status: false,
                                message: "cliente informado é inválido!"
                            })
                        }
                        const venda = new Venda(id, cliente, valor, qtd, metPag, codigo);
                        const VendaPromise = venda.atualizar();
                        VendaPromise.then((resposta) => {
                            return res.status(201).send({
                                status: true,
                                message: "venda atualizada com sucesso!",
                                data: resposta
                            })
                        }).catch((erro) => {
                            return res.status(400).send({
                                status: false,
                                message: "Erro ao atualizar a venda!",
                                data: erro
                            })
                        })
                    }).catch((erro) => {
                        return res.status(400).send({
                            status: false,
                            message: "Erro ao consultar o cliente!",
                            data: erro
                        })
                    })
                } else {
                    return res.status(400).send({
                        status: false,
                        message: "Dados obrigatórios não foram preenchidos!"
                    })
                }
            } catch (e) {
                return res.status(400).send({
                    status: false,
                    message: e,
                });
            }
        }
    }

    delete(req, res) {
        res.type('application/json');
        if (req.method === "DELETE") {
            try {
                const { id } = req.params;
                if (id) {
                    const venda = new Venda(id);
                    const VendaPromise = venda.excluir();
                    VendaPromise.then((resposta) => {
                        return res.status(201).send({
                            status: true,
                            message: "venda excluída com sucesso!",
                            data: resposta
                        })
                    }).catch((erro) => {
                        return res.status(400).send({
                            status: false,
                            message: "Erro ao excluir a venda!",
                            data: erro
                        })
                    })
                } else {
                    return res.status(400).send({
                        status: false,
                        message: "Dados obrigatórios não foram preenchidos!"
                    })
                }
            } catch (e) {
                return res.status(400).send({
                    status: false,
                    message: e,
                });
            }
        }
    }

    get(req, res) {
        res.type('application/json');
        if (req.method === "GET") {
            try {
                const parametro = req.params.id ??  "";
                const venda = new Venda();
                venda.consultar(parametro).then((resposta) => {
                    return res.status(201).send({
                        status: true,
                        message: "Venda consultada com sucesso!",
                        lista: resposta
                    })
                }).catch((erro) => {
                    return res.status(400).send({
                        status: false,
                        message: "Erro ao consultar a venda!",
                        lista: erro
                    })
                })
            } catch (e) {
                return res.status(400).send({
                    status: false,
                    message: e,
                });
            }
        }
    }
}