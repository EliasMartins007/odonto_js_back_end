module.exports = function (app) {
  const tasks = require('../controllers/task.controller.js'); //('../controllers/todoListController');
  app.get('/tasks', tasks.findAll);

  //app.get('/tasks', tasks.list_all_tasks);
};
