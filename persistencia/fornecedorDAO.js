import { Documento } from "../entidade/documento.js";
import Fornecedor from "../modelo/fornecedor.js";
import conectar from "./conexao.js";

export default class FornecedorDAO {
  async gravar(fornecedor) {
    if (fornecedor instanceof Fornecedor) {
      const sql =
        "INSERT INTO fornecedor(forn_documento, forn_nome, forn_numTel, forn_email, forn_site) VALUES(?, ?, ?, ?, ?)";
      const parametros = [
        fornecedor.documento,
        fornecedor.nome,
        fornecedor.numTel,
        fornecedor.email,
        fornecedor.site,
      ];
      const conexao = await conectar();
      const retorno = await conexao.execute(sql, parametros);

      fornecedor.id = retorno[0].insertId;

      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async atualizar(fornecedor) {
    if (fornecedor instanceof Fornecedor) {
      const sql =
        "UPDATE fornecedor SET forn_nome = ?, forn_numTel = ?, forn_email = ?, forn_site = ? WHERE forn_documento = ?";
      const parametros = [
        fornecedor.nome,
        fornecedor.numTel,
        fornecedor.email,
        fornecedor.site,
        fornecedor.documento,
      ];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);

      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async excluir(fornecedor) {
    if (fornecedor instanceof Fornecedor) {
      const sql = "DELETE FROM fornecedor WHERE forn_documento = ?";
      const parametros = [fornecedor.document];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);

      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async consultar(parametrosDaConsulta) {
    let sql = "";
    let parametros = [];
    if (parametrosDaConsulta && !isNaN(parametrosDaConsulta)) {
      sql = "SELECT * FROM fornecedor WHERE forn_id = ? order by forn_nome";
      parametros = [parametrosDaConsulta];
    } else if (parametrosDaConsulta != "") {
      sql = "SELECT * FROM fornecedor WHERE forn_nome like ?";
      parametros = [`%${parametrosDaConsulta}%`];
    } else {
      sql = "SELECT * FROM fornecedor order by forn_nome";
      parametros = [""];
    }

    const conexao = await conectar();
    const [registros, campos] = await conexao.execute(sql, parametros);
    let listaFornecedores = [];
    for (const registro of registros) {
      const fornecedor = new Fornecedor(
        registro.forn_id,
        registro.forn_documento,
        registro.forn_nome,
        registro.forn_numTel,
        registro.forn_email,
        registro.forn_site,
      );
      listaFornecedores.push(fornecedor);
    }

    return listaFornecedores;
  }
}
