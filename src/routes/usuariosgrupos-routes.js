const { Router } = require('express');

const { UsuariosgruposController } = require('../controllers/usuariosgrupos-controller');

const routes = Router();

const usuariogrupoController = new UsuariosgruposController();

routes.get('/listagemPorUsuario', usuariogrupoController.mostraListagemPorUsuario);

//routes.get('/:idGrupo', usuariogrupoController.deletar);

module.exports = routes;