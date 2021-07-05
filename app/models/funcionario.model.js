const sql = require('./db'); //alterei caminho 10/06/2021

//obj contrutor
const Funcionario = function (funcionario) {
  this.nome = funcionario.nome;
  this.cpf = funcionario.cpf;
  this.rg = funcionario.rg;
  this.estadoCivil = funcionario.estadoCivil;
  this.endereco = funcionario.endereco;
  this.cidade = funcionario.cidade;
  this.cep = funcionario.cep;
  this.nascimento = funcionario.nascimento;
  this.telefone1 = funcionario.telefone1;
  this.celular = funcionario.celular;
  this.sexo = funcionario.sexo;
  this.email = funcionario.email;
  this.funcao1 = funcionario.funcao1;
  this.admissao = funcionario.admissao;
  this.demissao = funcionario.demissao;
  this.observacoes = funcionario.observacoes;
  this.ultimoacesso = funcionario.ultimoacesso;
  this.ativo = funcionario.ativo;
  this.codigo_consultorio = funcionario.codigo_consultorio; // FK tenho que verificar 11/06/2021
  this.data_cadastro = new Date();
  this.data_atualizacao = new Date();
};
// //original
// Funcionario.creatfuncionario = function (newfuncionario, result) {
//   sql.query('INSERT INTO funcionarios set ?', newfuncionario, function (err, res) {
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
Funcionario.creatfuncionario = (newfuncionario, result) => {
  sql.query(
    `INSERT INTO funcionarios
    (nome, cpf, estadocivil, funcao1, email)
    VALUES
    (?, ?, ?, ?, ?)`,
    [
      //(nome, cpf, estadocivil, codigo_consultorio)    (?, ?, ?, ?)`,
      newfuncionario.nome,
      newfuncionario.cpf,
      newfuncionario.estadocivil,
      //newfuncionario.codigo_consultorio,
      newfuncionario.funcao1,
      newfuncionario.email,
    ],
    function (err, res) {
      if (err) {
        console.log('error:', err); //err.message ???
        result(err, null);
      } else {
        console.log(res.insertId);
        // result(null, res.insertId); // original
        result(null, { id: res.insertId, ...newfuncionario }); //04/07/2021
      }
    }
  );
};

Funcionario.getAllfuncionario = function (result) {
  sql.query('Select * from funcionarios', function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('funcionario : ', res);

      result(null, res);
    }
  });
};
// // transformei arrow elias
// Funcionario.getAllfuncionario = (result) => {
//   sql.query('Select * from funcionarios', (err, res) => {
//     if (err) {
//       console.log('error: ', err);
//       result(null, err);
//       return;
//     } else {
//       console.log('funcionario : ', res);
//       result(null, res);
//     }
//   });
// };

//funcionando 13/06/2021

// Funcionario.getAll = (result) => {
//   sql.query('SELECT * FROM funcionarios', (err, res) => {
//     if (err) {
//       console.log('error: ', err);
//       result(null, err);
//       return;
//     }

//     console.log('funcionario: ', res);
//     result(null, res);
//   });
// };

// teste mudar metodo para async
//deu certo
Funcionario.getAll = (result) => {
  // sql.query('SELECT * FROM funcionarios', (err, res) => {
  const funcionario = sql.query('SELECT * FROM funcionarios', (err, res) => {
    //teste 24/02021
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('funcionario: ', res);
    result(null, res);
    //teste 24/06/2021 consulta em loop no front end
    return { funcionario };
  });
};

//fim teste

//teste adequar controller para model  funcionou falta ajustes 11/06
// Funcionario.listAllProducts = async (result) => {
//   await sql.query('SELECT * FROM funcionarios', (err, res) => {
//     if (err) {
//       console.log('error: ', err);
//       result(null, err);
//       return;
//     }

//     console.log('funcionario: ', res);
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
// Funcionario.findById = (funcionarioId, result) => {
//   sql.query(
//     `SELECT * FROM funcionarios WHERE codigo = ${funcionarioId}`,
//     (err, res) => {
//       if (err) {
//         console.log('error: ', err);
//         result(err, null);
//         return;
//       }

//       if (res.length) {
//         console.log('found funcionario: ', res[0]);
//         result(null, res[0]);
//         return;
//       }

//       // not found funcionario with the id
//       result({ kind: 'not_found' }, null);
//     }
//   );
// };

//teste asyn
Funcionario.findById = (funcionarioId, result) => {
  sql.query(
    `SELECT * FROM funcionarios WHERE codigo = ${funcionarioId}`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log('found funcionario: ', res[0]);
        result(null, res[0]);
        return;
      }

      // not found funcionario with the id
      result({ kind: 'not_found' }, null);
    }
  );
};
//fim teste busca unica
//asyn await por enquanto gerando erro no console !!!
//delete 04/07/2021
Funcionario.remove = (id, result) => {
  sql.query('DELETE FROM funcionarios WHERE  codigo = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found funcionario with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted funcionario  with codigo: ', id);
    result(null, res);
  });
};
module.exports = Funcionario;
