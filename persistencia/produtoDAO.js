import Produto from "../modelo/produto.js";
import Categoria from "../modelo/categoria.js";
import conectar from "./conexao.js";
import Fornecedor from "../modelo/fornecedor";

export default class ProdutoDAO {
  async gravar(produto) {
    if (produto instanceof Produto) {
      const sql = `INSERT INTO produto(
        prod_nome, 
        prod_descricao,
        prod_precoUnit,
        prod_qtdEstoque,
        prod_marca, 
        prod_modelo, 
        prod_dataProducao, 
        cat_id, 
        forn_id) VALUES(?,?,?,?,?,?,?,?,?)`;
      const parametros = [
        produto.nome,
        produto.descricao,
        produto.precoUnit,
        produto.qtdEstoque,
        produto.marca,
        produto.modelo,
        produto.dataProducao,
        produto.categoria.id,
        produto.fornecedor.id,
      ];

      const conexao = await conectar();
      const retorno = await conexao.execute(sql, parametros);
      produto.id = retorno[0].insertId;
      global.poolConexoes.releaseConnection(conexao);
    }
  }
  async atualizar(produto) {
    if (produto instanceof Produto) {
      const sql = `UPDATE produto SET prod_nome = ?, prod_descricao = ?,
            prod_precoUnit = ?, prod_qtdEstoque = ?, prod_marca = ?, prod_modelo = ?, prod_dataProducao = ?,
            cat_id = ? , forn_id = ?
            WHERE prod_id = ?`;
      const parametros = [
        produto.nome,
        produto.descricao,
        produto.precoUnit,
        produto.qtdEstoque,
        produto.marca,
        produto.modelo,
        produto.dataProducao,
        produto.categoria.id,
        produto.fornecedor.id,
        produto.id,
      ];

      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async excluir(produto) {
    if (produto instanceof Produto) {
      const sql = `DELETE FROM produto WHERE prod_id = ?`;
      const parametros = [produto.id];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);
      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async consultar(termo) {
    termo = termo ?? ""; 

    const conexao = await conectar();
    const listaProdutos = [];

    let sql;
    let parametros;

    if (termo === "") {
      sql = `
        SELECT 
          p.prod_id, p.prod_nome, p.prod_descricao,
          p.prod_precoUnit, p.prod_qtdEstoque, p.prod_marca, 
          p.prod_modelo, p.prod_dataProducao,
          c.cat_id, c.cat_nome, c.cat_descricao,
          f.forn_id, f.forn_documento, f.forn_nome, f.forn_numTel,
          f.forn_email, f.forn_site
        FROM 
          produto p
          INNER JOIN categoria c ON p.cat_id = c.cat_id
          INNER JOIN fornecedor f ON p.forn_id = f.forn_id
        ORDER BY 
          p.prod_descricao
      `;
      parametros = [];
    } else {
      sql = `
        SELECT 
          p.prod_id, p.prod_nome, p.prod_descricao,
          p.prod_precoUnit, p.prod_qtdEstoque, p.prod_marca, 
          p.prod_modelo, p.prod_dataProducao,
          c.cat_id, c.cat_nome, c.cat_descricao,
          f.forn_id, f.forn_documento, f.forn_nome, f.forn_numTel,
          f.forn_email, f.forn_site
        FROM 
          produto p
          INNER JOIN categoria c ON p.cat_id = c.cat_id
          INNER JOIN fornecedor f ON p.forn_id = f.forn_id
        WHERE 
          ${isNaN(Number(termo)) ? "p.prod_nome LIKE ?" : "p.prod_id = ?"}
        ORDER BY 
          ${isNaN(Number(termo)) ? "p.prod_nome" : "p.prod_descricao"}
      `;
      parametros = isNaN(Number(termo)) ? [`%${termo}%`] : [termo];
    }

    const [registros, campos] = await conexao.execute(sql, parametros);

    for (const registro of registros) {
      const categoria = new Categoria(
        registro.cat_id,
        registro.cat_nome,
        registro.cat_descricao
      );
      const fornecedor = new Fornecedor(
        registro.forn_id,
        registro.forn_documento,
        registro.forn_nome,
        registro.forn_numTel,
        registro.forn_email,
        registro.forn_site,
      );
      const produto = new Produto(
        registro.prod_id,
        registro.prod_nome,
        registro.prod_descricao,
        registro.prod_precoUnit,
        registro.prod_qtdEstoque,
        registro.prod_marca,
        registro.prod_modelo,
        registro.prod_dataProducao,
        categoria,
        fornecedor
      );
      listaProdutos.push(produto);
    }

    return listaProdutos;
  }
}
