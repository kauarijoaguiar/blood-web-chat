const { UsuarioGrupoDAO } = require('../models/usuariogrupo');

class UsuariosgruposController {
    async mostraListagemPorUsuario(req, res) {
        const emailUsuario = req.session.usuario.email;
        const grupos = await UsuarioGrupoDAO.buscaPeloUsuario(emailUsuario);
        return res.render('usuariosgrupos/listagemPorUsuario', { grupos })
    }

}

module.exports = { UsuariosgruposController };