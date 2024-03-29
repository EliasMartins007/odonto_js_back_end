const Convenio = require('../models/convenio.model.js');

exports.create_a_convenio = (req, res, next) => {
  try {
    let new_convenio = new Convenio(req.body);

    //handles null error
    if (!new_convenio.nome) {
      res
        .status(400)
        .send({ error: true, message: 'please provide convenio/nome' });
    } else {
      Convenio.creatConvenio(new_convenio, (err, convenio) => {
        if (err)
          //apenas uma linha sem {}
          res.send(err);
        res.json(convenio);
      });
    }
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};

// Retrieve all Customers from the database. do exemplo async
exports.findAll = (req, res, next) => {
  //adicionei next 11/06/2021
  try {
    Convenio.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || 'Some error occurred convenio.',
        });
      else {
        // res.send(data); //original funcionando 22/06/2021
        //teste 23/06/2021
        res.json({ error: false, Convenio: data });
      }
    });
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};

//busca unica // tenho que add async await!!!
// Find a single  with a convenioId
exports.findOne = (req, res, next) => {
  try {
    Convenio.findById(req.params.convenioId, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Convenio with id ${req.params.convenioId}.`,
          });
        } else {
          res.status(500).send({
            message:
              'Error retrieving Convenio with id ' + req.params.convenioId,
          });
        }
      } else res.send(data); //res.json(data); ou //res.send(data); os dois funcionam
    });
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};
//update falta 12/07/2021
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  try {
    Convenio.updateById(
      req.params.convenioId,
      new Convenio(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === 'not_found') {
            res.status(404).send({
              message: `Not found convenio with id ${req.params.convenioId}.`,
            });
          } else {
            res.status(500).send({
              message:
                'Error updating convenio with id ' + req.params.convenioId,
            });
          }
        } else res.send(data);
      }
    );
  } catch (err) {
    console.log({ error: true, message: err.message });
  }
};
//delete  03/07/2021
exports.delete = (req, res, next) => {
  try {
    Convenio.remove(req.params.convenioId, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Convenio with id ${req.params.convenioId}.`,
          });
        } else {
          res.status(500).send({
            message:
              'Could not delete Convenio with id ' + req.params.convenioId,
          });
        }
      } else res.send({ message: `Convenio deleted successfully!!!` });
    });
  } catch (err) {
    console.log(err);
    next(err); //03/07/2021
  }
};
