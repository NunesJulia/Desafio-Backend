const express = require('express');
const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../controller/taskController'); 

const router = express.Router();


router.route('/')
  .post(createTask)
  .get(getAllTasks);


router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

// Exporta o router para ser usado no server.js
module.exports = router;