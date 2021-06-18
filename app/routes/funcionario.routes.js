module.exports = function (app) {
  const funcionario = require('../controllers/funcionario.controller.js'); //('../controllers/funcionario.controller.js');

  //criação
  // app.post('/odonto/novofuncionario', funcionario.create_a_funcionario);

  //busca todos
  app.get('/odonto/funcionarios', funcionario.findAll);

  //busca unico
  app.get('/odonto/funcionario/:funcionarioId', funcionario.findOne);

  //atualização
  // app.put('/odonto/funcionario/:funcionarioId', funcionario.update_a_funcionario);

  //delete
  // app.delete('/odonto/funcionario/:funcionarioId', funcionario.delete);
};
