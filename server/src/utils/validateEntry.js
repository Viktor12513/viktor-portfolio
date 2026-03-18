const allowedTypes = ['income', 'expense'];

export function validateEntryInput(input) {
  const errors = {};

  if (typeof input.title !== 'string' || !input.title.trim()) {
    errors.title = 'Title is required.';
  } else if (input.title.trim().length > 80) {
    errors.title = 'Title must be 80 characters or fewer.';
  }

  if (typeof input.category !== 'string' || !input.category.trim()) {
    errors.category = 'Category is required.';
  } else if (input.category.trim().length > 40) {
    errors.category = 'Category must be 40 characters or fewer.';
  }

  if (typeof input.notes !== 'string') {
    errors.notes = 'Notes must be a string.';
  } else if (input.notes.trim().length > 200) {
    errors.notes = 'Notes must be 200 characters or fewer.';
  }

  if (typeof input.amount !== 'number' || Number.isNaN(input.amount) || input.amount <= 0) {
    errors.amount = 'Amount must be a number greater than 0.';
  }

  if (!allowedTypes.includes(input.type)) {
    errors.type = 'Type must be income or expense.';
  }

  if (typeof input.date !== 'string' || Number.isNaN(Date.parse(input.date))) {
    errors.date = 'Date must be a valid date.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
