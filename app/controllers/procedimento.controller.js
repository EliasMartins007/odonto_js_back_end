const Procedimento = require('../models/procedimento.model.js');
//teste 17/06/2021
const Consultorio = require('../models/consultorio.model.js'); //17/06

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
        res.json({ procedimento });
        // let jsonServico = JSON.parse(procedimento);
        // res.json(jsonServico);
      });
    }
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};

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

exports.findAll = (req, res, next) => {
  try {
    Procedimento.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || 'Some error occurred Procedimeno .',
        });
      else {
        //   res.send(data); // original funcionando 22/06/2021

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

//update
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

//delete
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
    next(err);
  }
};
