const Funcionario = require('../models/funcionario.model.js');

// exports.create_a_funcionario = (req, res, next) => {
//   try {
//     let new_funcionario = new Funcionario(req.body);

//     //handles null error
//     if (!new_funcionario.nome) {
//       res
//         .status(400)
//         .send({ error: true, message: 'please provide funcionario/nome' });
//     } else {
//       Funcionario.creatfuncionario(new_funcionario, (err, funcionario) => {
//         if (err)
//           //apenas uma linha sem {}
//           res.send(err);
//         res.json(funcionario);
//       });
//     }
//   } catch (err) {
//     console.log({ error: true, message: err.message });
//     next(err);
//   }
// };
//  mudar para create async 04/07/2021 testar
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
        //res.json(funcionario ); //original
        res.json({ funcionario });
      });
    }
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};
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
    console.log('passou aki'); //passando em loop aki 24/06/2021
    Funcionario.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || 'Some error occurred funcionario.',
        });
      else {
        //res.send(data); //original funcionando 22/06/2021
        //teste 23/06/2021
        res.json({ error: false, Funcionario: data });
      }
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

//delete 04/07/2021
exports.delete = async (req, res, next) => {
  try {
    const new_funcionario = await Funcionario.remove(
      req.params.funcionarioId,
      (err, data) => {
        if (err) {
          if (err.kind === 'not_found') {
            res.status(404).send({
              message: `NOT found funcionario with id ${req.params.funcionarioId}.`,
            });
          } else {
            res.status(500).send({
              message: `Could not delete funcionario whit id ${req.params.funcionarioId}`,
            });
          }
        } else {
          res.send({
            message: 'funcionario deleted successfully!!!',
            new_funcionario,
          }); //04/07/2021
        }
      }
    );
  } catch (err) {
    console.log('erro delete controller', err);
    next(err);
  }
};
