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
  this.tratamento = paciente.tratamento;
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
  sql.query(
    `INSERT INTO pacientes
    (nome, cpf, telefone1, tratamento, codigo_consultorio)
    VALUES
    (?, ?, ?, ?, ?)`,
    [
      newpaciente.nome,
      newpaciente.cpf,
      newpaciente.telefone1,
      newpaciente.tratamento,
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

//funcionando 13/06/2021

// paciente.getAll = (result) => {
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

// teste mudar metodo para async
//deu certo
Paciente.getAll = (result) => {
  sql.query('SELECT * FROM pacientes', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('paciente: ', res);
    result(null, res);
  });
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

//busca unica
// paciente.findById = (pacienteId, result) => {
//   sql.query(
//     `SELECT * FROM pacientes WHERE codigo = ${pacienteId}`,
//     (err, res) => {
//       if (err) {
//         console.log('error: ', err);
//         result(err, null);
//         return;
//       }

//       if (res.length) {
//         console.log('found paciente: ', res[0]);
//         result(null, res[0]);
//         return;
//       }

//       // not found paciente with the id
//       result({ kind: 'not_found' }, null);
//     }
//   );
// };

//teste asyn
Paciente.findById = (pacienteId, result) => {
  sql.query(
    `SELECT * FROM pacientes WHERE codigo = ${pacienteId}`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log('found paciente: ', res[0]);
        result(null, res[0]);
        return;
      }

      // not found paciente with the id
      result({ kind: 'not_found' }, null);
    }
  );
};
//fim teste busca unica
//asyn await por enquanto gerando erro no console !!!
module.exports = Paciente;