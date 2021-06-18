const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
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
app.get('/outros', (req, res) => {
  res.json({ message: 'teste' });
});

//require('./app/routes/customer.routes.js')(app); // ok crud
//require('./app/routes/task.routes.js')(app); //ok crud
//original funcionando 15/06/2021
//require('./app/routes/consultorio.routes.js')(app); //ok get
//require('./app/routes/convenio.routes.js')(app); //ok get
require('./app/routes/produto.routes.js')(app); //ok get
//require('./app/routes/perfil.routes.js')(app); //ok get
require('./app/routes/procedimento.routes.js')(app); //ok get
//require('./app/routes/usuario.routes.js')(app); //ok get
//require('./app/routes/funcionario.routes.js')(app); //ok get
require('./app/routes/paciente.routes.js')(app); // ok get
////require('./app/routes/horario_referencia.routes.js')(app); //ok get
// //fim teste

//teste Router
//app.use(OdontoRouter);
//fim teste

const PORT = process.env.PORT || 3009;
app.listen(PORT, async () => {
  console.log(`back end rodando na porta: ${PORT}.`);
});
