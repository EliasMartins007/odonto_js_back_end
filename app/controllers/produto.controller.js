const Produto = require('../models/produto.model.js');

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

// exports.create_a_produto = (req, res, next) => {    //mudar 19/07/2021
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

//BUSCAR TODOS OS PRODUTOS
//exports.findAll = async (req, res, next) => {
exports.findAll = (req, res, next) => {
  //adicionei next confirmar se teria aki na controller
  try {
    Produto.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || 'Some error occurred produto.',
        });
      else {
        //res.json({ data }); //original res.send(data); funcionando

        res.json({ error: false, Produto: data });
      }
    });
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};

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

//update
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
exports.delete = (req, res, next) => {
  try {
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
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};
