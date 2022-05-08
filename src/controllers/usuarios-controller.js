const bcrypt = require('bcrypt');
const { Usuario, UsuarioDAO } = require('../models/usuario');


class UsuariosController {

    async cadastro(req, res) {
        const usuarioBody = req.body;
        const usuarioEcontrado = await UsuarioDAO.emailsearch(usuarioBody.email);
        if (usuarioEcontrado) {
            const msg = {};
            msg.titulo = "E-mail sendo usado";
            msg.mensagem = "Este e-mail já está sendo usado";
            return res.render('login', { msg: msg });
        } else {
            const senha = bcrypt.hashSync(usuarioBody.senha, 10);
            const usuario = new Usuario(usuarioBody.email, usuarioBody.nome, senha);
            await UsuarioDAO.cadastrar(usuario);
            req.session.usuario = usuario;
            return res.redirect('/');
        }
    }
    async login(req, res) {
        const { email, senha } = req.body;
        const usuarioEcontrado = await UsuarioDAO.emailsearch(email);
        const msg = {};
        msg.titulo = "Tente novamente";
        msg.mensagem = "Algo errado no login.";
        if (!usuarioEcontrado) {
            return res.render('login', { msg: msg });
        } else {
            const confere = bcrypt.compareSync(senha, usuarioEcontrado.senha);
            if (confere) {
                req.session.usuario = usuarioEcontrado;
                return res.redirect('/');
            } else {
                return res.render('login', { msg: msg });
            }
        }
    }
    async logout(req, res) {
        req.session.usuario = null;
        return res.redirect("usuarios/login")
    }
    async mostraLogin(req, res) {
        return res.render('login', {});
    }
    async mostraCadastro(req, res) {
        return res.render('cadastro', {});
    }
}

module.exports = { UsuariosController };