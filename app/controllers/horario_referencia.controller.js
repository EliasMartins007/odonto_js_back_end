const Horario_referencia = require('../models/horario_referencia.model.js');

//original
//CRIAÇÃO NOVO HORARIO
//(POST)
//exports.create_a_horario_referencia = function (req, res) { 08/078
exports.create_a_horario_referencia = (req, res, next) => {
  try {
    let new_horario_referencia = new Horario_referencia(req.body); //campos da minha requisição de inclusão de novo registro

    //handles null error
    if (!new_horario_referencia.hora_atendimento) {
      //alterar para data_atendimento 08/07/2021
      res.status(400).send({
        error: true,
        message: 'please provide horario_referencia/codigo !!!',
      });
    } else {
      Horario_referencia.creatHorario_referencia(
        new_horario_referencia,
        function (err, horario_referencia) {
          if (err) res.send(err);
          res.json(horario_referencia);
        }
      );
    }
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err); //08/07/2021
  }
};

//BUSCA TODOS OS HORARIO
//(GET)
exports.findAll = (req, res, next) => {
  //adicionei next 11/06/2021
  try {
    Horario_referencia.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || 'Some error occurred horario_referencia.',
        });
      else {
        //res.send(data);} original 07/07/2021
        res.json({ error: false, Horario: data }); //07/07/2021
      }
    });
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};

//BUSCA HORARIO UNICO
//(GET)
exports.findOne = (req, res, next) => {
  try {
    //Horario_referencia.findById(
    const horario = Horario_referencia.findById(
      //08/07/2021
      req.params.horario_referenciaId,
      (err, data) => {
        if (err) {
          if (err.kind === 'not_found') {
            res.status(404).send({
              message: `Not found Horario_referenciawith id ${req.params.horario_referenciaId}.`,
            });
          } else {
            res.status(500).send({
              message:
                'Error retrieving Horario_referencia with id ' +
                req.params.horario_referenciaId,
            });
          }
        } else {
          //res.send(data); //res.json(data); ou //res.send(data); os dois funcionam
          res.json({ error: false, Horario: data }); //07/07/2021
          // console.log(horario); //08/7/2021
          // res.json({ horario }); //08/07/2021
        }
      }
    );
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};

//UPDATE
//
//DELETE 08/07/2021
exports.delete = (req, res, next) => {
  try {
    Horario_referencia.remove(req.params.horarioId, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Horario width id ${req.params.horarioId}.`,
          });
        } else {
          res.status(500).send({
            message: ` Could not delete Horario with id ${req.params.horarioId}`,
          });
        }
      } else res.send({ message: `Horario deleted successfully!!!` });
    });
  } catch (err) {
    console.log(err.message);
    next(err); //08/07/2021
  }
};
