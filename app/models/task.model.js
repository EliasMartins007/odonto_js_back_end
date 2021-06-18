const sql = require('./db'); //alterei caminho 10/06/2021

//obj contrutor
const Task = function (task) {
  this.task = task.task;
  this.status = task.status;
  this.created_at = new Date();
};

Task.creatTask = function (newTask, result) {
  sql.query('INSERT INTO tasks set ?', newTask, function (err, res) {
    if (err) {
      console.log('error:', err); //err.message ???
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};
Task.getAllTask = function (result) {
  sql.query('Select * from tasks', function (err, res) {
    if (err) {
      console.log('error: ', err);
      result(null, err);
    } else {
      console.log('tasks : ', res);

      result(null, res);
    }
  });
};

//exemplo do customer
Task.getAll = (result) => {
  sql.query('SELECT * FROM tasks', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('tasks: ', res);
    result(null, res);
  });
};

// Task.getTaskById = function (taskId, result) {
//   sql.query("Select task from tasks where id = ? ", taskId, function (err, res) {
//           if(err) {
//               console.log("error: ", err);
//               result(err, null);
//           }
//           else{
//               result(null, res);

//           }
//       });
// };

//update
// Task.updateById = function(id, task, result){
//   sql.query("UPDATE tasks SET task = ? WHERE id = ?", [task.task, id], function (err, res) {
//           if(err) {
//               console.log("error: ", err);
//                 result(null, err);
//              }
//            else{
//              result(null, res);
//                 }
//             });
// };

//outro
// Customer.updateById = (id, customer, result) => {
//   sql.query(
//     "UPDATE customers SET email = ?, name = ?, active = ? WHERE id = ?",
//     [customer.email, customer.name, customer.active, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Customer with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated customer: ", { id: id, ...customer });
//       result(null, { id: id, ...customer });
//     }
//   );
// };
module.exports = Task;
