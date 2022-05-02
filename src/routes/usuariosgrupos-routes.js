const { Router } = require('express');

const { UsuariosgruposController } = require('../controllers/usuariosgrupos-controller');

const routes = Router();

const usuariogrupoController = new UsuariosgruposController();

routes.get('/listagemPorUsuario', usuariogrupoController.mostraListagemPorUsuario);

//routes.get('/:idGrupo/adicionarMembro', usuariogrupoController.deletar);

module.exports = routes;