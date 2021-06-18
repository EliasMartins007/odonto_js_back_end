const sql = require('./db'); //alterei caminho 10/06/2021

//obj contrutor
const Perfil = function (perfil) {
  this.funcao_perfil = perfil.funcao_perfil;
  this.obs_perfil = perfil.obs_perfil;
  this.data_cadastro = new Date();
  this.data_atualizacao = new Date();
};

// Perfil.creatPerfil = function (newPerfil, result) {
//   sql.query('INSERT INTO perfil set ?', newPerfil, function (err, res) {
//     if (err) {
//       console.log('error:', err); //err.message ???
//       result(err, null);
//     } else {
//       console.log(res.insertId);
//       result(null, res.insertId);
//     }
//   });
// };
//teste 14/06/2021
Perfil.creatPerfil = (newPerfil, result) => {
  sql.query(
    `INSERT INTO perfil
    (funcao_perfil, obs_perfil)
    VALUES
    (?, ?)`,
    [newPerfil.funcao_perfil, newPerfil.obs_perfil],
    function (err, res) {
      if (err) {
        console.log('error:', err); //err.message ???
        result(err, null);
      } else {
        //console.log(res.insertId); //original 14/06/2021
        console.log(res.insertId);
        //result(null, res.insertId); // original
        result(null, { id: res.insertId, ...newPerfil }); //teste outro tutoria 14/06/2021  ok
      }
    }
  );
};
Perfil.getAllPerfil = function (result) {
  sql.query('Select * from perfil', function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('perfil : ', res);

      result(null, res);
    }
  });
};

//exemplo do customer
Perfil.getAll = (result) => {
  sql.query('SELECT * FROM perfil', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('perfil: ', res);
    result(null, res);
  });
};

//busca unica
Perfil.findById = async (perfilId, result) => {
  await sql.query(
    `SELECT * FROM perfil WHERE codigo = ${perfilId}`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log('found perfil: ', res[0]);
        result(null, res[0]);
        return;
      }

      // not found Produto with the id
      result({ kind: 'not_found' }, null);
    }
  );
};
module.exports = Perfil;
