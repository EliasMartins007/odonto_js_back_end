module.exports = function (app) {
  const consultorio = require('../controllers/consultorio.controller.js');

  //criação
  app.post('/odonto/novoConsultorio', consultorio.create);

  //todos
  app.get('/odonto/consultorios', consultorio.findAll);

  //unico
  app.get('/odonto/consultorio/:consultorioId', consultorio.findOne);

  //atualização
  app.put('/odonto/consultorio/:consultorioId', consultorio.update);

  //delete
  app.delete('/odonto/consultorio/:consultorioId', consultorio.delete);
};
