const { Grupo, GrupoDAO } = require('../models/grupo');
const { MensagemDAO } = require('../models/mensagem');
const { UsuarioGrupoDAO } = require('../models/usuariogrupo');

class GruposController {
    async mostraCadastro(req, res) {
        return res.render('grupos/cadastro');
    }
    async cadastro(req, res) {
        const grupoBody = req.body;
        const grupo = new Grupo(null, grupoBody.nome, req.session.usuario.email, new Date());
        const id = await GrupoDAO.cadastrar(grupo);
        res.redirect('/grupos/' + id + '/adicionarMembro');
    }
    async mostraListagemGeral(req, res) {
        const grupos = await GrupoDAO.membrogrupo();
        return res.render('grupos/listagemGeral', { grupos })
    }
    async mostraDetalhe(req, res) {
        const { idGrupo } = req.params;
        const grupo = await GrupoDAO.idsearch(idGrupo);
        const membrosGrupo = await UsuarioGrupoDAO.seartchmg(idGrupo);
        const mensagens = await MensagemDAO.mensagens(idGrupo, req.session.usuario.email);
        const permissaoUsuarioGrupo = await UsuarioGrupoDAO.userpg(idGrupo, req.session.usuario.email);
        const usuario = req.session.usuario;
        return res.render('grupos/detalhe', { grupo, membrosGrupo, mensagens, permissaoUsuarioGrupo, usuario });
    }

    async pag(req, res) {
        let { page } = req.query;
        console.log({ page });
        if (!page) {
            page = 1;
        }
        const limit = 5;
        const offset = limit = (pag - 1);
        const grupos = await GrupoDAO.listar(offset, limit);
        const total = await GrupoDAO.contar();
        res.render('initial', { grupos: grupos, total, page });
        return
    }

}

module.exports = { GruposController };