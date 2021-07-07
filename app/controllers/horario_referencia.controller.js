const Horario_referencia = require('../models/horario_referencia.model.js');

//original
//CRIAÇÃO NOVO HORARIO
//(POST)
exports.create_a_horario_referencia = function (req, res) {
  try {
    let new_horario_referencia = new Horario_referencia(req.body);

    //handles null error
    if (!new_horario_referencia.codigo) {
      res.status(400).send({
        error: true,
        message: 'please provide horario_referenciao/codigo',
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
  }
};

exports.list_all_horario_referencia = function (req, res) {
  try {
    Horario_referencia.getAllHorario_referencia(function (
      err,
      horario_referencia
    ) {
      //chama getAll da model
      console.log('controller');
      if (err) {
        res.send(err);
        console.log('res', horario_referencia);
      }
      res.send(horario_referencia);
    });
  } catch (err) {
    console.log(err.message);
    res.json({ error: true, message: err.message });
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
    Horario_referencia.findById(
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
        }
      }
    );
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};
