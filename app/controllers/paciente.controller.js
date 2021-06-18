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

exports.list_all_paciente = function (req, res) {
  try {
    Paciente.getAllPaciente(function (err, paciente) {
      //chama getAll da model
      console.log('controller');
      if (err) {
        res.send(err);
        console.log('res', paciente);
      }
      res.send(paciente);
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
    Paciente.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || 'Some error occurred paciente.',
        });
      else res.send(data);
    });
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};

exports.findOne = (req, res, next) => {
  try {
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
      } else res.json({ data }); // res.send(data); //res.json(data); ou //res.send(data); os dois funcionam
    });
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};