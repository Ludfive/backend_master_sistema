import Cliente from "../modelo/cliente.js";
import Venda from "../modelo/venda.js";
import conectar from "./conexao.js";


export default class VendaDAO {

    async gravar(venda) {
        if (venda instanceof Venda) {
            const sql = `INSERT INTO venda(
              vend_clienteId
              vend_valor,
              vend_qtd,
              vend_metPag,
              
            ) VALUES(?,?,?,?)`
            const parametros = [
                venda.cliente.id,
                venda.valor,
                venda.qtd,
                venda.metPag,
            ]
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            venda.id = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(venda) {
        if (venda instanceof Venda) {
            const sql = `UPDATE venda SET vend_clienteId = ?, vend_qtd = ?, vend_valor = ?, vend_metPag = ? WHERE vend_id = ?`
            const parametros = [
                venda.cliente.id,
                venda.qtd,
                venda.valor,
                venda.metPag,
                venda.code,
                venda.id
            ]
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(venda) {
        if (venda instanceof Venda) {
            const sql = `DELETE FROM venda WHERE vend_id = ?`
            const parametros = [venda.id]
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        termo = termo ?? ""

        const conexao = await conectar();
        const listaVendas = [];

        let sql;
        let parametros;

        if (termo == "") {
            sql = `
            SELECT
                v.vend_id,
                v.vend_clienteId,
                v.vend_qtd,
                v.vend_valor,
                v.vend_metPag,
    
                c.cli_id,
                c.cli_documento,
                c.cli_nome,
                c.cli_bairro,
                c.cli_endereco,
                c.cli_cidade,
                c.cli_uf,
                c.cli_numero,
                c.cli_cep
              FROM venda v
              INNER JOIN cliente c 
              ON v.vend_clienteId = c.cli_id
              ORDER BY v.vend_id
            `
        }

        else {
          sql = `
          SELECT
              v.vend_id,
              v.vend_clienteId,
              v.vend_qtd,
              v.vend_valor,
              v.vend_metPag,
    
              c.cli_id,
              c.cli_documento,
              c.cli_nome,
              c.cli_bairro,
              c.cli_endereco,
              c.cli_cidade,
              c.cli_uf,
              c.cli_numero,
              c.cli_cep
            FROM venda v
            INNER JOIN cliente c 
            ON v.vend_clienteId = c.cli_id
            ORDER BY v.vend_id
          `      
        }

        const [registros, campos] = await conexao.execute(sql, parametros);

        for (const registro of registros) {
            const cliente = new Cliente(
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

            const venda = new Venda(
                registro.vend_id,
                cliente,
                registro.vend_qtd,
                registro.vend_valor,
                registro.vend_metPag,
                regi            )

            listaVendas.push(venda.toJSON())
        }

        return listaVendas;
    }



}