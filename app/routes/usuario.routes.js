module.exports = function (app) {
  const usuario = require('../controllers/usuario.controller.js'); //('../controllers/produto.controller.js');

  //criação
  app.post('/odonto/novoUsuario', usuario.create_a_usuario);

  //busca todos
  app.get('/odonto/usuarios', usuario.findAll);

  //busca unico
  app.get('/odonto/usuario/:usuarioId', usuario.findOne);

  //atualização
  // app.put('/odonto/usuario/:usuarioId', usuario.update_a_usuario);

  //delete
  // app.delete('/odonto/usuario/:usuarioId', usuario.delete);
};
