module.exports = function (app) {
  const convenio = require('../controllers/convenio.controller.js'); //('../controllers/produto.controller.js');

  //criação
  // app.post('/odonto/novoconvenio', convenio.create_a_convenio);

  //busca todos
  app.get('/odonto/convenios', convenio.findAll);

  //busca unico
  app.get('/odonto/convenio/:convenioId', convenio.findOne);

  //atualização
  // app.put('/odonto/convenio/:convenioId', convenio.update_a_convenio);

  //delete
  // app.delete('/odonto/convenio/:convenioId', convenio.delete);
};
