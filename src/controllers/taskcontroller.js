const db = require("../models");
const { Op } = require("sequelize");
const { Task } = require("../models");

exports.createTask = async (req, res) => {
  try {
    const task = await db.Task.create({ ...req.body, userId: req.userId });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { status, priority, query } = req.query;
    const offset = (page - 1) * limit;
    const conditions = {};
    if (status) {
      // Ensure status is one of the allowed ENUM values
      if (["Todo", "In Progress", "Done"].includes(status)) {
        conditions.status = status;
      } else {
        return res.status(400).json({ message: "Invalid status value" });
      }
    }
    if (priority) {
      // Ensure priority is an integer
      const priorityInt = parseInt(priority, 10);
      if (!isNaN(priorityInt)) {
        conditions.priority = priorityInt;
      } else {
        return res.status(400).json({ message: "Priority must be an integer" });
      }
    }
    if (query) {
      conditions[Op.or] = [
        { title: { [Op.iLike]: `%${query}%` } },
        { description: { [Op.iLike]: `%${query}%` } },
      ];
    }
    console.log(conditions);
    const tasks = await Task.findAndCountAll({
      where: conditions,
      limit: parseInt(limit, 10),
      offset: offset,
    });

    res.json({
      totalItems: tasks.count,
      totalPages: Math.ceil(tasks.count / limit),
      currentPage: page,
      tasks: tasks.rows,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await db.Task.findOne({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.update(req.body);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await db.Task.findOne({
      where: { id: req.params.id, userId: req.userId },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.destroy();
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    console.log(`Getting task with ID: ${task}`);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error });
  }
};


