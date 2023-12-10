import Cliente from "../model/cliente.js";

export default class ClientController {
  post(req, res) {
    res.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      try {
        const {
          documento,
          nome,
          bairro,
          endereco,
          cidade,
          uf,
          numero,
          cep,
        } = req.body;
        if (
          documento &&
          nome &&
          bairro &&
          endereco &&
          cidade &&
          uf &&
          numero &&
          cep
        ) {
          const cliente = new Cliente(
            0,
            documento,
            nome,
            bairro,
            endereco,
            cidade,
            uf,
            numero,
            cep
          );
          cliente
            .gravar()
            .then(() => {
              res.status(200).send({
                status: true,
                message: "Cliente cadastrado!",
                cliente: cliente
              });
            })
            .catch((e) => {
              res.status(500).send({
                status: false,
                message: e,
              });
            });
        } else {
          return res.status(400).send({
            status: false,
            message: "Informe todos os dados!",
          });
        }
      } catch (e) {
        return res.status(400).send({
          status: false,
          message: e,
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize os métodos POST para cadastrar um cliente!",
      });
    }
  }

  put(req, res) {
    res.type("application/json");
    if (
      (req.method === "PUT" || req.method === "PATCH") &&
      req.is("application/json")
    ) {
      const { id } = req.params;
      const {
        documento,
        nome,
        bairro,
        endereco,
        cidade,
        uf,
        numero,
        cep,
      } = req.body;
      if (
        id &&
        documento &&
        nome &&
        bairro &&
        endereco &&
        cidade &&
        uf &&
        numero &&
        cep
      ) {
        const cliente = new Cliente(
          id,
          documento,
          nome,
          bairro,
          endereco,
          cidade,
          uf,
          numero,
          cep
        );
        cliente
          .atualizar()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Cliente atualizado com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              mensagem: "Erro ao atualizar o cliente:" + erro.message,
            });
          });
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Por favor, informe todos os dados do cliente!",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize os métodos PUT ou PATCH para atualizar um cliente!",
      });
    }
  }

  delete(req, res) {
    res.type("application/json");
    if (req.method === "DELETE") {
      const { id } = req.params;
      if (id) {
        const cliente = new Cliente(id);
        cliente
          .excluir()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Cliente excluído com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              mensagem: "Erro ao excluir o cliente:" + erro.message,
            });
          });
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Por favor, informe o id do cliente!",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método DELETE para excluir um cliente!",
      });
    }
  }

  get(req, res) {
    res.type("application/json");
    if (req.method === "GET") {
      const { nome } = req.query;
      const { id } = req.params;
      let parametro = "";

      if (nome) {
        parametro = nome;
      } else if(id){
        parametro = id;
      }

      const cliente = new Cliente();
      cliente
        .consultar(parametro)
        .then((lista) => {
          res.status(200).send({
            status: true,
            message: "Consulta realizada",
            lista: lista,
          });
        })
        .catch((e) => {
          res.status(500).send({
            status: false,
            message: e,
          });
        });
    }
  }
}
