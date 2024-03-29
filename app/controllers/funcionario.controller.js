const Funcionario = require('../models/funcionario.model.js');

//gerar token login24/07/2021
const jwt = require('jsonwebtoken');
const SECRET_KEY3 = 'ODONTO';

async function authenticate({ username, password }) {
  // const user = await db.Usuario.scope('withHash').findOne({
  const user = await db.Usuario.findOne({
    where: { username },
  });
}
//fim login
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
//UPDATE 12/07/2021
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }
  try {
    Funcionario.updateById(
      req.params.funcionarioId,
      new Funcionario(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === 'not_found') {
            res.status(404).send({
              message: `Not found funcionario with id ${req.params.funcionarioId}.`,
            });
          } else {
            res.status(500).send({
              message:
                'Error updating funcionario with id ' +
                req.params.funcionarioId,
            });
          }
        } else res.send(data);
      }
    );
  } catch (err) {
    console.log({ error: true, message: err.message });
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

// login funcionario
//fiz mudanças 16/06/2021
exports.authenticate = (req, res, next) => {
  // adaptado com exports
  // userService
  authenticate
    .authenticate(req.body)
    .then((user) => res.json(user))
    .catch(next);
};
//teste async login2 17/06/2021
exports.LoginFuncionario = (req, res, next) => {
  try {
    //teste  { login_usuario = email, senha_usuario = password }
    const { login, senha } = req.body; //login e senha 17/06/2021
    if (!login || !senha) {
      return res.status(400).send({
        message: 'Favor informar  login e senha!!!', //valida preenchimento do campo  apenas
      }); //teste 17/06/2021
    }
    Funcionario.getUsuario2({ login, senha }, (err, data) => {
      if (!data) {
        //teste 17/06/2021
        console.log('não encontrou user consulta sql !!!');
        // return; //certo 24/07/2021
        res.status(404).send({
          message: `Not found Usuário with id ${req.body}.`,
        });
        return;
        // next();
      }
      //fim teste 17/06/2021
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Usuário with id ${req.body}.`,
          });
        } else {
          res.status(500).send({
            message: 'Error retrieving Usuário with id ' + req.body,
          });
        }
      } else {
        //original funcionando 17/06/2021
        // res.json({ data }); //res.send(data); //res.json(data); ou //res.send(data); os dois funcionam
        //retornar json 17/06/2021{}
        //teste gerar token tenho que mudar para outro arquivo futuramente
        const token = jwt.sign({ user: data }, SECRET_KEY3, {
          //SECRET_KEY2
          //adicionei sign({user:})
          expiresIn: 600,
        });
        res.send({ auth: true, token }); //funcionando
        //return { usuarioId, token }; // não funciona
      }
    });
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};
