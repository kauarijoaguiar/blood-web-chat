const { Router } = require('express');

const { MensagensController } = require('../controllers/mensagens-controller');

const routes = Router();

const mensagemController = new MensagensController();

// routes.post('/:idGrupo', (req, res) => {
//     console.log("oiiii")
// });

routes.post('/:idGrupo/enviaMensagem', mensagemController.enviaMensagem);

module.exports = routes;