module.exports = function (app) {
  const usuario = require('../controllers/usuario.controller.js'); //('../controllers/produto.controller.js');

  //criação
  //(POST): localhost:3009/odonto/novofuncionario
  app.post('/odonto/novoUsuario', usuario.create_a_usuario);

  //busca todos
  //(GET): localhost:3009/odonto/usuarios
  app.get('/odonto/usuarios', usuario.findAll);

  //busca unico
  //(GET): localhost:3009/odonto/:usuarioId
  app.get('/odonto/usuario/:usuarioId', usuario.findOne);

  //atualização
  //(PUT) : localhost:3009/odonto/:usuarioId
  // app.put('/odonto/usuario/:usuarioId', usuario.update_a_usuario);

  //delete
  //(DELETE) : localhost:3009/odonto/:usuarioId
  // app.delete('/odonto/usuario/:usuarioId', usuario.delete);
};
