const sql = require('./db'); //alterei caminho 10/06/2021

//obj contrutor
const Procedimento = function (procedimento) {
  this.nome = procedimento.nome;
  this.valor_procedimento = procedimento.valor_procedimento;
  this.tipo = procedimento.tipo;
  this.obs = procedimento.obs;
  this.codigo_consultorio = procedimento.codigo_consultorio; // FK tenho que verificar 11/06/2021
  this.data_cadastro = new Date();
  this.data_atualizacao = new Date();
};

Procedimento.creatProcedimento = (newProcedimento, result) => {
  sql.query(
    `INSERT INTO procedimento
    (nome, valor_procedimento, tipo, obs)
    VALUES
    ( ?, ?, ?, ?)`, // ( ? ) (nome, valor_procedimento, tipo, obs, codigo_consultorio)
    [
      newProcedimento.nome,
      newProcedimento.valor_procedimento,
      newProcedimento.tipo,
      newProcedimento.obs,
      // newProcedimento.codigo_consultorio, 02/07/2021
    ],

    //fazer validação vazio!!!
    function (err, res) {
      if (err) {
        console.log('error:', err);
        result(err, null);
      } else {
        console.log(res.insertId); //mostra somente id
        //result(null, res.insertId); // original
        result(null, { id: res.insertId, ...newProcedimento }); //mostra obj completo
      }
    }
  );
};

Procedimento.getAllProcedimento = function (result) {
  sql.query('Select * from procedimento', function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('procedimento : ', res);

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

// teste mudar metodo para async
//deu certo
Procedimento.getAll = (result) => {
  // sql.query('SELECT * FROM procedimento', (err, res) => { // original alterei para obj 23/06/2021
  const procedimento = sql.query('SELECT * FROM procedimento', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('procedimento: ', res);
    result(null, res);
    return { procedimento }; //23/06/2021 não solucionou a questão de undefined
  });
};

//fim teste

//busca unica
Procedimento.findById = async (procedimentoId, result) => {
  //`SELECT * FROM procedimento WHERE codigo = ${procedimentoId}`, //original
  sql.query(
    'SELECT * FROM procedimento WHERE codigo = ?',
    procedimentoId,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log('Procedimento: ', res[0]);
        result(null, res[0]);
        return;
      }

      // not found Procedimento with the id
      result({ kind: 'not_found' }, null);
    }
  );
};
//fim teste busca unica
//
//
//
//busca unica silvio ainda a implementar 18/06/2021
Procedimento.findById2021 = ({ procedimentoId }, result) => {
  try {
    // {
    //   procedimentoId;
    // }
    //teste trazer todas inf do procedimento 18/06/2021
    //let data = {};

    sql.query(
      'SELECT * FROM procedimento WHERE codigo = ?',
      [procedimentoId],
      // (err, res) => {
      (err, res) => {
        //teste 18/06/2021 tarde
        if (err) {
          console.log('error: ', err);
          result(err, null);
          return;
        }
        //18/06
        if (res.length) {
          console.log('Procedimento: ', res[0]);
          // result(null, res[0]);
          //return;
          //result(null, { id: res[0], ...procedimentoId }); //silvio 18/06/2021
          //result(null, { id: res.insertId, ...procedimentoId }); //silvio 18/06/2021

          //funcionando
          return { procedimento: res[0] };

          //teste
          //data = result;

          //res.json({ procedimento: res[0] });
        }

        // not found Procedimento with the id
        result({ kind: 'not_found' }, null);
      }
    );
  } catch (err) {
    console.log({ error: true, message: err.message });
  }
};
//fim teste busca unica silvio

//teste component funcionario 07/07/2021
Procedimento.findByIdFuncionario = async (procedimentoId, result) => {
  //`SELECT * FROM procedimento WHERE codigo = ${procedimentoId}`, //original
  sql.query(
    'SELECT * FROM procedimento WHERE codigo = ?',
    procedimentoId,
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }

      if (res.length) {
        // console.log('Procedimento: ', res[0]);
        // result(null, res[0]);
        // return;
        //10/07/2021
        let finalArray = new Array();
        for (var k in procedimentoId) {
          finalArray.push(procedimentoId[k]);
          console.log(finalArray);
        }
      }

      // not found Procedimento with the id
      result({ kind: 'not_found' }, null);
    }
  );
};

//varios10/07/2021
Procedimento.getAllFuncionarios = (result) => {
  // sql.query('SELECT * FROM procedimento', (err, res) => { // original alterei para obj 23/06/2021
  const procedimento = sql.query('SELECT * FROM procedimento', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('procedimento: ', res); //trazendo resultado 11/07/2021
    // result(res.toArray());
    // console.log('procedimento', res); //11/07/2021
    // console.log('procedimento', procedimento); //11/07/2021

    result(null, res);
    // return { procedimento }; //23/06/2021 não solucionou a questão de undefined
    //10/07/2021 outra forma
    //console.log('procedimento: ', res);
    // let finalArray = new Array();
    // for (var k in procedimento) {
    //   finalArray.push(procedimento[k]);
    //   console.log(finalArray);
    // }
  });
};
//fim07/07/2021

//UPDATE 11/07/2021
Procedimento.updateById = (id, procedimentoId, result) => {
  sql.query(
    'UPDATE procedimento SET nome = ?, valor_procedimento= ?, tipo = ?, obs = ? WHERE codigo = ?',
    [
      procedimentoId.nome,
      procedimentoId.valor_procedimento,
      procedimentoId.tipo,
      procedimentoId.obs,
      //   procedimentoId.data_atualizaçao.Date.now(),
      id,
    ],

    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found procedimento with the id
        result({ kind: 'not_found' }, null);
        return;
      }

      console.log('updated procedimento: ', { id: id, ...procedimentoId });
      result(null, { id: id, ...procedimentoId });
    }
  );
};
//delete 04/07/2021
Procedimento.remove = (id, result) => {
  sql.query('DELETE FROM procedimento WHERE  codigo = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found procedimento with the id
      result({ kind: 'not_found' }, null);
      return;
    }
    console.log('deleted procedimento with codigo: ', id);
    result(null, res);
  });
};
module.exports = Procedimento;
