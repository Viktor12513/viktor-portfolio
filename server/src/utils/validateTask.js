const allowedPriorities = ['Low', 'Medium', 'High'];

export function validateTaskInput(input, isUpdate = false) {
  const errors = {};

  if (!isUpdate || input.title !== undefined) {
    if (typeof input.title !== 'string' || !input.title.trim()) {
      errors.title = 'Title is required.';
    } else if (input.title.trim().length > 80) {
      errors.title = 'Title must be 80 characters or fewer.';
    }
  }

  if (!isUpdate || input.description !== undefined) {
    if (input.description !== undefined && typeof input.description !== 'string') {
      errors.description = 'Description must be a string.';
    } else if (typeof input.description === 'string' && input.description.trim().length > 240) {
      errors.description = 'Description must be 240 characters or fewer.';
    }
  }

  if (!isUpdate || input.priority !== undefined) {
    if (!allowedPriorities.includes(input.priority)) {
      errors.priority = 'Priority must be Low, Medium, or High.';
    }
  }

  if (!isUpdate || input.dueDate !== undefined) {
    if (typeof input.dueDate !== 'string' || Number.isNaN(Date.parse(input.dueDate))) {
      errors.dueDate = 'Due date must be a valid date.';
    }
  }

  if (input.completed !== undefined && typeof input.completed !== 'boolean') {
    errors.completed = 'Completed must be a boolean value.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
