const Paciente = require('../models/paciente.model.js');

exports.create_a_paciente = (req, res, next) => {
  try {
    let new_paciente = new Paciente(req.body);
    //handles null error
    if (!new_paciente.nome) {
      res
        .status(400)
        .send({ error: true, message: 'please provide paciente/nome' });
    } else {
      Paciente.creatpaciente(new_paciente, (err, paciente) => {
        if (err)
          //apenas uma linha sem {}
          res.send(err);
        //original
        //res.json(paciente);
        res.json({ paciente }); //18/06/2021
      });
    }
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};

exports.findAll = (req, res, next) => {
  //adicionei next 11/06/2021
  try {
    Paciente.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || 'Some error occurred paciente.',
        });
      else {
        //original
        //res.send(data);
        //teste 22/06/2021
        // res.send({ error: false, Pacientes: data });
        res.json({ error: false, Pacientes: data }); //tenho que mudar retorno para json 22/06/2021
      }
    });
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};

exports.findOne = (req, res, next) => {
  try {
    // const { fd } = Paciente.findById(req.params.pacienteId, (err, data) => {
    Paciente.findById(req.params.pacienteId, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Pacinete with id ${req.params.pacienteId}.`,
          });
        } else {
          res.status(500).send({
            message:
              'Error retrieving Pacinete with id ' + req.params.pacienteId,
          });
        }
      } // res.send(data); //22/06/2021 elias
      else {
        res.send({ error: false, paciente: data });
        //return { fd };
        // res.json({ error: false, paciente: data });
        //res.json({ paciente: data }); // funciona 21/06/2021  res.json({ data }); // res.send(data); //res.json(data); ou //res.send(data); os dois funcionam
        //silvio 22/06/2021
        //return {error: false, data: res.data};
      }
    });
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};

exports.findOneTeste = async (req, res, next) => {
  try {
    const pacientes = await Paciente.findById(
      req.params.pacienteId,
      (err, data) => {
        if (err) {
          if (err.kind === 'not_found') {
            res.status(404).send({
              message: `Not found Pacinete with id ${req.params.pacienteId}.`,
            });
          } else {
            res.status(500).send({
              message:
                'Error retrieving Pacinete with id ' + req.params.pacienteId,
            });
          }
        } else {
          // res.send({ error: false, paciente: data }); //28/06/2021 funcionando
          res.json({ error: false, paciente: data });
          //res.json({ paciente: data }); // funciona 21/06/2021  res.json({ data }); // res.send(data); //res.json(data); ou //res.send(data); os dois funcionam
          //silvio 22/06/2021
          //return {error: false, data: res.data};
        }
      }
    );
  } catch (err) {
    console.log({ error: true, message: err.message });
    res.json({ error: true, message: err.message });
    next(err);
  }
};
//UPDATE PACIENTE 12/07/2021
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  try {
    Paciente.updateById(
      req.params.pacienteId,
      new Paciente(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === 'not_found') {
            res.status(404).send({
              message: `Not found paciente with id ${req.params.pacienteId}.`,
            });
          } else {
            res.status(500).send({
              message:
                'Error updating paciente with id ' + req.params.pacienteId,
            });
          }
        } else res.send(data);
      }
    );
  } catch (err) {
    console.log({ error: true, message: err.message });
  }
};
//delete  04/07/2021
exports.delete = async (req, res, next) => {
  try {
    const new_paciente = await Paciente.remove(
      req.params.pacienteId,
      (err, data) => {
        //teset async 04/07/2021
        if (err) {
          if (err.kind === 'not_found') {
            res.status(404).send({
              message: `Not found paciente with id ${req.params.pacienteId}.`,
            });
          } else {
            res.status(500).send({
              message:
                'Could not delete paciente with id ' + req.params.pacienteId,
            });
          }
        } else
          res.send({
            message: `paciente deleted successfully!!!`,
            new_paciente,
          }); //04/07 teste async
      }
    );
  } catch (err) {
    console.log(err);
    next(err); //04/07/2021
  }
};

//convenios
exports.findAllConvenios = (req, res, next) => {
  //adicionei next 11/06/2021
  try {
    Paciente.getAllConvenio((err, data) => {
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
