const { dbcon } = require("../config/connection-db");

class Mensagem {
    constructor(id, emailusuario, dataenvio, texto, idgrupo) {
        this.id = id;
        this.emailusuario = emailusuario;
        this.dataenvio = dataenvio;
        this.texto = texto;
        this.idgrupo = idgrupo;
    }
}

class MensagemDAO {

    static async buscaMensagensGrupo(idGrupo, emailUsuarioSecao) {
        const sql = `SELECT 
            USUARIO.NOME AS NOMEUSUARIO,
            DATAENVIO, 
            TEXTO, 
            CASE EMAILUSUARIO WHEN $1 THEN 'RIGHT' ELSE 'LEFT' END AS POSICAO
            FROM MENSAGE
            LEFT JOIN USUARIO ON EMAILUSUARIO = USUARIO.EMAIL 
            WHERE IDGRUPO = $2`;
        const result = await dbcon.query(sql, [emailUsuarioSecao, idGrupo]);
        return result.rows;
    }

    static async cadastrar(mensagem) {
        const sql = `INSERT INTO MENSAGE
            (emailusuario, dataenvio, texto, idgrupo)
            VALUES($1, $2, $3, $4);`;
        const values = [mensagem.emailusuario, mensagem.dataenvio, mensagem.texto, mensagem.idgrupo];
        try {
            await dbcon.query(sql, values);
        } catch (error) {
            console.log({ error });
        }
    }
}

module.exports = {
    Mensagem,
    MensagemDAO
};