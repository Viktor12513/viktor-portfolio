import { entryStore } from '../data/entryStore.js';

let nextEntryId = entryStore.length + 1;

export const EntryModel = {
  findAll() {
    return [...entryStore].sort((firstEntry, secondEntry) => {
      return new Date(secondEntry.date).getTime() - new Date(firstEntry.date).getTime();
    });
  },

  create(entryData) {
    const timestamp = new Date().toISOString();
    const newEntry = {
      id: nextEntryId++,
      title: entryData.title.trim(),
      amount: entryData.amount,
      category: entryData.category.trim(),
      type: entryData.type,
      date: entryData.date,
      notes: entryData.notes.trim(),
      createdAt: timestamp,
      updatedAt: timestamp
    };

    entryStore.push(newEntry);
    return newEntry;
  },

  delete(entryId) {
    const entryIndex = entryStore.findIndex((entry) => entry.id === entryId);

    if (entryIndex === -1) {
      return null;
    }

    return entryStore.splice(entryIndex, 1)[0];
  }
};
