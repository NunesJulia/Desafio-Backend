const Task = require('../model/Task');


exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map((err) => err.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: 'Erro no servidor.' });
  }
};


exports.getAllTasks = async (req, res) => {
  try {
    let where = {};
    if (req.query.status) {
      where.status = req.query.status;
    }
    const tasks = await Task.findAll({ where });
    res.status(200).json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro no servidor.' });
  }
};


exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id); 
    if (!task) {
      return res.status(404).json({ success: false, error: 'Tarefa não encontrada.' });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro no servidor.' });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Tarefa não encontrada.' });
    }
    const updatedTask = await task.update(req.body);
    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map((err) => err.message);
      return res.status(400).json({ success: false, error: messages });
    }
    res.status(500).json({ success: false, error: 'Erro no servidor.' });
  }
};


exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Tarefa não encontrada.' });
    }
    await task.destroy();
    res.status(200).json({ success: true, message: 'Tarefa excluída com sucesso.' });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Erro no servidor.' });
  }
};