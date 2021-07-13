const sql = require('./db'); //alterei caminho 10/06/2021

//obj contrutor
const Funcionario = function (funcionario) {
  this.nome = funcionario.nome;
  this.cpf = funcionario.cpf;
  this.rg = funcionario.rg;
  this.estadocivil = funcionario.estadocivil;
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
  this.procedimento = funcionario.procedimento; //05/07/2021
  this.observacoes = funcionario.observacoes;
  this.login = funcionario.login; //09/07/2021
  this.senha = funcionario.senha; //09/07/2021
  this.ultimoacesso = funcionario.ultimoacesso;
  this.ativo = funcionario.ativo;
  this.codigo_consultorio = funcionario.codigo_consultorio; // FK tenho que verificar 11/06/2021
  this.data_cadastro = new Date();
  this.data_atualizacao = new Date();
};

Funcionario.creatfuncionario = (newfuncionario, result) => {
  sql.query(
    `INSERT INTO funcionarios
    (nome, cpf, rg, estadocivil, endereco,
     cidade, cep, nascimento, telefone1, celular, sexo,
     funcao1, email, observacoes, procedimento, login, senha)
    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      //(nome, cpf, estadocivil, codigo_consultorio)    (?, ?, ?, ?)`,
      newfuncionario.nome,
      newfuncionario.cpf,
      newfuncionario.rg, //12/07
      newfuncionario.estadocivil,
      newfuncionario.endereco, //12/07
      newfuncionario.cidade, //12/07
      newfuncionario.cep, //12/07
      newfuncionario.nascimento, //12/11
      newfuncionario.telefone1,
      newfuncionario.celular, //12/11
      //newfuncionario.codigo_consultorio,
      newfuncionario.sexo, //12/11
      newfuncionario.funcao1,
      newfuncionario.email,
      newfuncionario.observacoes, //12/11
      newfuncionario.procedimento, //12/11
      newfuncionario.login,
      newfuncionario.senha,
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
Funcionario.getAll = (result) => {
  const funcionario = sql.query(
    'SELECT * FROM funcionarios ORDER BY nome ASC',
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('funcionario: ', res);
      result(null, res);
      //teste 24/06/2021 consulta em loop no front end
      return { funcionario };
    }
  );
};
// //teste adequar async original do exemplo 11/06/2021
// exports.listAllProducts = async (req, res) => {
//   const response = await db.query(
//     'SELECT * FROM products ORDER BY product_name ASC'
//   );
//   res.status(200).send(response.rows);
// };
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
//UPDATE 12/07/2021
Funcionario.updateById = (id, funcionarioId, result) => {
  try {
    sql.query(
      ` UPDATE funcionarios SET nome = ?, cpf = ?, rg = ?, estadocivil = ?, endereco = ?, cidade = ?,
        cep = ?, nascimento = ?, telefone1 = ?, celular = ?, sexo = ?, funcao1 = ?, email = ?,
        observacoes = ?, procedimento = ?, login = ?, senha = ? WHERE codigo = ?`,
      [
        funcionarioId.nome,
        funcionarioId.cpf,
        funcionarioId.rg, //12/07
        funcionarioId.estadocivil,
        funcionarioId.endereco, //12/07
        funcionarioId.cidade, //12/07
        funcionarioId.cep, //12/07
        funcionarioId.nascimento, //12/11
        funcionarioId.telefone1,
        funcionarioId.celular, //12/11
        //funcionarioId.codigo_consultorio,
        funcionarioId.sexo, //12/11
        funcionarioId.funcao1,
        funcionarioId.email,
        funcionarioId.observacoes, //12/11
        funcionarioId.procedimento, //12/11
        funcionarioId.login,
        funcionarioId.senha,

        id,
      ],
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
          // not found Funcionario with the id
          result({ kind: 'not_found' }, null);
          return;
        }

        console.log('updated funcionario: ', { id: id, ...funcionarioId });
        result(null, { id: id, ...funcionarioId });
      }
    );
  } catch (err) {
    console.log({ error: true, message: err.message });
  }
};
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
