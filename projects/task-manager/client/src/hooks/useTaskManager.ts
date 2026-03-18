import { useEffect, useMemo, useState } from 'react';
import { taskApi } from '../lib/api';
import type { Task, TaskFormValues, TaskStatusFilter } from '../types/task';

export function useTaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState<TaskStatusFilter>('all');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [busyTaskId, setBusyTaskId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const response = await taskApi.getTasks();
        setTasks(response);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Could not load tasks.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    if (activeFilter === 'active') {
      return tasks.filter((task) => !task.completed);
    }

    if (activeFilter === 'completed') {
      return tasks.filter((task) => task.completed);
    }

    return tasks;
  }, [activeFilter, tasks]);

  const saveTask = async (values: TaskFormValues) => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      if (editingTask) {
        const updatedTask = await taskApi.updateTask(editingTask.id, values);
        setTasks((currentTasks) =>
          currentTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
        );
        setEditingTask(null);
        return;
      }

      const newTask = await taskApi.createTask(values);
      setTasks((currentTasks) => [newTask, ...currentTasks]);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not save the task.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleComplete = async (task: Task) => {
    setBusyTaskId(task.id);
    setErrorMessage('');

    try {
      const updatedTask = await taskApi.updateTask(task.id, { completed: !task.completed });
      setTasks((currentTasks) =>
        currentTasks.map((currentTask) => (currentTask.id === updatedTask.id ? updatedTask : currentTask)),
      );

      if (editingTask?.id === updatedTask.id) {
        setEditingTask(updatedTask);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not update this task.');
    } finally {
      setBusyTaskId(null);
    }
  };

  const deleteTask = async (taskId: number) => {
    setBusyTaskId(taskId);
    setErrorMessage('');

    try {
      await taskApi.deleteTask(taskId);
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));

      if (editingTask?.id === taskId) {
        setEditingTask(null);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not delete this task.');
    } finally {
      setBusyTaskId(null);
    }
  };

  return {
    tasks,
    filteredTasks,
    activeFilter,
    editingTask,
    isLoading,
    isSubmitting,
    busyTaskId,
    errorMessage,
    setActiveFilter,
    setEditingTask,
    saveTask,
    toggleComplete,
    deleteTask
  };
}
