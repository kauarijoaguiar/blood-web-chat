const { Router } = require('express');

const { UsuariosgruposController } = require('../controllers/usuariosgrupos-controller');

const routes = Router();

const usuariogrupoController = new UsuariosgruposController();

routes.get('/userlist', usuariogrupoController.listuser);

routes.get('/:idGrupo/addmembro', usuariogrupoController.listmembro);

routes.post('/:idGrupo/addmembro', usuariogrupoController.addmembro);

routes.get('/:idGrupo/eliminarmembro/:emailUsuario', usuariogrupoController.deletar);

module.exports = routes;