import Fornecedor from "../modelo/fornecedor.js";

export default class FornecedorCtrl {
  post(req, res) {
    res.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      try {
        const { documento, nome, numTel, email, site, descricao } =
          req.body;
        if (
          documento &&
          nome &&
          numTel &&
          email &&
          site &&
          descricao
        ) {
          const fornecedor = new Fornecedor(
            0,
            documento,
            nome,
            numTel,
            email,
            site,
            descricao
          );
          fornecedor
            .gravar()
            .then(() => {
              res.status(200).send({
                status: true,
                message: "Fornecedor cadastrado!",
                fornecedor
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
    } else return res.status(400).send();
  }

  put(req, res) {
    res.type("application/json");
    if (
      (req.method === "PUT" || req.method === "PATCH") &&
      req.is("application/json")
    ) {
      const { documento } = req.params;
      const { nome, numTel, email, site, descricao } = req.body;
      if (documento && nome && numTel && email && site && descricao) {
        const fornecedor = new Fornecedor(
          0,
          documento,
          nome,
          numTel,
          email,
          site,
          descricao
        );
        fornecedor
          .atualizar()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Fornecedor atualizado com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              mensagem: "Erro ao atualizar o fornecedor:" + erro.message,
            });
          });
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Por favor, informe todos os dados!",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize os métodos PUT ou PATCH para atualizar um fornecedor!",
      });
    }
  }

  delete(req, res) {
    res.type("application/json");
    if (req.method === "DELETE") {
      const { documento } = req.params;
      if (documento) {
        const fornecedor = new Fornecedor(0, documento);
        fornecedor
          .excluir()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Fornecedor excluído com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              mensagem: "Erro ao excluir o fornecedor:" + erro.message,
            });
          });
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Por favor, informe o documento do fornecedor!",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize o método DELETE para excluir um fornecedor!",
      });
    }
  }

  get(req, res) {
    res.type("application/json");
    if (req.method === "GET") {
      const { nome } = req.query;
      const { documento } = req.params;
      let parametro = "";
      
      if (nome) {
        parametro = nome;
      } else if (documento) {
        parametro = documento;
      }

      const fornecedor = new Fornecedor();
      fornecedor
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
