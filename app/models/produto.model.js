const sql = require('./db'); //alterei caminho 10/06/2021

//obj contrutor
const Produto = function (produto) {
  this.descricao = produto.descricao;
  this.quantidade = produto.quantidade;
  this.codigo_consultorio = produto.codigo_consultorio; // FK tenho que verificar 11/06/2021
  this.data_cadastro = new Date();
  this.data_atualizacao = new Date();
};
// //original
// Produto.creatProduto = function (newProduto, result) {
//   sql.query('INSERT INTO produtos set ?', newProduto, function (err, res) {
//     if (err) {
//       console.log('error:', err); //err.message ???
//       result(err, null);
//     } else {
//       console.log(res.insertId);
//       result(null, res.insertId);
//     }
//   });
// };
//fim
Produto.creatProduto = (newProduto, result) => {
  sql.query(
    `INSERT INTO produtos
    (descricao, quantidade, codigo_consultorio)
    VALUES
    (?, ?, ?)`,
    [
      newProduto.descricao,
      newProduto.quantidade,
      newProduto.codigo_consultorio,
    ],
    function (err, res) {
      if (err) {
        console.log('error:', err); //err.message ???
        result(err, null);
      } else {
        //console.log(res.insertId); //original 14/06/2021
        console.log(res.insertId);
        //result(null, res.insertId); // original
        result(null, { id: res.insertId, ...newProduto }); //teste outro tutoria 14/06/2021  ok
      }
    }
  );
};

Produto.getAllProduto = function (result) {
  sql.query('Select * from produtos', function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('produto : ', res);

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

//funcionando 13/06/2021

// Produto.getAll = (result) => {
//   sql.query('SELECT * FROM produtos', (err, res) => {
//     if (err) {
//       console.log('error: ', err);
//       result(null, err);
//       return;
//     }

//     console.log('produto: ', res);
//     result(null, res);
//   });
// };

// tenho que mudar metodo para async 15/06/2021
//deu certo
Produto.getAll = async (result) => {
  try {
    sql.query('SELECT * FROM produtos', (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('produto: ', res);
      result(null, res); //original
      //teste    result(response); //.status(200).send(response.rows);
    });
  } catch (err) {
    console.log({ erro: true, message: error.message });
  }
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
// Produto.findById = (produtoId, result) => {
//   sql.query(
//     `SELECT * FROM produtos WHERE codigo = ${produtoId}`,
//     (err, res) => {
//       if (err) {
//         console.log('error: ', err);
//         result(err, null);
//         return;
//       }

//       if (res.length) {
//         console.log('found produto: ', res[0]);
//         result(null, res[0]);
//         return;
//       }

//       // not found Produto with the id
//       result({ kind: 'not_found' }, null);
//     }
//   );
// };

//testando asyn 15/06/2021
Produto.findById = (produtoId, result) => {
  try {
    sql.query(
      'SELECT * FROM produtos WHERE codigo = ? ',
      produtoId,
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(err, null);
          return;
        }

        if (res.length) {
          console.log('found produto: ', res[0]);
          result(null, res[0]);
          return;
        }

        // not found Produto with the id
        result({ kind: 'not_found' }, null);
      }
    );
  } catch (error) {
    console.log({ erro: true, message: error.message });
  }
};

//fim teste busca unica
//asyn await por enquanto gerando erro no console !!!

//UPDATE produto, data_atualizaçao = ? 20/06/2021
Produto.updateById = (id, produtoId, result) => {
  try {
    sql.query(
      'UPDATE produtos SET descricao = ?, quantidade= ?, codigo_consultorio= ? WHERE codigo = ?',
      [
        produtoId.descricao,
        produtoId.quantidade,
        produtoId.codigo_consultorio,
        //   consultorioId.data_atualizaçao.Date.now(), verificar campo atualização
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

        console.log('updated produto: ', { id: id, ...produtoId });
        result(null, { id: id, ...produtoId });
      }
    );
  } catch (err) {
    console.log({ error: true, message: err.message });
  }
};
//delete
//original
// Consultorio.remove = (id, result) => {
//   sql.query('DELETE FROM consultorio WHERE  codigo = ?', id, (err, res) => {
//     if (err) {
//       console.log('error: ', err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found Customer with the id
//       result({ kind: 'not_found' }, null);
//       return;
//     }

//     console.log('deleted consultorio with codigo: ', id);
//     result(null, res);
//   });
// };
//delete
Produto.remove = (id, result) => {
  sql.query('DELETE FROM produtos WHERE  codigo = ?', id, (err, res) => {
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

    console.log('deleted produto with codigo: ', id);
    result(null, res);
  });
};

module.exports = Produto;
