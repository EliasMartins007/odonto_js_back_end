const Produto = require('../models/produto.model.js');

//original
exports.create_a_produto = function (req, res) {
  let new_produto = new Produto(req.body);

  //handles null error
  if (!new_produto.descricao) {
    res
      .status(400)
      .send({ error: true, message: 'please provide produto/descricao' });
  } else {
    Produto.creatProduto(new_produto, function (err, produto) {
      if (err)
        //apenas uma linha sem {}
        res.send(err);
      res.json(produto);
    });
  }
};
//fim
//

// exports.create_a_produto = (req, res, next) => {
//   try {
//     let new_produto = new Produto(req.body);

//     //handles null error
//     if (!new_produto.descricao) {
//       res
//         .status(400)
//         .send({ error: true, message: 'please provide produto/descricao' });
//     } else {
//       Produto.creatProduto(new_produto, (err, produto) => {
//         if (err)
//           //apenas uma linha sem {}
//           res.send(err);
//         res.json(produto);
//       });
//     }
//   } catch (err) {
//     console.log({ error: true, message: err.message });
//     next(err);
//   }
// };

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

exports.list_all_produto = function (req, res) {
  try {
    Produto.getAllProduto(function (err, produto) {
      //chama getAll da model
      console.log('controller');
      if (err) {
        res.send(err);
        console.log('res', produto);
      }
      res.send(produto);
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
//funcionando 15/06/2021 e sendo usada
// exports.findAll = (req, res, next) => {
//   //adicionei next 11/06/2021
//   try {
//     Produto.getAll((err, data) => {
//       if (err)
//         res.status(500).send({
//           message: err.message || 'Some error occurred produto.',
//         });
//       else res.send(data);
//     });
//   } catch (err) {
//     console.log({ error: true, message: err.message });
//     next(err);
//   }
// };
//BUSCAR TODOS OS PRODUTOS
//exports.findAll = async (req, res, next) => {
exports.findAll = (req, res, next) => {
  //adicionei next 11/06/2021 confirmar se teria aki na controller
  try {
    Produto.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || 'Some error occurred produto.',
        });
      else {
        //res.json({ data }); //original res.send(data); funcionando
        //teste 22/06/2021
        res.json({ error: false, Produto: data });
      }
    });
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};

//busca unica // tenho que add async await!!!
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
    Produto.findById(req.params.produtoId, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Produto with id ${req.params.produtoId}.`,
          });
        } else {
          res.status(500).send({
            message: 'Error retrieving Produto with id ' + req.params.produtoId,
          });
        }
      } else res.send(data); //res.json(data); ou //res.send(data); os dois funcionam
      //colocar data no json de retorno res.json({ data });
    });
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};
//outro async
// exports.listAllProducts = async (req, res) => {
//   const response = await db.query(
//     'SELECT * FROM products ORDER BY product_name ASC'
//   );
//   res.status(200).send(response.rows);
// };
//update falta 15/06/2021
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  try {
    Produto.updateById(
      req.params.produtoId,
      new Produto(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === 'not_found') {
            res.status(404).send({
              message: `Not found Produto with id ${req.params.produtoId}.`,
            });
          } else {
            res.status(500).send({
              message: 'Error updating Produto with id ' + req.params.produtoId,
            });
          }
        } else res.send(data);
      }
    );
  } catch (err) {
    console.log({ error: true, message: err.message });
  }
};
//delete
exports.delete = (req, res) => {
  Produto.remove(req.params.produtoId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found produto with id ${req.params.produtoId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete Produto with id ' + req.params.produtoId,
        });
      }
    } else res.send({ message: `Produto deleted successfully!!!` });
  });
};
