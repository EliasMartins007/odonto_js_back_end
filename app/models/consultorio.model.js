const sql = require('./db');

//obj contrutor
const Consultorio = function (consultorio) {
  // this.task = consultorio.task;
  // this.status = consultorio.status;
  // this.created_at = new Date();
  this.nome = consultorio.nome;
  this.endereco = consultorio.endereco;
  this.cidade = consultorio.cidade;
  this.telefone1 = consultorio.telefone1;
  this.obs = consultorio.obs;
  this.data_cadastro = new Date();
  this.data_atualizaçao = new Date();
};
//criação Consultorio
Consultorio.creatConsultorio = (newConsultorio, result) => {
  sql.query(
    `INSERT INTO consultorio
    (nome, endereco, cidade, telefone1, obs)
    VALUES
    (?, ?, ?, ?, ?)`,
    [
      newConsultorio.nome,
      newConsultorio.endereco,
      newConsultorio.cidade,
      newConsultorio.telefone1,
      newConsultorio.obs,
    ],
    function (err, res) {
      if (err) {
        console.log('error:', err); //err.message ???
        result(err, null);
      } else {
        //console.log(res.insertId); //original 14/06/2021
        console.log(res.insertId);
        //result(null, res.insertId); // original
        result(null, { id: res.insertId, ...newConsultorio }); //teste outro tutoria 14/06/2021  ok
      }
    }
  );
};
//fim teste 14/06/2021
Consultorio.getAllConsultorio = function (result) {
  sql.query('Select * from consultorio', function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('consultorio : ', res);

      result(null, res);
    }
  });
};

//exemplo do customer busca todos
Consultorio.getAll = (result) => {
  sql.query('SELECT * FROM consultorio', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('consultorio : ', res);
    result(null, res);
  });
};

//busca unica
Consultorio.findById = (consultorioId, result) => {
  sql.query(
    'Select * from consultorio where codigo = ? ',
    consultorioId,
    //`SELECT * FROM consultorio WHERE codigo = ${consultorioId}`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log('found consultorio: ', res[0]);
        result(null, res[0]);
        return;
      }

      // not found consultorio with the id
      result({ kind: 'not_found' }, null);
    }
  );
};

//UPDATE consultorio , data_atualizaçao = ?
Consultorio.updateById = (id, consultorioId, result) => {
  sql.query(
    'UPDATE consultorio SET nome = ?, endereco = ?, cidade = ?, telefone1 = ?, obs = ? WHERE codigo = ?',
    [
      consultorioId.nome,
      consultorioId.endereco,
      consultorioId.cidade,
      consultorioId.telefone1,
      consultorioId.obs,
      //   consultorioId.data_atualizaçao.Date.now(),
      id,
    ],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Consultorio with the id
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('updated consultorio: ', { id: id, ...consultorioId });
      result(null, { id: id, ...consultorioId });
    }
  );
};

//delete
Consultorio.remove = (id, result) => {
  sql.query('DELETE FROM consultorio WHERE  codigo = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: 'not_found' }, null);
      return;
    }

    console.log('deleted consultorio with codigo: ', id);
    result(null, res);
  });
};

module.exports = Consultorio;
