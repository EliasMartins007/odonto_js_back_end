const sql = require('./db'); //alterei caminho 10/06/2021

//obj contrutor  usuario
const Usuario = function (usuario) {
  this.login_usuario = usuario.login_usuario;
  this.senha_usuario = usuario.senha_usuario;
  this.codigo_consultorio = usuario.codigo_consultorio; // FK tenho que verificar 11/06/2021
  this.codigo_funcionario = usuario.codigo_funcionario; // FK
  this.codigo_perfil = usuario.codigo_perfil; // FK
  this.data_cadastro = new Date();
  this.data_atualizacao = new Date();
};

Usuario.creatUsuario = (newUsuario, result) => {
  sql.query(
    `INSERT INTO usuarios
    (login_usuario, senha_usuario, codigo_consultorio, codigo_funcionario, codigo_perfil )
    VALUES
    (?, ?, ?, ?, ?)`,
    [
      newUsuario.login_usuario,
      newUsuario.senha_usuario,
      newUsuario.codigo_consultorio,
      newUsuario.codigo_funcionario,
      newUsuario.codigo_perfil,
    ],
    function (err, res) {
      if (err) {
        console.log('error:', err); //err.message ???
        result(err, null);
      } else {
        console.log(res.insertId);
        //result(null, res.insertId); // original 15/06/2021
        result(null, { id: res.insertId, ...newUsuario }); //teste
      }
    }
  );
};

//busca todos old
Usuario.getAllUsuario = function (result) {
  sql.query('Select * from usuarios', function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('usuario : ', res);

      result(null, res);
    }
  });
};
// // transformei arrow elias
// Produto.getAllProduto = (result) => {
//   sql.query('Select * from produtos', (err, res) => {
//     if (err) {
//       console.log('error: ', err);
//       result(null, err);
//       return;
//     } else {
//       console.log('produto : ', res);
//       result(null, res);
//     }
//   });
// };

// teste mudar metodo para async
//deu certo
Usuario.getAll = (result) => {
  sql.query('SELECT * FROM usuarios', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('usuario: ', res);
    result(null, res);
  });
};

//fim teste

//teste adequar controller para model  funcionou falta ajustes 11/06
// Produto.listAllProducts = async (result) => {
//   await sql.query('SELECT * FROM produtos', (err, res) => {
//     if (err) {
//       console.log('error: ', err);
//       result(null, err);
//       return;
//     }

//     console.log('produto: ', res);
//     result(null, res);
//   });
// };

// //teste adequar async original do exemplo 11/06/2021
// exports.listAllProducts = async (req, res) => {
//   const response = await db.query(
//     'SELECT * FROM products ORDER BY product_name ASC'
//   );
//   res.status(200).send(response.rows);
// };

//busca unica
Usuario.findById = (usuarioId, result) => {
  sql.query(
    `SELECT * FROM usuarios WHERE codigo = ${usuarioId}`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log('found usuario: ', res[0]);
        result(null, res[0]);
        return;
      }

      // not found Produto with the id
      result({ kind: 'not_found' }, null);
    }
  );
};
//fim teste busca unica
//asyn await por enquanto gerando erro no console !!!
module.exports = Usuario;
