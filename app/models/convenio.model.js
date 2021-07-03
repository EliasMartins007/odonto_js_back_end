const sql = require('./db');

//obj construtor  convênio
const Convenio = function (convenio) {
  this.nome = convenio.nome;
  this.razaosocial = convenio.razaosocial;
  this.telefone1 = convenio.telefone1;
  this.obs = convenio.obs;
  this.email = convenio.email;
  this.website = convenio.website;
  this.banco = convenio.banco;
  this.agencia = convenio.agencia;
  this.conta = convenio.conta;
  this.codigo_consultorio = convenio.codigo_consultorio; // FK tenho que verificar 11/06/2021
  this.data_cadastro = new Date();
  this.data_atualizacao = new Date();
};

Convenio.creatConvenio = (newConvenio, result) => {
  sql.query(
    `INSERT INTO convenio
    (nome, razaosocial, telefone1, obs, email, website, banco, agencia, conta, codigo_consultorio )
    VALUES
    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      newConvenio.nome,
      newConvenio.razaosocial,
      newConvenio.telefone1,
      newConvenio.obs,
      newConvenio.email,
      newConvenio.website,
      newConvenio.banco,
      newConvenio.agencia,
      newConvenio.conta,
      newConvenio.codigo_consultorio,
    ],

    function (err, res) {
      if (err) {
        console.log('error:', err);
        result(err, null);
      } else {
        console.log(res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

Convenio.getAllConvenio = function (result) {
  sql.query('Select * from convenio', function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('usuario : ', res);

      result(null, res);
    }
  });
};

Convenio.getAll = (result) => {
  sql.query('SELECT * FROM convenio', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('convenio: ', res);
    result(null, res);
  });
};

Convenio.findById = (convenioId, result) => {
  sql.query(
    `SELECT nome, razaosocial, telefone1, data_cadastro FROM convenio WHERE codigo = ${convenioId}`,
    //`SELECT * FROM convenio WHERE codigo = ${convenioId}`,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log('found convenio: ', res[0]);
        result(null, res[0]);
        return;
      }

      // not found Produto with the id
      result({ kind: 'not_found' }, null);
    }
  );
};
//fim teste busca unica
//asyn await por enquanto gerando erro no console !!! devo mudar mysql2/promesys  14/06/2021
//delete 03/07/2021
Convenio.remove = (id, result) => {
  sql.query('DELETE FROM convenio WHERE  codigo = ?', id, (err, res) => {
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

    console.log('deleted convenio  with codigo: ', id);
    result(null, res);
  });
};
module.exports = Convenio;
