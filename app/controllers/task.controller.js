const Task = require('../models/task.model.js'); //('../model/appModel');

exports.create_a_task = function (req, res) {
  let new_task = new Task(req.body);

  //handles null error
  if (!new_task.task || !new_task.status) {
    res
      .status(400)
      .send({ error: true, message: 'please provide task/status' });
  } else {
    Task.creatTask(new_task, function (err, task) {
      if (err)
        //apenas uma linha sem {}
        res.send(err);
      res.json(task);
    });
  }
};

exports.list_all_tasks = function (req, res) {
  try {
    Task.getAllTask(function (err, task) {
      //chama getAll da model
      console.log('controller');
      if (err) {
        res.send(err);
        console.log('res', task);
      }
      res.send(task);
    });
  } catch (err) {
    console.log(err.message);
    res.json({ error: true, message: err.message });
  }
};

//outro mais moderno
// Retrieve all Customers from the database. do exemplo async
exports.findAll = (req, res, next) => {
  //adicionei next 11/06/2021
  try {
    Task.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || 'Some error occurred task.',
        });
      else res.send(data);
    });
  } catch (err) {
    console.log({ error: true, message: err.message });
    next(err);
  }
};

//teste 14/06/2021
// exports.update_a_task = function(req, res) {
//   Task.updateById(req.params.taskId, new Task(req.body), function(err, task) {
//     if (err)
//       res.send(err);
//     res.json(task);
//   });
// };

// exports.delete_a_task = function(req, res) {

//   Task.remove( req.params.taskId, function(err, task) {
//     if (err)
//       res.send(err);
//     res.json({ message: 'Task successfully deleted' });
//   });
// };
