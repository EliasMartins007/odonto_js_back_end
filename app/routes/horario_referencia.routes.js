module.exports = function (app) {
  const horario_referencia = require('../controllers/horario_referencia.controller.js');

  //(POST)  criação de um horario
  app.post(
    '/odonto/novohorario',
    horario_referencia.create_a_horario_referencia
  );

  //(GET) busca todos horarios '/odonto/horarios_referencia ',
  app.get('/odonto/horarios', horario_referencia.findAll);

  // (GET) buca unico horario
  app.get('/odonto/horario/:horario_referenciaId', horario_referencia.findOne);

  //(PUT) atualização de horario
  // app.put('/odonto/horario/:horario_referenciaId', horario_referencia.update_a_horario_referencia );

  //(DELETE) delete um horario
  // app.delete('/odonto/horario/:horario_referenciaId', horario_referencia.delete);
};
