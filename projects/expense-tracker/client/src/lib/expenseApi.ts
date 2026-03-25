import { buildApiUrl } from './apiConfig';
import type { ExpenseEntry } from '../types/expense';

type ExpensePayload = {
  title: string;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  date: string;
  notes: string;
};

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = (await response.json().catch(() => null)) as { message?: string } | null;
    throw new Error(errorData?.message ?? 'Something went wrong while talking to the API.');
  }

  return (await response.json()) as T;
}

export const expenseApi = {
  getEntries: async () => {
    const response = await fetch(buildApiUrl('/api/entries'));
    return handleResponse<ExpenseEntry[]>(response);
  },
  createEntry: async (payload: ExpensePayload) => {
    const response = await fetch(buildApiUrl('/api/entries'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    return handleResponse<ExpenseEntry>(response);
  },
  deleteEntry: async (entryId: number) => {
    const response = await fetch(buildApiUrl(`/api/entries/${entryId}`), {
      method: 'DELETE'
    });

    return handleResponse<ExpenseEntry>(response);
  }
};
