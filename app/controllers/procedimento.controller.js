const Procedimento = require('../models/procedimento.model.js');
//teste 17/06/2021
const Consultorio = require('../models/consultorio.model.js'); //17/06
//fim teste 17/06/2021
//
exports.create_a_procedimento = (req, res, next) => {
  try {
    let new_procedimento = new Procedimento(req.body);

    //handles null error
    if (!new_procedimento.nome) {
      res
        .status(400)
        .send({ error: true, message: 'Informar procedimento/nome' });
    } else {
      Procedimento.creatProcedimento(new_procedimento, (err, procedimento) => {
        if (err) res.send(err);

        //res.json(procedimento); // original
        //silvio17/06/2021
        res.json({ procedimento }); //05/07/2021 comentado estava funcionando
        // //teste 05/07/2021
        // let jsonServico = JSON.parse(procedimento);
        // res.json(jsonServico);
        // //fim teste 05/07/2021
      });
    }
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};
// // create async
// exports.create_a_produto = async (req, res) => {
//   //let new_procedimento = new Produto(req.body);
//   const {descricao, quantidade,
//     this.quantidade = produto.quantidade;
//     this.codigo_consultorio} = newcedimentodnomeody);
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

exports.list_all_procedimento = function (req, res) {
  try {
    Procedimento.getAllProcedimento(function (err, procedimento) {
      //chama getAll da model
      console.log('controller');
      if (err) {
        res.send(err);
        console.log('res', procedimento);
      }
      res.send(procedimento);
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
// BUSCAR TODOS OS PROCEDIMENTOS
// Retrieve all Customers from the database. do exemplo async
exports.findAll = (req, res, next) => {
  //adicionei next 11/06/2021
  try {
    Procedimento.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || 'Some error occurred Procedimeno .',
        });
      else {
        //   res.send(data); // original funcionando 22/06/2021
        //teste 23/06/2021
        res.json({ error: false, Procedimento: data });
      }
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
    Procedimento.findById(req.params.procedimentoId, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Procedimeno with id ${req.params.procedimentoId}.`,
          });
        } else {
          res.status(500).send({
            message:
              'Error retrieving Procedimento with id ' +
              req.params.procedimentoId,
          });
        }
      } else res.send(data);
    });
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};
//
//
//
//silvio 17/06/2021
exports.findOne2021 = async (req, res, next) => {
  try {
    /*funcionando ate select 18/06/2021
    //const { login_usuario, senha_usuario } = req.body;
    const { procedimentoId } = req.params;
    // const consultorio = await Procedimento.findById({
    Procedimento.findById2021({
      procedimentoId,
      // consultorio,
    }).select('codigo nome'); //erro aki 18/06/2021
*/ const {
      procedimentoId,
    } = req.params; //gera erro adicionar req.params.procedimentoId

    //silvio 18/06/2021

    // Procedimento.findById2021({
    //   // procedimentoId,
    //   procedimentoId, //parametro que envio para model 18/06/2021
    // });
    // console.log({ procedimentoId }); //18/06/2021
    // /*[{label: '123'}] */
    // res.json({
    //   //17/06/2021
    //   // consultorio: consultorio.map((s) => ({ label: s.codigo, value: s.nome })),
    //   // procedimentoId: procedimentoId.map((s) => ({//18/06/2021
    //   //   label: s.codigo,
    //   //   value: s.nome,
    //   // })),
    //   //8/06/2021
    //   procedimentoId, //funcionando 18
    //   // procedimento: res[0], tras array vazio mas não gera erro 18/06/2021
    // });

    // //fim teste
    //Procedimento.findById(req.params.procedimentoId, (err, data) => {
    Procedimento.findById(req.params.procedimentoId, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Procedimeno with id ${req.params.procedimentoId}.`,
          });
        } else {
          res.status(500).send({
            message:
              'Error retrieving Procedimento with id ' +
              req.params.procedimentoId,
          });
        }
      } else res.send(data);
    });
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};

//teste funcionario 07/07/2021
exports.findFuncionario = (req, res, next) => {
  try {
    // const { procedimento } = Procedimento.findByIdFuncionario(
    // Procedimento.findByIdFuncionario(req.params.procedimentoId, (err, data) => {
    const procedimentoId = Procedimento.getAllFuncionarios((err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            //message: `Not found Procedimeno with id ${req.params.procedimentoId}.`,
          });
        } else {
          res.status(500).send({
            // message:
            //   'Error retrieving Procedimento with id ' +
            //   req.params.procedimentoId,
          });
        }
      } else {
        //res.send(data.Procedimento); // 07/07/2021
        //console.log(procedimentoId.data);
        // data.toArray();
        // res.json({ error: false, Procedimento: data }); //10/07/2021
        res.json(data); //11/07/2021 retorna array
        console.log('somente array');
        console.log(data); //11/07/2021
        // res.json({
        //   Procedimento: procedimentoId.map((s) => ({
        //     label: s.nome,
        //     value: s.codigo,
        //   })),
        // });
        // const newUserList = procedimentoId.map((s) => ({
        //   label: s.nome,
        //   value: s.codigo,
        // }));
      }
    });
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};

// exports.findAll = (req, res, next) => {
//   //adicionei next 11/06/2021
//   try {
//     Procedimento.getAll((err, data) => {
//       if (err)
//         res.status(500).send({
//           message: err.message || 'Some error occurred Procedimeno .',
//         });
//       else {
//         //   res.send(data); // original funcionando 22/06/2021
//         //teste 23/06/2021
//         res.json({ error: false, Procedimento: data });
//       }
//     });
//   } catch (err) {
//     console.log({ error: true, message: err.message });
//     next(err);
//   }
// };

///fim teste func 07/07/2021

//update 11/07/2021
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  try {
    Procedimento.updateById(
      req.params.procedimentoId,
      new Procedimento(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === 'not_found') {
            res.status(404).send({
              message: `Not found procedimento with id ${req.params.procedimentoId}.`,
            });
          } else {
            res.status(500).send({
              message:
                'Error updating procedimento with id ' +
                req.params.procedimentoId,
            });
          }
        } else res.send(data);
      }
    );
  } catch (err) {
    console.log({ error: true, message: err.message });
  }
};

//delete//delete  04/07/2021  teste async olhar se esta certo !!!
exports.delete = async (req, res, next) => {
  try {
    const as = await Procedimento.remove(
      req.params.procedimentoId,
      (err, data) => {
        if (err) {
          if (err.kind === 'not_found') {
            res.status(404).send({
              message: `Not found Procedimeno with id ${req.params.procedimentoId}.`,
            });
          } else {
            res.status(500).send({
              message:
                'Could not delete Procedimeno  with id ' +
                req.params.procedimentoId,
            });
          }
        } else
          res.send({ message: `Procedimeno  deleted successfully!!!`, as });
      }
    );
  } catch (err) {
    console.log(err);
    next(err); //04/07/2021
  }
};
