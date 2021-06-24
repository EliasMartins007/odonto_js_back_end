const Consultorio = require('../models/consultorio.model.js');

exports.create = function (req, res) {
  let new_consultorio = new Consultorio(req.body);

  //handles null error
  if (!new_consultorio.nome) {
    res
      .status(400)
      .send({ error: true, message: 'please provide consultorio/endereco' });
  } else {
    Consultorio.creatConsultorio(new_consultorio, function (err, consultorio) {
      if (err)
        //apenas uma linha sem {}
        res.send(err);
      res.json(consultorio);
    });
  }
};

exports.list_all_consultorio = function (req, res) {
  try {
    Task.getAllConsultorio(function (err, consultorio) {
      //chama getAll da model
      console.log('controller');
      if (err) {
        res.send(err);
        console.log('res', consultorio);
      }
      res.send(consultorio);
    });
  } catch (err) {
    console.log(err.message);
    res.json({ error: true, message: err.message });
  }
};

//SENDO UTILIZADO PARA BUSCAR TODOS OS CONSULTORIOS

exports.findAll = (req, res, next) => {
  //adicionei next 11/06/2021  consultar !!
  try {
    Consultorio.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || 'Some error occurred consultorio.',
        });
      else {
        // res.send(data); // oiginal funcionando 22/06/2021
        //teste 23/06/2021
        res.json({ error: false, Consultorio: data });
      }
    });
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};

exports.findOne = (req, res, next) => {
  try {
    Consultorio.findById(req.params.consultorioId, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Consultorio with id ${req.params.consultorioId}.`,
          });
        } else {
          res.status(500).send({
            message:
              'Error retrieving Consultorio with id ' +
              req.params.consultorioId,
          });
        }
      } else {
        //teste 22/06/2021
        res.json({ error: false, consultorio: data });
        // funcionandores.json({ consultorio: data }); //res.send(data); //res.json(data); ou //res.send(data); os dois funcionam
      }
    });
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  try {
    Consultorio.updateById(
      req.params.consultorioId,
      new Consultorio(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === 'not_found') {
            res.status(404).send({
              message: `Not found Consultorio with id ${req.params.consultorioId}.`,
            });
          } else {
            res.status(500).send({
              message:
                'Error updating Consultorio with id ' +
                req.params.consultorioId,
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
  Consultorio.remove(req.params.consultorioId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Consultorio with id ${req.params.consultorioId}.`,
        });
      } else {
        res.status(500).send({
          message:
            'Could not delete Consultorio with id ' + req.params.consultorioId,
        });
      }
    } else res.send({ message: `Consultorio deleted successfully!!!` });
  });
};
