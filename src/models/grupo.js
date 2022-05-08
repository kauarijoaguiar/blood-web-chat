const { dbcon } = require("../config/connection-db");
const { UsuarioGrupo, UsuarioGrupoDAO } = require('../models/usuariogrupo');

class Grupo {
    constructor(id, nome, adm, lancamento) {
        this.id = id;
        this.nome = nome;
        this.adm = adm;
        this.lancamento = lancamento;
    }
}

class GrupoDAO {
    static async listar(offset, limit) {
        const sql = 'SELECT * FROM GRUPO LIMIT $1 OFFSET $2';
        const result = await dbcon.query(sql, [limit, offset]);
        return result.rows;
    }
    static async contar() {
        const sql = 'SELECT COUNT(*) FROM GRUPO';
        const result = await dbcon.query(sql);
        return result.rows;
    }
    static async idsearch(id) {
        const sql = 'SELECT * FROM GRUPO WHERE ID = $1';
        const result = await dbcon.query(sql, [id]);
        if (result.rows[0]) {
            const grupo = new Grupo(result.rows[0].id, result.rows[0].nome, result.rows[0].adm, result.rows[0].lancamento);
            return grupo;
        } else {
            return null;
        }
    }
    static async membrogrupo() {
        const sql = `SELECT  GRUPO.NOME, COUNT(*) AS MEMBROS FROM GRUPO INNER JOIN USUARIOGRUPO ON GRUPO.ID = USUARIOGRUPO.IDGRUPO GROUP BY GRUPO.ID`;
        const result = await dbcon.query(sql);
        return result.rows;
    }

    static async cadastro(grupo) {

        const result = await dbcon.query("SELECT CASE WHEN (SELECT COUNT(*) FROM GRUPO) > 0 THEN nextval('grupo_id_seq'::regclass) ELSE 1 END AS nextval");
        const proximoId = result.rows[0].nextval;

        const sql = 'INSERT INTO GRUPO (ID, NOME, ADM, LANCAMENTO) VALUES ($1, $2, $3, $4);';
        const values = [proximoId, grupo.nome.toUpperCase(), grupo.adm, grupo.lancamento];

        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log({ error });
        }

        const usuarioGrupo = new UsuarioGrupo(null, grupo.adm, proximoId, 'admin');
        UsuarioGrupoDAO.cadastrar(usuarioGrupo);

        return proximoId;
    }

}

module.exports = {
    Grupo,
    GrupoDAO
};