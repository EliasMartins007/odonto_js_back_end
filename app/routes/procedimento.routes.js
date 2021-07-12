module.exports = function (app) {
  const procedimento = require('../controllers/procedimento.controller.js');

  //criação
  //(POST): localhost:3009/odonto/novoProcedimento
  app.post('/odonto/novoProcedimento', procedimento.create_a_procedimento);

  //busca todos
  //(GET): localhost:3009/odonto/procedimentos
  app.get('/odonto/procedimentos', procedimento.findAll);

  //busca unico
  //(GET): localhost:3009/odonto/:procedimentoId
  // app.get('/odonto/procedimento/:procedimentoId', procedimento.findOne);
  app.get('/odonto/procedimento/:procedimentoId', procedimento.findOne2021);

  //para componente funcionario 07/07/2021
  app.get('/odonto/procedimentoFuncionario', procedimento.findFuncionario);
  // app.get(
  //   '/odonto/procedimentoFuncionario/:procedimentoId',
  //   procedimento.findOneFuncionario
  // );

  //atualização 11/07/2021
  //(PUT) : localhost:3009/odonto/:consultorioId
  app.put('/odonto/procedimento/:procedimentoId', procedimento.update);
  //
  //delete
  //(DELETE) : localhost:3009/odonto/:procedimentoId
  app.delete('/odonto/procedimento/:procedimentoId', procedimento.delete);
};
