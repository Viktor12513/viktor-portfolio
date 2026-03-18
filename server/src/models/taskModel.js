import { taskStore } from '../data/taskStore.js';

let nextTaskId = taskStore.length + 1;

function sortByNewest(tasks) {
  return [...tasks].sort((firstTask, secondTask) => {
    return new Date(secondTask.createdAt).getTime() - new Date(firstTask.createdAt).getTime();
  });
}

export const TaskModel = {
  findAll() {
    return sortByNewest(taskStore);
  },

  findById(taskId) {
    return taskStore.find((task) => task.id === taskId) ?? null;
  },

  create(taskData) {
    const timestamp = new Date().toISOString();
    const newTask = {
      id: nextTaskId++,
      title: taskData.title.trim(),
      description: taskData.description.trim(),
      completed: taskData.completed ?? false,
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    taskStore.push(newTask);
    return newTask;
  },

  update(taskId, taskData) {
    const taskIndex = taskStore.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      return null;
    }

    const currentTask = taskStore[taskIndex];
    const updatedTask = {
      ...currentTask,
      ...taskData,
      title: taskData.title !== undefined ? taskData.title.trim() : currentTask.title,
      description:
        taskData.description !== undefined ? taskData.description.trim() : currentTask.description,
      updatedAt: new Date().toISOString()
    };

    taskStore[taskIndex] = updatedTask;
    return updatedTask;
  },

  delete(taskId) {
    const taskIndex = taskStore.findIndex((task) => task.id === taskId);

    if (taskIndex === -1) {
      return null;
    }

    return taskStore.splice(taskIndex, 1)[0];
  }
};
