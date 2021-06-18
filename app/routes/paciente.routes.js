module.exports = function (app) {
  const paciente = require('../controllers/paciente.controller.js'); //('../controllers/paciente.controller.js');

  //criação
  app.post('/odonto/novoPaciente', paciente.create_a_paciente);

  //busca todos
  app.get('/odonto/pacientes', paciente.findAll);

  //busca unico
  app.get('/odonto/paciente/:pacienteId', paciente.findOne);

  //atualização
  // app.put('/odonto/paciente/:pacienteId', paciente.update_a_paciente);

  //delete
  // app.delete('/odonto/paciente/:pacienteId', paciente.delete);
};
