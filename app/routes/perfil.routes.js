module.exports = function (app) {
  const perfil = require('../controllers/perfil.controller.js');

  //criação
  //(POST): localhost:3009/odonto/novoPerfil
  app.post('/odonto/novoPerfil', perfil.create_a_perfil);

  //busca todos
  //(GET): localhost:3009/odonto/perfil
  app.get('/odonto/perfil', perfil.findAll);

  //busca unico
  //(GET): localhost:3009/odonto/:perrfilId
  app.get('/odonto/perfil/:perrfilId', perfil.findOne);
};
