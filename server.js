const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// //teste novo router 20/06/2021
// const odontoRouter = require('./app/routes/router.js');
// //fim teste 20/06/2021
const app = express();

//teste 15/06/2021 resolver
// const resolver = (handlerFn) => {
//   return (req, res, next) => {
//     return Promise.resolve(handlerFn(req, res, next)).catch((e) => next(e));
//   };
// };
//fim teste

// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//middlewares
app.use(cors());
//teste rotas 15/06/2021
//const OdontoRouter = require('./app/routes/produto.routes.js');
//fim midlewares

// simples route
app.post('/outros', (req, res) => {
  res.json({ message: 'teste' });
});

app.use('/teste', (req, res) => {
  res.json({ teste: 'teste' });
});
app.get('/teste2', (req, res) => {
  res.json({ teste: 'teste' });
});

//original funcionando 15/06/2021

//teste novo router 20/06/2021
//do PA 2021
require('./app/routes/consultorio.routes.js')(app); //ok get
require('./app/routes/convenio.routes.js')(app); //ok get
require('./app/routes/produto.routes.js')(app); //ok get
require('./app/routes/perfil.routes.js')(app); //ok get
require('./app/routes/procedimento.routes.js')(app); //ok get
require('./app/routes/usuario.routes.js')(app); //ok get
require('./app/routes/funcionario.routes.js')(app); //ok get
require('./app/routes/paciente.routes.js')(app); // ok get

//fim teste 20/06/2021
//require('./app/routes/horario_referencia.routes.js')(app); //ok get
// //fim teste

//teste Router 20/06/2021
//app.use(OdontoRouter);
//fim teste

const PORT = process.env.PORT || 3009;
// app.listen(PORT, async () => {
//   console.log(`back end rodando na porta: ${PORT}.`);
// });
//teste 18/06/2021
app.listen(PORT, () => {
  console.log(`back end rodando na porta: ${PORT}.`);
});
