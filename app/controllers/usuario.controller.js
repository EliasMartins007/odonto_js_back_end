const Usuario = require('../models/usuario.model.js');

//original
// exports.create_a_produto = function (req, res) {
//   let new_produto = new Produto(req.body);

//   //handles null error
//   if (!new_produto.descricao) {
//     res
//       .status(400)
//       .send({ error: true, message: 'please provide produto/descricao' });
//   } else {
//     Produto.creatProduto(new_produto, function (err, produto) {
//       if (err)
//         //apenas uma linha sem {}
//         res.send(err);
//       res.json(produto);
//     });
//   }
// };
//fim
exports.create_a_usuario = (req, res, next) => {
  try {
    let new_usuario = new Usuario(req.body);

    //handles null error
    if (!new_usuario.login_usuario || !new_usuario.senha_usuario) {
      res
        .status(400)
        .send({ error: true, message: 'please provide usuário login/senha ' });
    } else {
      Usuario.creatUsuario(new_usuario, (err, usuario) => {
        if (err)
          //apenas uma linha sem {}
          res.send(err);
        res.json(usuario);
      });
    }
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};
// // create async
// exports.create_a_produto = async (req, res) => {
//   //let new_produto = new Produto(req.body);
//   const {descricao, quantidade,
//     this.quantidade = produto.quantidade;
//     this.codigo_consultorio} = new Produto(req.body);
//   //handles null error
//   if (!new_produto.descricao) {
//     res
//       .status(400)
//       .send({ error: true, message: 'please provide produto/descricao' });
//   } else {
//     Produto.creatProduto(new_produto, function (err, produto) {
//       if (err)
//         //apenas uma linha sem {}
//         res.send(err);
//       res.json(produto);
//     });
//   }
// };
// //fi create async

exports.list_all_usuario = function (req, res) {
  try {
    //Usuario.getAllUsuario 15/06/2021 alterei para metodo com promise
    Usuario.getAll(function (err, usuario) {
      //chama getAll da model
      console.log('controller');
      if (err) {
        res.send(err);
        console.log('res', usuario);
      }
      res.send(usuario);
    });
  } catch (err) {
    console.log(err.message);
    res.json({ error: true, message: err.message });
  }
};

//outro mais moderno

//teste async de outro tutorial

// ==> Método responsável por listar todos os 'Products':
// exports.listAllProducts = async (req, res) => {
//   const response = await db.query(
//     'SELECT * FROM products ORDER BY product_name ASC'
//   );
//   res.status(200).send(response.rows);
// };
// Retrieve all Customers from the database. do exemplo async
exports.findAll = (req, res, next) => {
  //adicionei next 11/06/2021
  try {
    Usuario.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || 'Some error occurred usuário.',
        });
      else res.send(data);
    });
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};

//busca unica // tenho que add async await!!!
// Find a single  with a produtoId
exports.findOne = (req, res, next) => {
  try {
    Usuario.findById(req.params.usuarioId, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Usuário with id ${req.params.usuarioId}.`,
          });
        } else {
          res.status(500).send({
            message: 'Error retrieving Usuário with id ' + req.params.usuarioId,
          });
        }
      } else res.send(data); //res.json(data); ou //res.send(data); os dois funcionam
    });
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};
