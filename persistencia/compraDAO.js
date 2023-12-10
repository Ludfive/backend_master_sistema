import Compra from "../modelo/compra.js";
import conectar from "./conexao.js";
import Fornecedor from "../modelo/fornecedor.js";


export default class CompraDAO {

    async gravar(compra) {
        if (compra instanceof Compra) {
            const sql = `INSERT INTO compra(
                comp_qtd,
                comp_valor,
                comp_fornId,
                comp_pag,
            ) VALUES(?,?,?,?)`
            const parametros = [
                compra.qtd,
                compra.valor,
                compra.forn.id,
                compra.pag,
            ]
            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            compra.id = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(compra) {
        if (compra instanceof Compra) {
            const sql = `UPDATE compra SET comp_qtd = ?, comp_valor = ?,comp_fornId = ?, comp_pag = ?  WHERE comp_id = ?`
            const parametros = [
                
                compra.qtd,
                compra.valor,
                compra.fornecedor.documento,
                compra.pag,
                compra.id
            ]
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(compra) {
        if (compra instanceof Compra) {
            const sql = `DELETE FROM compra WHERE comp_id = ?`
            const parametros = [compra.id]
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        termo = termo ?? ""

        const conexao = await conectar();
        const listaCompras = [];

        let sql;
        let parametros;

        if (termo == "") {
            sql = `
                SELECT
                    c.comp_id,  
                    c.comp_qtd,
                    c.comp_valor,
                    c.comp_fornId,
                    c.comp_pag,
        ,
                    f.forn_id,
                    f.forn_documento,
                    f.forn_nome,
                    f.forn_numTel,
                    f.forn_email,
                    f.forn_site,

                FROM compra c
                INNER JOIN fornecedor f ON 
                    c.comp_fornId = f.forn_id
                ORDER BY c.comp_id
            `
        }

        else {
            sql = `
            SELECT
            c.comp_id,  
            c.comp_qtd,
            c.comp_valor,
            c.comp_fornId,
            c.comp_pag,
,
            f.forn_id,
            f.forn_documento,
            f.forn_nome,
            f.forn_numTel,
            f.forn_email,
            f.forn_site,

            FROM 
                compra c
            INNER JOIN fornecedor f ON 
                c.comp_fornId = f.forn_id
            ORDER BY 
                c.comp_id
        `            
        }

        const [registros, campos] = await conexao.execute(sql, parametros);

        for (const registro of registros) {
            const fornecedor = new Fornecedor(
                registro.forn_id,
                registro.forn_documento,
                registro.forn_nome,
                registro.forn_numTel,
                registro.forn_email,
                registro.forn_site,

            );

            const compra = new Compra(
                registro.comp_id,
                registro.comp_qtd,
                registro.comp_valor,
                fornecedor,
                registro.comp_pag,
            )

            listaCompras.push(compra.toJSON())
        }

        return listaCompras;
    }



}