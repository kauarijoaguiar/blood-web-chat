const { GrupoDAO } = require('../models/grupo');
const { UsuarioDAO } = require('../models/usuario');
const { UsuarioGrupo, UsuarioGrupoDAO } = require('../models/usuariogrupo');
const { MensagemDAO } = require('../models/mensagem');

class UsuariosgruposController {
    async addmembro(req, res) {
        const { idGrupo } = req.params;
        const { emailUsuario, permissao } = req.body;
        const grupo = await GrupoDAO.idsearch(idGrupo);
        const msg = {};
        if (grupo) {
            const usuario = await UsuarioDAO.emailsearch(emailUsuario);
            if (usuario) {
                const usuarioGrupo = await UsuarioGrupoDAO.seartchug(idGrupo, emailUsuario);
                if (usuarioGrupo) {
                    msg.titulo = "Usuário já inserido no grupo";
                    msg.mensagem = "Ops, este usuário já é membro do grupo!";
                    return res.render('grupos/addmembro', { msg, grupo });
                } else {
                    const usuarioGrupo = new UsuarioGrupo(null, emailUsuario, idGrupo, permissao);
                    UsuarioGrupoDAO.cadastrar(usuarioGrupo);
                    res.redirect("/");
                }
            } else {
                msg.titulo = "Não foi encontrado esse usuario";
                msg.mensagem = "Este usuário não existe";
                return res.render('grupos/addmembro', { msg, grupo });
            }

        } else {
            res.redirect("/grupos/cadastro");
        }
    }
    async listuser(req, res) {
        const emailUsuario = req.session.usuario.email;
        const grupos = await UsuarioGrupoDAO.usersearch(emailUsuario);
        return res.render('usuariosgrupos/userlist', { grupos })
    }
    async listmembro(req, res) {
        const { idGrupo } = req.params;
        const grupo = await GrupoDAO.idsearch(idGrupo);
        if (grupo) {
            return res.render('grupos/addmembro', { grupo });
        } else {
            res.redirect("/notfound");
        }
    }
    async deletar(req, res) {
        const { idGrupo, emailUsuario } = req.params;
        await UsuarioGrupoDAO.deletar(idGrupo, emailUsuario);

        return res.redirect('/grupos');
    }
}

module.exports = { UsuariosgruposController };