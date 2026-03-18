import { EntryModel } from '../models/entryModel.js';
import { validateEntryInput } from '../utils/validateEntry.js';

export function getEntries(_req, res) {
  res.json(EntryModel.findAll());
}

export function createEntry(req, res) {
  const validation = validateEntryInput(req.body);

  if (!validation.isValid) {
    return res.status(400).json({
      message: 'Please fix the validation errors and try again.',
      errors: validation.errors
    });
  }

  const newEntry = EntryModel.create(req.body);
  return res.status(201).json(newEntry);
}

export function deleteEntry(req, res) {
  const entryId = Number(req.params.id);
  const deletedEntry = EntryModel.delete(entryId);

  if (!deletedEntry) {
    return res.status(404).json({ message: 'Entry not found.' });
  }

  return res.json(deletedEntry);
}
