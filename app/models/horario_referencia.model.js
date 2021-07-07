const sql = require('./db'); //todo arquivo 05/07/2021

//obj contrutor
const Horario = function (horario) {
  this.data_atendimento = horario.data_atendimento; //Date
  this.hora_atendimento = horario.hora_atendimento;
  // this.codigo_consultorio = produto.codigo_consultorio; // FK tenho que verificar 11/06/2021
  this.obs = horario.obs; //05/07/2021
  this.valor_servico = horario.valor_servico; //Decimal
  this.codigo_paciente = horario.codigo_paciente; //int
  this.codigo_funcionario = horario.codigo_funcionario; //int
  this.st_ativo = horario.st_ativo; //status 05/07/2021
  this.data_cadastro = new Date();
  this.data_atualizacao = new Date();
};

Horario.creatHorario_referencia = (newHorario, result) => {
  sql.query(
    `INSERT INTO horario_referencia
    (codigo_paciente , codigo_funcionario, valor_servico, obs)
    VALUES
    (?, ?, ?, ?)`,
    [
      newHorario.codigo_paciente,
      newHorario.codigo_funcionario,
      newHorario.valor_servico,
      newHorario.obs,
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

Horario.getAllHorario_referencia = function (result) {
  sql.query('Select * from horario_referencia', function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('horario : ', res);

      result(null, res);
    }
  });
};

Horario.getAll = (result) => {
  sql.query('SELECT * FROM horario_referencia', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('horario: ', res);
    result(null, res);
  });
};

//teste asyn
Horario.findById = (horarioId, result) => {
  sql.query(
    `SELECT * FROM horario_referencia WHERE codigo = ?`,
    horarioId, //07/07/2021
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log('horario: ', res[0]);
        result(null, res[0]);
        return;
      }

      // not found Horario with the id
      result({ kind: 'not_found' }, null);
    }
  );
};
//fim teste busca unica
//asyn await por enquanto gerando erro no console !!!
module.exports = Horario;
