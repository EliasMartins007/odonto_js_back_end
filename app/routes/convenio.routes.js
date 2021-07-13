module.exports = function (app) {
  const convenio = require('../controllers/convenio.controller.js'); //('../controllers/produto.controller.js');

  //criação
  //(POST): localhost:3009/odonto/novoconvenio
  app.post('/odonto/novoconvenio', convenio.create_a_convenio); //01/07/2021

  //busca todos
  //(GET): localhost:3009/odonto/convenios
  app.get('/odonto/convenios', convenio.findAll);
  //antes convenio.finAll valido o token midlewares   25/06/2021
  //busca unico
  //(GET): localhost:3009/odonto/convenio/:convenioId
  app.get('/odonto/convenio/:convenioId', convenio.findOne);

  //atualização
  //(PUT) : localhost:3009/odonto/convenio/:convenioId
  app.put('/odonto/convenio/:convenioId', convenio.update);

  //delete
  //(DELETE) : localhost:3009/odonto/:convenioId
  app.delete('/odonto/convenio/:convenioId', convenio.delete);
};
