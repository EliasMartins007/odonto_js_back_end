//original
// //const mysql = require("mysql");
// const dbConfig = require('../config/db.config.js');
// //var connection = mysql.createPool({ //original
// const connection = mysql.createPool({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB,
// });

// module.exports = connection;
//teste 11/06/2021
//const mysql = require('mysql2/promise'); //15/06/2021
const mysql = require('mysql2');
const dbConfig = require('../config/db.config.js');
//const connection = mysql.createPool({ // original sem aync / promise
const connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  multipleStatements: true,
});

// async function connect() {
//   if (global.connection && global.connection.state !== 'disconneted')
//     return global.connection;

//   const mysql = require('mysql2/promise');
//   const connection = await mysql.createConnection(
//     'mysql://elias:25061987@localhost:3306/odonto' //minha string
//   ); // string luiz mysql://root:luiztools@localhost:3306/crud
//   console.log('Conectou no MYSQL !');
//   global.connection = connection;
//   return connection;
// }
// open the MySQL connection
// connection.connect((error) => {
//   if (error) throw error;
//   console.log('Successfully connected to the database.');
// });

module.exports = connection;
