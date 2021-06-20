module.exports = function (app) {
  const consultorio = require('../controllers/consultorio.controller.js');

  //criação
  //(POST): localhost:3009/odonto/novoConsultorio
  app.post('/odonto/novoConsultorio', consultorio.create);

  //todos
  //(GET): localhost:3009/odonto/consultorios
  app.get('/odonto/consultorios', consultorio.findAll);

  //unico
  //(GET): localhost:3009/odonto/:consultorioId
  app.get('/odonto/consultorio/:consultorioId', consultorio.findOne);

  //atualização
  //(PUT) : localhost:3009/odonto/:consultorioId
  app.put('/odonto/consultorio/:consultorioId', consultorio.update);

  //delete
  //(DELETE) : localhost:3009/odonto/:consultorioId
  app.delete('/odonto/consultorio/:consultorioId', consultorio.delete);
};
