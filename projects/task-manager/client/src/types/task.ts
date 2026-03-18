export type TaskStatusFilter = 'all' | 'active' | 'completed';

export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
};

export type TaskFormValues = {
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string;
};

export type TaskPayload = TaskFormValues & {
  completed?: boolean;
};
