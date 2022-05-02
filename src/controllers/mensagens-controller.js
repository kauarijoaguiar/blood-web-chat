const { Mensagem, MensagemDAO } = require('../models/mensagem');
class MensagensController {
    async enviaMensagem(req, res) {
        const mensagemBody = req.body;
        const { idGrupo } = req.params;
        const mensagem = new Mensagem(null, req.session.usuario.email, new Date(), mensagemBody.texto, idGrupo);
        await MensagemDAO.cadastrar(mensagem);
        res.redirect('/grupos/' + idGrupo);
    }

}

module.exports = { MensagensController };