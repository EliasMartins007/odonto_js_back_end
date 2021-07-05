module.exports = function (app) {
  const procedimento = require('../controllers/procedimento.controller.js');

  //criação
  //(POST): localhost:3009/odonto/novoProcedimento
  app.post('/odonto/novoProcedimento', procedimento.create_a_procedimento);

  //busca todos
  //(GET): localhost:3009/odonto/procedimentos
  app.get('/odonto/procedimentos', procedimento.findAll);

  //busca unico
  //(GET): localhost:3009/odonto/:funcionarioId
  // app.get('/odonto/procedimento/:procedimentoId', procedimento.findOne);
  //teste obj a terminar 18/06/2021
  app.get('/odonto/procedimento/:procedimentoId', procedimento.findOne2021);

  //04/07/2021
  //delete
  //(DELETE) : localhost:3009/odonto/:procedimentoId
  app.delete('/odonto/procedimento/:procedimentoId', procedimento.delete);
};
