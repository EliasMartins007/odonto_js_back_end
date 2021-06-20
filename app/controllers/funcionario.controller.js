const Funcionario = require('../models/funcionario.model.js');

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
exports.create_a_funcionario = (req, res, next) => {
  try {
    let new_funcionario = new Funcionario(req.body);

    //handles null error
    if (!new_funcionario.nome) {
      res
        .status(400)
        .send({ error: true, message: 'please provide funcionario/nome' });
    } else {
      Funcionario.creatfuncionario(new_funcionario, (err, funcionario) => {
        if (err)
          //apenas uma linha sem {}
          res.send(err);
        res.json(funcionario);
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

exports.list_all_funcionario = function (req, res) {
  try {
    Funcionario.getAllFuncionario(function (err, funcionario) {
      //chama getAll da model
      console.log('controller');
      if (err) {
        res.send(err);
        console.log('res', funcionario);
      }
      res.send(funcionario);
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
    console.log('passou aki');
    Funcionario.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || 'Some error occurred funcionario.',
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
// exports.findOne = (req, res, next) => {
//   try {
//     Produto.findById(req.params.produtoId, (err, data) => {
//       if (err) {
//         if (err.kind === 'not_found') {
//           res.status(404).send({
//             message: `Not found Produto with id ${req.params.produtoId}.`,
//           });
//         } else {
//           res.status(500).send({
//             message: 'Error retrieving Produto with id ' + req.params.produtoId,
//           });
//         }
//       } else res.send(data); //res.json(data); ou //res.send(data); os dois funcionam
//     });
//   } catch (err) {
//     console.log({ error: true, message: err.message });
//     next(err);
//   }
// };
//teste 14/06/2021
exports.findOne = (req, res, next) => {
  try {
    Funcionario.findById(req.params.funcionarioId, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Funcionario with id ${req.params.funcionarioId}.`,
          });
        } else {
          res.status(500).send({
            message:
              'Error retrieving Funcionario with id ' +
              req.params.funcionarioId,
          });
        }
      } else res.send(data); //res.json(data); ou //res.send(data); os dois funcionam
    });
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};
