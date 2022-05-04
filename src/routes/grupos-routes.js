const { Router } = require('express');

const { GruposController } = require('../controllers/grupos-controller');

const routes = Router();

const grupoController = new GruposController();

routes.get('/', grupoController.mostraListagemGeral);

routes.post('/cadastro', grupoController.cadastro);

routes.get('/cadastro', grupoController.mostraCadastro);

routes.get('/:idGrupo', grupoController.mostraDetalhe);




module.exports = routes;