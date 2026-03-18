export type EntryType = 'income' | 'expense';

export type ExpenseEntry = {
  id: number;
  title: string;
  amount: number;
  category: string;
  type: EntryType;
  date: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type ExpenseFormValues = {
  title: string;
  amount: string;
  category: string;
  type: EntryType;
  date: string;
  notes: string;
};

export type CategorySummary = {
  category: string;
  total: number;
  type: EntryType;
};
