const { Grupo, GrupoDAO } = require('../models/grupo');
const { MensagemDAO } = require('../models/mensagem');
const { UsuarioGrupoDAO } = require('../models/usuariogrupo');

class GruposController {
    async cadastro(req, res) {
        const grupoBody = req.body;
        const grupo = new Grupo(null, grupoBody.nome, req.session.usuario.email, new Date());
        const id = await GrupoDAO.cadastro(grupo);
        res.redirect('/grupos/' + id + '/addmembro');
    }
    async desc(req, res) {
        const { idGrupo } = req.params;
        const grupo = await GrupoDAO.idsearch(idGrupo);
        const membrosGrupo = await UsuarioGrupoDAO.seartchmg(idGrupo);
        const permissaoUsuarioGrupo = await UsuarioGrupoDAO.userpg(idGrupo, req.session.usuario.email);
        const usuario = req.session.usuario;
        let { page } = req.query;
        console.log({ page });
        if (!page) {
            page = 1;
        }
        const limit = 10;
        const offset = limit * (page - 1);
        const mensagens = await MensagemDAO.mensagens(idGrupo, req.session.usuario.email, offset, limit);
        const total = await MensagemDAO.contarMsg(idGrupo);
        console.log(total);
        return res.render('grupos/desc', { total, grupo, membrosGrupo, mensagens, permissaoUsuarioGrupo, usuario });
    }

    async pag(req, res) {
        let { page } = req.query;
        console.log({ page });
        if (!page) {
            page = 1;
        }
        const limit = 5;
        const offset = limit * (page - 1);
        const grupos = await GrupoDAO.listar(offset, limit);
        const total = await GrupoDAO.contar();
        res.render('grupos/list', { grupos: grupos, total, page });

    }
    async mostraCadastro(req, res) {
        return res.render('grupos/cadastro');
    }
    async list(req, res) {
        const grupos = await GrupoDAO.membrogrupo();
        return res.render('grupos/list', { grupos })
    }

}

module.exports = { GruposController };