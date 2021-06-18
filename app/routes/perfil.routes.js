module.exports = function (app) {
  const perfil = require('../controllers/perfil.controller.js');

  //criação
  app.post('/odonto/novoPerfil', perfil.create_a_perfil);

  //busca todos
  app.get('/odonto/perfil', perfil.findAll);

  //busca unico
  app.get('/odonto/perfil/:perrfilId', perfil.findOne);
};
