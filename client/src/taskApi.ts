import { buildApiUrl } from './apiConfig';
import type { Task, TaskFormValues } from './taskTypes';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(errorData?.message ?? 'Something went wrong while talking to the API.');
  }

  return (await response.json()) as T;
}

export const taskApi = {
  getTasks: async () => {
    const response = await fetch(buildApiUrl('/api/tasks'));
    return handleResponse<Task[]>(response);
  },
  createTask: async (payload: TaskFormValues) => {
    const response = await fetch(buildApiUrl('/api/tasks'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    return handleResponse<Task>(response);
  },
  updateTask: async (taskId: number, payload: Partial<TaskFormValues> & { completed?: boolean }) => {
    const response = await fetch(buildApiUrl(`/api/tasks/${taskId}`), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    return handleResponse<Task>(response);
  },
  deleteTask: async (taskId: number) => {
    const response = await fetch(buildApiUrl(`/api/tasks/${taskId}`), {
      method: 'DELETE'
    });

    return handleResponse<Task>(response);
  }
};
