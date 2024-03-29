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

  //app.get('/odonto/paciente/:pacienteId', paciente.findOneTeste); //2806/2021

  //atualização
  //(PUT) : localhost:3009/odonto/atualizarPaciente
  app.put('/odonto/paciente/:pacienteId', paciente.update); //12/07/2021

  //delete //04/07/2021
  //(DELETE) : localhost:3009/odonto/:pacienteId
  app.delete('/odonto/paciente/:pacienteId', paciente.delete);

  //convenios  //erro 24/07/2021 busca pacienteId
  app.get('/odonto/paciente/convenios', paciente.findAllConvenios);
};
