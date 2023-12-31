import Categoria from "../modelo/categoria.js";

export default class CategoriaCtrl {
  post(req, res) {
    res.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      try {
        const { nome, descricao } = req.body;
        if (nome && descricao) {
          const categoria = new Categoria(0, nome, descricao);
          categoria
            .gravar()
            .then(() => {
              res.status(200).send({
                status: true,
                message: "Categoria já cadastrada!",
                categoria: categoria,
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
          "Por favor, utilize os métodos POST para cadastrar uma categoria!",
      });
    }
  }

  put(req, res) {
    res.type("application/json");
    if (
      (req.method === "PUT" || req.method === "PATCH") &&
      req.is("application/json")
    ) {
      const { codigo } = req.params;
      const { nome, descricao } = req.body;
      if (codigo && nome && descricao) {
        const categoria = new Categoria(codigo, nome, descricao);
        categoria
          .atualizar()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Categoria atualizada com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              mensagem: "Erro ao atualizar a categoria:" + erro.message,
            });
          });
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Por favor, informe o código e a descrição da categoria!",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize os métodos PUT ou PATCH para atualizar uma categoria!",
      });
    }
  }

  delete(req, res) {
    res.type("application/json");
    if (req.method === "DELETE") {
      const { codigo } = req.params;
      if (codigo) {
        const categoria = new Categoria(codigo);
        categoria
          .excluir()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Categoria excluída com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              mensagem: "Erro ao excluir a categoria:" + erro.message,
            });
          });
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Por favor, informe o código da categoria!",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem:
          "Por favor, utilize o método DELETE para excluir uma categoria!",
      });
    }
  }

  get(req, res) {
    res.type("application/json");
    if (req.method === "GET") {
      const { nome } = req.query;
      const { cod } = req.params;
      let parametro = "";

      if (nome) {
        parametro = nome;
      } else if (cod) {
        parametro = cod;
      }

      const categoria = new Categoria();
      categoria
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
