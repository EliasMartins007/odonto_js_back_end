module.exports = function (app) {
  const funcionario = require('../controllers/funcionario.controller.js'); //('../controllers/funcionario.controller.js');
  // glaucia utili const funcionarioController aki, mas esta gerando erro !! 20/06/2021
  //criação
  //(POST): localhost:3009/odonto/novofuncionario
  app.post('/odonto/novofuncionario', funcionario.create_a_funcionario);

  // //busca todos
  // //(GET): localhost:3009/odonto/funcionarios
  app.get('/odonto/funcionarios', funcionario.findAll);

  //busca unico
  //(GET): localhost:3009/odonto/:funcionarioId
  app.get('/odonto/funcionario/:funcionarioId', funcionario.findOne);

  //atualização
  //(PUT) : localhost:3009/odonto/:funcionarioId
  app.put('/odonto/funcionario/:funcionarioId', funcionario.update); //12/07/2021

  //delete
  //(DELETE) : localhost:3009/odonto/:funcionarioId
  app.delete('/odonto/funcionario/:funcionarioId', funcionario.delete);

  //login sistema
  //http://localhost:3009/odonto/loginFuncionario
  app.post('/odonto/loginFuncionario', funcionario.LoginFuncionario); //24/07/2021
};
