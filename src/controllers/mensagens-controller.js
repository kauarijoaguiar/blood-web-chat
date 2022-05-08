const { Mensagem, MensagemDAO } = require('../models/mensagem');
class MensagensController {
    async enviaMensagem(req, res) {
        const mensagemBody = req.body;
        const { idGrupo } = req.params;
        const mensagem = new Mensagem(null, req.session.usuario.email, new Date(), mensagemBody.texto, idGrupo);
        await MensagemDAO.cadastrar(mensagem);
        res.redirect('/grupos/' + idGrupo);
    }

    // async paginamensagens(req, res) {
    //     let { page } = req.query;
    //     const { idGrupo } = req.params;
    //     console.log("poiiiiiiiiiiiiiiiiiiiii");
    //     const total = await MensagemDAO.contarMsg(idGrupo);
    //     console.log({ page });
    //     console.log(total);
    //     if (!page) {
    //         page = 1;
    //     }
    //     const limit = 10;
    //     const offset = limit * (page - 1);
    //     const grupos = await MensagemDAO.listarMsg(offset, limit);
    //     res.render('grupos/detalhe', { grupos: grupos, total, page });

    // }
}

module.exports = { MensagensController };