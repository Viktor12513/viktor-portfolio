import type { Task, TaskPayload } from '../types/task';

const API_BASE_URL = '/api/tasks';

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(errorData?.message ?? 'Something went wrong while talking to the API.');
  }

  return (await response.json()) as T;
}

export const taskApi = {
  getTasks: async () => {
    const response = await fetch(API_BASE_URL);
    return handleResponse<Task[]>(response);
  },
  createTask: async (payload: TaskPayload) => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    return handleResponse<Task>(response);
  },
  updateTask: async (taskId: number, payload: Partial<TaskPayload>) => {
    const response = await fetch(`${API_BASE_URL}/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    return handleResponse<Task>(response);
  },
  deleteTask: async (taskId: number) => {
    const response = await fetch(`${API_BASE_URL}/${taskId}`, {
      method: 'DELETE'
    });

    return handleResponse<Task>(response);
  }
};
