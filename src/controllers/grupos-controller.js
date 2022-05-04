const { Grupo, GrupoDAO } = require('../models/grupo');
const { MensagemDAO } = require('../models/mensagem');
const { UsuarioDAO } = require('../models/usuario');
const { UsuarioGrupo, UsuarioGrupoDAO } = require('../models/usuariogrupo');

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
    async mostraAdicionarMembro(req, res) {
        const { idGrupo } = req.params;
        const grupo = await GrupoDAO.buscaPeloId(idGrupo);
        if (grupo) {
            return res.render('grupos/adicionarMembro', { grupo });
        } else {
            res.redirect("/notfound");
        }
    }
    async adicionaMembro(req, res) {
        const { idGrupo } = req.params;
        const { emailUsuario, permissao } = req.body;
        const grupo = await GrupoDAO.buscaPeloId(idGrupo);
        const msg = {};
        if (grupo) {
            const usuario = await UsuarioDAO.buscaPeloEmail(emailUsuario);
            if (usuario) {
                const usuarioGrupo = await UsuarioGrupoDAO.buscaUsuarioGrupo(idGrupo, emailUsuario);
                if (usuarioGrupo) {
                    msg.titulo = "Usuário já inserido no grupo";
                    msg.mensagem = "Ops, este usuário já é membro do grupo!";
                    return res.render('grupos/adicionarMembro', { msg, grupo });
                } else {
                    const usuarioGrupo = new UsuarioGrupo(null, emailUsuario, idGrupo, permissao);
                    UsuarioGrupoDAO.cadastrar(usuarioGrupo);
                    res.redirect("/");
                }
            } else {
                msg.titulo = "Não foi encontrado esse usuario";
                msg.mensagem = "Este usuário não existe";
                return res.render('grupos/adicionarMembro', { msg, grupo });
            }

        } else {
            res.redirect("/grupos/cadastro");
        }
    }

    async mostraListagemGeral(req, res) {
        const grupos = await GrupoDAO.buscaTodosComMembros();
        return res.render('grupos/listagemGeral', { grupos })
    }

    async mostraDetalhe(req, res) {
        const { idGrupo } = req.params;
        const grupo = await GrupoDAO.buscaPeloId(idGrupo);
        const membrosGrupo = await UsuarioGrupoDAO.buscaMembrosDoGrupo(idGrupo);
        const mensagens = await MensagemDAO.buscaMensagensGrupo(idGrupo, req.session.usuario.email);
        const permissaoUsuarioGrupo = await UsuarioGrupoDAO.buscarPermissaoUsuarioGrupo(idGrupo, req.session.usuario.email);
        return res.render('grupos/detalhe', { grupo, membrosGrupo, mensagens, permissaoUsuarioGrupo });
    }

}

module.exports = { GruposController };