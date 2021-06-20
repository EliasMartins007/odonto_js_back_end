module.exports = function (app) {
  //original 15/06/2021
  const produto = require('../controllers/produto.controller.js'); //('../controllers/produto.controller.js');

  //teste elias 15/06/2021
  //const resolver = require('../adapter/handler.js');
  //fim teste elias 15/06/2021

  //
  //
  //criação19/06/2021
  //(POST): localhost:3009/odonto/novofuncionario
  app.post('/odonto/novoProduto', produto.create_a_produto);

  // busca todos async arrow function !!
  //(GET): localhost:3009/odonto/produtos
  app.get('/odonto/produtos', produto.findAll);

  //busca unico
  //(GET): localhost:3009/odonto/:produtoId
  app.get('/odonto/produto/:produtoId', produto.findOne);

  //atualização
  //(PUT) : localhost:3009/odonto/:produtoId
  app.put('/odonto/produto/:produtoId', produto.update);

  //delete
  //(DELETE) : localhost:3009/odonto/:produtoId
  app.delete('/odonto/produto/:produtoId', produto.delete);
};

/*
exporta async
module.exports = (async function() {
 const client = await MongoClient.connect(url, {
   useNewUrlParser: true
 });

  const db = client.db(mongo_db);
  return { client, db };
})();
//https://stackoverflow.com/questions/51142495/node-js-async-await-module-export
*/

// //teste async
// module.exports = (async function (app) {
// const { Router } = require('express');
// const router = Router();
//const produto = require('../controllers/produto.controller.js'); //('../controllers/produto.controller.js');

//criação
//app.post('/odonto/novoProduto', produto.create_a_produto);
//router.post('/odonto/novoProduto', produto.create_a_produto);

// busca todos
// app.get('/odonto/produtos', produto.findAll);
//router.get('/odonto/produtos', produto.findAll);

// //busca unico
// app.get('/odonto/produto/:produtoId', produto.findOne);

// //atualização
// // app.put('/odonto/produto/:produtoId', produto.update_a_produto);

// //delete
// app.delete('/odonto/produto/:produtoId', produto.delete);
// })();

// //module.exports = function (app) {
// const { Router } = require('express');
// const router = Router();

// //original 15/06/2021
// const produto = require('../controllers/produto.controller.js'); //('../controllers/produto.controller.js');

// //criação
// //app.post('/odonto/novoProduto', produto.create_a_produto);
// router.post('/odonto/novoProduto', produto.create_a_produto);
// // busca todos
// //app.get('/odonto/produtos', produto.findAll); //meu controller na minha rota
// router.get('/odonto/produtos', produto.findAll); //meu controller na minha rota
// // //busca unico
// // app.get('/odonto/produto/:produtoId', produto.findOne);
// router.get('/odonto/produto/:produtoId', produto.findOne);

// // //atualização  a implementar 15/06/2021
// // // app.put('/odonto/produto/:produtoId', produto.update_a_produto);
// //router.put('/odonto/produto/:produtoId', produto.update_a_produto);
// // //delete
// // app.delete('/odonto/produto/:produtoId', produto.delete);
// router.delete('/odonto/produto/:produtoId', produto.delete);
// //};
// module.exports = router;
