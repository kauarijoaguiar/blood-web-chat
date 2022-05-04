const { GrupoDAO } = require('../models/grupo');
const { UsuarioDAO } = require('../models/usuario');
const { UsuarioGrupo, UsuarioGrupoDAO } = require('../models/usuariogrupo');

class UsuariosgruposController {
    async mostraListagemPorUsuario(req, res) {
        const emailUsuario = req.session.usuario.email;
        const grupos = await UsuarioGrupoDAO.buscaPeloUsuario(emailUsuario);
        return res.render('usuariosgrupos/listagemPorUsuario', { grupos })
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
}

module.exports = { UsuariosgruposController };