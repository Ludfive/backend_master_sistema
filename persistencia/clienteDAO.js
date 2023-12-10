import Cliente from "../modelo/cliente.js";
import conectar from "./conexao.js";

export default class ClienteDAO {
  async gravar(cliente) {
    if (cliente instanceof Cliente) {
      const sql =
        "INSERT INTO cliente(cli_documento, cli_nome, cli_bairro, cli_endereco, cli_cidade, cli_uf, cli_numero, cli_cep) \
        VALUES(?, ?, ? , ?, ?, ?, ?, ?)";
      const parametros = [
        cliente.documento,
        cliente.nome,
        cliente.bairro,
        cliente.endereco,
        cliente.cidade,
        cliente.uf,
        cliente.numero,
        cliente.cep,
      ];
      const conexao = await conectar();
      const retorno = await conexao.execute(sql, parametros);

      cliente.id = retorno[0].insertId;

      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async atualizar(cliente) {
    if (cliente instanceof Cliente) {
      const sql =
        "UPDATE cliente SET cli_documento=?, cli_nome=?, cli_bairro=?,\
        cli_endereco=?, cli_cidade=?, cli_uf=?, cli_numero=?, cli_cep=? WHERE cli_id=?";
      const parametros = [
        cliente.documento,
        cliente.nome,
        cliente.bairro,
        cliente.endereco,
        cliente.cidade,
        cliente.uf,
        cliente.numero,
        cliente.cep,
        cliente.id,
      ];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);

      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async excluir(cliente) {
    if (cliente instanceof Cliente) {
      const sql = "DELETE FROM cliente WHERE cli_id = ?";
      const parametros = [cliente.id];
      const conexao = await conectar();
      await conexao.execute(sql, parametros);

      global.poolConexoes.releaseConnection(conexao);
    }
  }

  async consultar(parametrosDaConsulta) {
    let sql = "";
    let parametros = [];
    if (!isNaN(parseInt(parametrosDaConsulta))) {
      sql = "SELECT * FROM cliente WHERE cli_id = ? order by cli_nome";
      parametros = [parametrosDaConsulta];
    } else if (parametrosDaConsulta != "") {
      sql = "SELECT * FROM cliente WHERE cli_nome like ?";
      parametros = [`%${parametrosDaConsulta}%`];
    } else {
      sql = "SELECT * FROM cliente order by cli_nome";
      parametros = [""];
    }

    const conexao = await conectar();
    const [registros, campos] = await conexao.execute(sql, parametros);
    let listaCategorias = [];
    for (const registro of registros) {
      const categoria = new Cliente(
        registro.cli_id,
        registro.cli_documento,
        registro.cli_nome,
        registro.cli_bairro,
        registro.cli_endereco,
        registro.cli_cidade,
        registro.cli_uf,
        registro.cli_numero,
        registro.cli_cep
      );
      listaCategorias.push(categoria);
    }

    return listaCategorias;
  }
}
