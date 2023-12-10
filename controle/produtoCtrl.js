import Produto from "../modelo/produto.js";
import Categoria from "../modelo/categoria.js";
import Fornecedor from "../modelo/fornecedor.js";

export default class ProdutoCtrl {
  post(req, res) {
    res.type("application/json");
    if (req.method === "POST" && req.is("application/json")) {
      try {
        const {
          nome,
          descricao,
          precoUnit,
          qtdEstoque,
          marca,
          modelo,
          dataProducao,
          categoriaCod,
          fornecedorId,
        } = req.body;
        if (
          nome &&
          descricao &&
          precoUnit &&
          qtdEstoque &&
          marca &&
          modelo &&
          dataProducao &&
          categoriaCod &&
          fornecedorId
        ) {
          let categoria, fornecedor;

          const categoriaPromise = new Categoria(categoriaCod).consultar(
            categoriaCod
          );
          const fornecedorPromise = new Fornecedor().consultar(fornecedorId);

          categoriaPromise.then((resposta) => {
            categoria = resposta[0];

            fornecedorPromise.then((resposta) => {
              fornecedor = resposta[0];

              if (!categoria || !fornecedor) {
                return res.status(400).send({
                  status: false,
                  message: "Categoria ou Fornecedor informado está inválido!",
                });
              }

              const produto = new Produto(
                0,
                nome,
                descricao,
                precoUnit,
                qtdEstoque,
                marca,
                modelo,
                dataProducao,
                categoria,
                fornecedor
              );

              produto
                .gravar()
                .then(() => {
                  res.status(200).send({
                    status: true,
                    message: "Produto cadastrado!",
                    produto,
                  });
                })
                .catch((e) => {
                  res.status(500).send({
                    status: false,
                    message: e,
                  });
                });
            });
          });
        } else {
          return res.status(400).send({
            status: false,
            message: "Por favor informe todos os dados!",
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
          "Por favor, utilize os métodos POST para cadastrar um produto!",
      });
    }
  }

  put = async (req, res) => {
    res.type("application/json");
    if (
      (req.method === "PUT" || req.method === "PATCH") &&
      req.is("application/json")
    ) {
      const {
        nome,
        descricao,
        precoUnit,
        qtdEstoque,
        marca,
        modelo,
        dataProducao,
        categoriaCod,
        fornecedorId,
      } = req.body;
      const {id} = req.params;
      if (
        id &&
        nome &&
        descricao &&
        precoUnit &&
        qtdEstoque &&
        marca &&
        modelo &&
        dataProducao &&
        categoriaCod &&
        fornecedorId
      ) {
        let categoria, fornecedor;

        const categoriaPromise = new Categoria(categoriaCod).consultar(categoriaCod);
        const fornecedorPromise = new Fornecedor().consultar(fornecedorId);

        categoriaPromise.then((resposta) => {
          categoria = resposta[0];

          fornecedorPromise.then((resposta) => {
            fornecedor = resposta[0];

            if (!categoria || !fornecedor) {
              return res.status(400).send({
                status: false,
                message: "Categoria ou Fornecedor informado é inválido!",
              });
            }

            const produto = new Produto(
              id,
              nome,
              descricao,
              precoUnit,
              qtdEstoque,
              marca,
              modelo,
              dataProducao,
              categoria,
              fornecedor
            );

            produto
              .atualizar()
              .then(() => {
                res.status(200).send({
                  status: true,
                  message: "Produto atualizado!",
                });
              })
              .catch((e) => {
                res.status(500).send({
                  status: false,
                  message: e,
                });
              });
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
          "Por favor, utilize os métodos PUT ou PATCH para atualizar um produto!",
      });
    }
  };

  delete(req, res) {
    res.type("application/json");
    if (req.method === "DELETE") {
      const { id } = req.params;
      if (id) {
        const produto = new Produto(id);
        produto
          .excluir()
          .then(() => {
            res.status(200).json({
              status: true,
              mensagem: "Produto excluído com sucesso!",
            });
          })
          .catch((erro) => {
            res.status(500).json({
              status: false,
              mensagem: "Erro ao excluir o produto:" + erro.message,
            });
          });
      } else {
        res.status(400).json({
          status: false,
          mensagem: "Por favor, informe o documento do produto!",
        });
      }
    } else {
      res.status(400).json({
        status: false,
        mensagem: "Por favor, utilize o método DELETE para excluir um produto!",
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
      } else if (id) {
        parametro = id;
      }

      const produto = new Produto();
      produto
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
