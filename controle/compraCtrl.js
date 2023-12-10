import Compra from '../modelo/compra.js';
import Fornecedor from '../modelo/fornecedor.js';


export default class CompraCtrl {

    post(req, res) {
        res.type('application/json');
        if (req.method === "POST") {
            try {
                const { fornId, qtd, valor, pag, cod } = req.body;
                if (fornId && qtd && valor && pag && cod) {
                    let fornecedor;
                    const fornecedorPromise = new Fornecedor(fornId).consultar(fornId);
                    fornecedorPromise.then((resposta) => {
                        fornecedor = resposta[0];
                        if (!fornecedor) {
                            return res.status(400).send({
                                status: false,
                                message: "O fornecedor informado é inválido!"
                            })
                        }
                        const compra = new Compra(0, fornecedor, qtd, valor, pag, cod);
                        compra.gravar().then((resposta) => {
                            return res.status(201).send({
                                status: true,
                                message: "Compra cadastrada com sucesso!",
                                data: resposta
                            })
                        }).catch((erro) => {
                            return res.status(400).send({
                                status: false,
                                message: "Erro ao cadastrar a compra!",
                                data: erro
                            })
                        })
                    }).catch((erro) => {
                        return res.status(400).send({
                            status: false,
                            message: "Erro ao consultar o fornecedor!",
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
        } else return res.status(400).send();
    }

    put(req, res) {
        res.type('application/json');
        if (req.method === "PUT") {
            try {
                const id = req.params.id
                const { fornId, qtd, valor, pag, cod } = req.body;
                if (id && fornId && qtd && valor && pag && cod) {
                    let fornecedor;
                    const fornecedorPromise = new Fornecedor(fornId).consultar();
                    fornecedorPromise.then((resposta) => {
                        fornecedor = resposta[0];
                        if (!fornecedor) {
                            return res.status(400).send({
                                status: false,
                                message: "Fornecedor informado é inválido!"
                            })
                        }
                        const compra = new Compra(id, fornecedor, qtd, valor, pag, cod);
                        const compraPromise = new Compra().atualizar(compra);
                        compraPromise.then((resposta) => {
                            return res.status(201).send({
                                status: true,
                                message: "Compra atualizada com sucesso!",
                                data: resposta
                            })
                        }).catch((erro) => {
                            return res.status(400).send({
                                status: false,
                                message: "Erro ao atualizar a compra!",
                                data: erro
                            })
                        })
                    }).catch((erro) => {
                        return res.status(400).send({
                            status: false,
                            message: "Erro ao consultar o fornecedor!",
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
                const { id } = req.body;
                if (id) {
                    const compra = new Compra(id);
                    const compraPromise = new Compra().excluir(compra);
                    compraPromise.then((resposta) => {
                        return res.status(201).send({
                            status: true,
                            message: "Compra excluída com sucesso!",
                            data: resposta
                        })
                    }).catch((erro) => {
                        return res.status(400).send({
                            status: false,
                            message: "Erro ao excluir a compra!",
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
                const compra = new Compra();
                compra.consultar(parametro).then((resposta) => {
                    return res.status(201).send({
                        status: true,
                        message: "Compra consultada com sucesso!",
                        data: resposta
                    })
                }).catch((erro) => {
                    return res.status(400).send({
                        status: false,
                        message: "Erro ao consultar a compra!",
                        data: erro
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