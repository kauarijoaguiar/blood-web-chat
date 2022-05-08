const { Router } = require('express');

const { GruposController } = require('../controllers/grupos-controller');

const routes = Router();

const grupoController = new GruposController();

// routes.get('/', grupoController.list);
// routes.get('/?page', grupoController.pag);

routes.get('/', grupoController.pag);

routes.post('/cadastro', grupoController.cadastro);

routes.get('/cadastro', grupoController.mostraCadastro);

routes.get('/:idGrupo', grupoController.desc);




module.exports = routes;