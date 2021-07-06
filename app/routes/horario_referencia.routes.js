module.exports = function (app) {
  const horario_referencia = require('../controllers/horario_referenci.controller.js');

  //(POST)  criação de um horario
  app.post(
    '/odonto/novohorario_referencia ',
    horario_referencia.create_a_horario_referencia
  );

  //(GET) busca todos horarios
  app.get('/odonto/horarios_referencia ', horario_referencia.findAll);

  // (GET) buca unico horario
  app.get(
    '/odonto/horario_referencia /:horario_referencia Id',
    horario_referencia.findOne
  );

  //(PUT) atualização de horario
  // app.put('/odonto/horario_referencia /:horario_referencia Id', horario_referencia .update_a_horario_referencia );

  //(DELETE) delete um horario
  // app.delete('/odonto/horario_referencia /:horario_referencia Id', horario_referencia .delete);
};
