import Categoria from "../modelo/categoria.js";
import conectar from "./conexao.js";

export default class CategoriaDAO {
  async gravar(categoria) {
    if (categoria instanceof Categoria) {
      const sql =
        "INSERT INTO categoria(cat_nome, cat_descricao) VALUES(?, ?)";
      const parametros = [categoria.nome, categoria.descricao];
      const conexao = await conectar();
      const retorno = await conexao.execute(sql, parametros);

      categoria.cod = retorno[0].insertCod;

      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async atualizar(categoria) {
    if (categoria instanceof Categoria) {
      const sql =
        "UPDATE categoria SET cat_nome = ?, cat_descricao = ? WHERE cat_cod = ?";
      const parametros = [categoria.nome, categoria.descricao, categoria.cod];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);

      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async excluir(categoria) {
    if (categoria instanceof Categoria) {
      const sql = "DELETE FROM categoria WHERE cat_cod = ?";
      const parametros = [categoria.cod];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);

      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async consultar(parametrosDaConsulta) {
    let sql = "";
    let parametros = [];
    if (!isNaN(parseInt(parametrosDaConsulta))) {
      sql = "SELECT * FROM categoria WHERE cat_cod = ? order by cat_nome";
      parametros = [parametrosDaConsulta];
    } else if (parametrosDaConsulta != "") {
      sql = "SELECT * FROM categoria WHERE cat_nome like ?";
      parametros = [`%${parametrosDaConsulta}%`];
    } else {
      sql = "SELECT * FROM categoria order by cat_nome";
      parametros = [""];
    }

    const conexao = await conectar();
    const [registros, campos] = await conexao.execute(sql, parametros);
    let listaCategorias = [];
    for (const registro of registros) {
      const categoria = new Categoria(
        registro.cat_cod,
        registro.cat_nome,
        registro.cat_descricao
      );
      listaCategorias.push(categoria);
    }

    return listaCategorias;
  }
}
