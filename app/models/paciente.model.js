const sql = require('./db'); //alterei caminho 10/06/2021

//obj contrutor
const Paciente = function (paciente) {
  this.nome = paciente.nome;
  this.cpf = paciente.cpf;
  // this.estadoCivil = paciente.estadoCivil;
  this.sexo = paciente.sexo;
  // this.profissao = paciente.profissao;
  this.nascimento = paciente.nascimento;
  this.endereco = paciente.endereco;
  this.bairro = paciente.bairro;
  this.cidade = paciente.cidade;
  this.cep = paciente.cep;
  this.celular = paciente.celular;
  this.telefone1 = paciente.telefone1;
  this.email = paciente.email;
  this.obs = paciente.obs;
  this.procedimento = paciente.procedimento; //MUDAR PARA PROCEDIMENTO amtigo tratamento 22/06/2021
  this.status = paciente.status;
  this.convenio = paciente.convenio; //verificar necessidade 14/06/2021 elias
  this.codigo_consultorio = paciente.codigo_consultorio; // FK tenho que verificar 11/06/2021
  this.data_cadastro = new Date();
  this.data_atualizacao = new Date();
};
// //original
// paciente.creatpaciente = function (newpaciente, result) {
//   sql.query('INSERT INTO pacientes set ?', newpaciente, function (err, res) {
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
Paciente.creatpaciente = (newpaciente, result) => {
  //(nome, cpf, telefone1, procedimento, codigo_consultorio) 22/06/2021  14 campos no reducer
  sql.query(
    `INSERT INTO pacientes
    (nome, cpf, sexo, telefone1, procedimento, codigo_consultorio)
    VALUES
    (?, ?, ?, ?, ?, ?)`,
    [
      newpaciente.nome,
      newpaciente.cpf,
      newpaciente.sexo,
      newpaciente.telefone1,
      newpaciente.procedimento,
      newpaciente.codigo_consultorio,
    ],
    function (err, res) {
      if (err) {
        console.log('error:', err);
        result(err, null);
      } else {
        //console.log(res.insertId);
        console.log('Paciente: ', { newpaciente }); //exibir todos atributos do novo paciente
        //result(null, res.insertId);// exibe somente id no postman 18/06/2021
        //18/06/2021
        console.log(res.insertId);
        result(null, { id: res.insertId, ...newpaciente });
      }
    }
  );
};

Paciente.getAllpaciente = function (result) {
  sql.query('Select * from pacientes', function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('paciente : ', res);

      result(null, res);
    }
  });
};
// // transformei arrow elias
// paciente.getAllpaciente = (result) => {
//   sql.query('Select * from pacientes', (err, res) => {
//     if (err) {
//       console.log('error: ', err);
//       result(null, err);
//       return;
//     } else {
//       console.log('paciente : ', res);
//       result(null, res);
//     }
//   });
// };

//funcionando 22/06/2021

// Paciente.getAll = (result) => {
//   sql.query('SELECT * FROM pacientes', (err, res) => {
//     if (err) {
//       console.log('error: ', err);
//       result(null, err);
//       return;
//     }

//     console.log('paciente: ', res);
//     result(null, res);
//   });
// };
//teste json
Paciente.getAll = (result) => {
  const paciente = sql.query(
    'SELECT * FROM pacientes ORDER BY nome ASC',
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      console.log('paciente: ', res);
      result(null, res);
      //result(null, res.json()); //tenho que mudar retorno para json 22/06/2021
      //teste 22/06/2021
      return { paciente };
    }
  );
};

//fim teste

//teste adequar controller para model  funcionou falta ajustes 11/06
// paciente.listAllProducts = async (result) => {
//   await sql.query('SELECT * FROM pacientes', (err, res) => {
//     if (err) {
//       console.log('error: ', err);
//       result(null, err);
//       return;
//     }

//     console.log('paciente: ', res);
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

//teste asyn
Paciente.findById = (pacienteId, result) => {
  const pa = sql.query(
    'SELECT * FROM pacientes WHERE codigo = ?',
    pacienteId,
    //`SELECT * FROM pacientes WHERE codigo = ${pacienteId}`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log('Paciente: ', res[0]); // funcionando 21/06/2021
        //
        //
        //update produto
        //console.log('updated produto: ', { id: id, ...produtoId });
        result(null, res[0]);
        // result(null, JSON.stringify.res[0]); //serginho 22/06/2021
        return { pa };
        //22/06/2021  return { error: false, result: pacienteId };
      }

      // not found paciente with the id
      result({ kind: 'not_found' }, null);
    }
  );
};
//fim teste busca unica
//asyn await por enquanto gerando erro no console !!!

//delete 04/07/2021
Paciente.remove = (id, result) => {
  sql.query('DELETE FROM pacientes WHERE  codigo = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found paciente with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted paciente  with codigo: ', id);
    result(null, res);
  });
};
module.exports = Paciente;
