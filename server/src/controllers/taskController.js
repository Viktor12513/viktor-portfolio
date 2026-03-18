import { TaskModel } from '../models/taskModel.js';
import { validateTaskInput } from '../utils/validateTask.js';

export function getTasks(_req, res) {
  res.json(TaskModel.findAll());
}

export function createTask(req, res) {
  const validation = validateTaskInput(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      message: 'Please fix the validation errors and try again.',
      errors: validation.errors
    });
  }

  const newTask = TaskModel.create(req.body);
  return res.status(201).json(newTask);
}

export function updateTask(req, res) {
  const taskId = Number(req.params.id);
  const existingTask = TaskModel.findById(taskId);

  if (!existingTask) {
    return res.status(404).json({ message: 'Task not found.' });
  }

  const validation = validateTaskInput(req.body, true);

  if (!validation.isValid) {
    return res.status(400).json({
      message: 'Please fix the validation errors and try again.',
      errors: validation.errors
    });
  }

  const updatedTask = TaskModel.update(taskId, req.body);
  return res.json(updatedTask);
}

export function deleteTask(req, res) {
  const taskId = Number(req.params.id);
  const deletedTask = TaskModel.delete(taskId);

  if (!deletedTask) {
    return res.status(404).json({ message: 'Task not found.' });
  }

  return res.json(deletedTask);
}
