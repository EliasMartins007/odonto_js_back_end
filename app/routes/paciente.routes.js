module.exports = function (app) {
  const paciente = require('../controllers/paciente.controller.js'); //('../controllers/paciente.controller.js');

  //criação
  //(POST): localhost:3009/odonto/novoPaciente
  app.post('/odonto/novoPaciente', paciente.create_a_paciente);

  //busca todos
  //(GET): localhost:3009/odonto/pacientes
  app.get('/odonto/pacientes', paciente.findAll);

  //busca unico
  //(GET): localhost:3009/odonto/:pacienteId
  app.get('/odonto/paciente/:pacienteId', paciente.findOne);

  //atualização
  //(PUT) : localhost:3009/odonto/atualizarPaciente
  // app.put('/odonto/paciente/:pacienteId', paciente.update_a_paciente);

  //delete
  //(DELETE) : localhost:3009/odonto/:pacienteId
  // app.delete('/odonto/paciente/:pacienteId', paciente.delete);
};
