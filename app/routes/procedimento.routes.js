module.exports = function (app) {
  const procedimento = require('../controllers/procedimento.controller.js');

  //criação 18/06/2021 teste modelo silvio
  app.post('/odonto/novoProcedimento', procedimento.create_a_procedimento);
  // app.post('/odonto/novoProcedimento', (req, res) => {
  //   return res.json({ teste: teste });
  // });

  //busca todos
  app.get('/odonto/procedimentos', procedimento.findAll);

  //busca unico
  // app.get('/odonto/procedimento/:procedimentoId', procedimento.findOne);
  //teste obj a terminar 18/06/2021
  app.get('/odonto/procedimento/:procedimentoId', procedimento.findOne2021);
};
