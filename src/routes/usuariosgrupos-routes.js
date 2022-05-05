const { Router } = require('express');

const { UsuariosgruposController } = require('../controllers/usuariosgrupos-controller');

const routes = Router();

const usuariogrupoController = new UsuariosgruposController();

routes.get('/listagemPorUsuario', usuariogrupoController.mostraListagemPorUsuario);

routes.get('/:idGrupo/adicionarMembro', usuariogrupoController.mostraAdicionarMembro);

routes.post('/:idGrupo/adicionarMembro', usuariogrupoController.adicionaMembro);

routes.get('/:idGrupo/eliminarmembro/:emailUsuario', usuariogrupoController.deletar);

module.exports = routes;