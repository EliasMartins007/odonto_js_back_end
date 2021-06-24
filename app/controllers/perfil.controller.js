const Perfil = require('../models/perfil.model.js');

exports.create_a_perfil = function (req, res) {
  let new_perfil = new Perfil(req.body);

  //handles null error
  if (!new_perfil.funcao_perfil) {
    res
      .status(400)
      .send({ error: true, message: 'please provide perfil/funcao_perfil' });
  } else {
    Perfil.creatPerfil(new_perfil, function (err, perfil) {
      if (err)
        //apenas uma linha sem {}
        res.send(err);
      res.json(perfil);
    });
  }
};

exports.list_all_perfil = function (req, res) {
  try {
    Perfil.getAllPerfil(function (err, produto) {
      //chama getAll da model
      console.log('controller');
      if (err) {
        res.send(err);
        console.log('res', perfil);
      }
      res.send(perfil);
    });
  } catch (err) {
    console.log(err.message);
    res.json({ error: true, message: err.message });
  }
};

//outro mais moderno
exports.findAll = (req, res, next) => {
  //adicionei next 11/06/2021
  try {
    Perfil.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || 'Some error occurred perfil.',
        });
      else {
        //res.send(data); // original funcionando 22/06/2021
        //teste 23/06/2021
        res.json({ error: false, Perfil: data });
      }
    });
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};

//busca unica
exports.findOne = (req, res, next) => {
  try {
    Perfil.findById(req.params.perfilId, (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found perfil with id ${req.params.perfilId}.`,
          });
        } else {
          res.status(500).send({
            message: 'Error retrieving perfil with id ' + req.params.perfilId,
          });
        }
      } else res.send(data);
    });
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};
