import { useEffect, useMemo, useState } from 'react';
import { expenseApi } from '../lib/expenseApi';
import type { CategorySummary, ExpenseEntry, ExpenseFormValues } from '../types/expense';

export function useExpenseTracker() {
  const [entries, setEntries] = useState<ExpenseEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [busyEntryId, setBusyEntryId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadEntries = async () => {
      setIsLoading(true);
      setErrorMessage('');

      try {
        const response = await expenseApi.getEntries();
        setEntries(response);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : 'Could not load entries.');
      } finally {
        setIsLoading(false);
      }
    };

    void loadEntries();
  }, []);

  const categorySummaries = useMemo<CategorySummary[]>(() => {
    const groupedEntries = new Map<string, CategorySummary>();

    entries.forEach((entry) => {
      const key = `${entry.type}-${entry.category.toLowerCase()}`;
      const existingSummary = groupedEntries.get(key);

      if (existingSummary) {
        existingSummary.total += entry.amount;
        return;
      }

      groupedEntries.set(key, {
        category: entry.category,
        total: entry.amount,
        type: entry.type
      });
    });

    return [...groupedEntries.values()].sort((firstSummary, secondSummary) => secondSummary.total - firstSummary.total);
  }, [entries]);

  const createEntry = async (values: ExpenseFormValues) => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const createdEntry = await expenseApi.createEntry({
        title: values.title.trim(),
        amount: Number(values.amount),
        category: values.category.trim(),
        type: values.type,
        date: values.date,
        notes: values.notes.trim()
      });

      setEntries((currentEntries) => [createdEntry, ...currentEntries]);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not save this entry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteEntry = async (entryId: number) => {
    setBusyEntryId(entryId);
    setErrorMessage('');

    try {
      await expenseApi.deleteEntry(entryId);
      setEntries((currentEntries) => currentEntries.filter((entry) => entry.id !== entryId));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Could not delete this entry.');
    } finally {
      setBusyEntryId(null);
    }
  };

  return {
    entries,
    categorySummaries,
    isLoading,
    isSubmitting,
    busyEntryId,
    errorMessage,
    createEntry,
    deleteEntry
  };
}
