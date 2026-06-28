const Task = require('../models/Task');

const getTasks = async (req, res, next) => {
  try {
    const { status, priority, search, sort } = req.query;

    const filter = {};
    if (status && status !== '') filter.status = status;
    if (priority && priority !== '') filter.priority = priority;
    if (search && search !== '') filter.title = { $regex: search, $options: 'i' };

    const sortMap = {
      newest: { createdAt: -1 },
      oldest: { createdAt: 1 },
      dueDate: { dueDate: 1 },
      priority: { priority: -1 },
    };
    const sortBy = sortMap[sort] || { createdAt: -1 };

    const tasks = await Task.find(filter).sort(sortBy);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

const getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      const err = new Error('Task not found');
      err.statusCode = 404;
      return next(err);
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
};

const createTask = async (req, res, next) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) {
      const err = new Error('Task not found');
      err.statusCode = 404;
      return next(err);
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
      const err = new Error('Task not found');
      err.statusCode = 404;
      return next(err);
    }
    res.json({ message: 'Task deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getTasks, getTask, createTask, updateTask, deleteTask };