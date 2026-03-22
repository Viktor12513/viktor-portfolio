export function validatePostInput(input) {
  const errors = {};

  if (typeof input.title !== 'string' || !input.title.trim()) {
    errors.title = 'Title is required.';
  } else if (input.title.trim().length > 100) {
    errors.title = 'Title must be 100 characters or fewer.';
  }

  if (typeof input.excerpt !== 'string' || !input.excerpt.trim()) {
    errors.excerpt = 'Excerpt is required.';
  } else if (input.excerpt.trim().length > 180) {
    errors.excerpt = 'Excerpt must be 180 characters or fewer.';
  }

  if (typeof input.content !== 'string' || !input.content.trim()) {
    errors.content = 'Content is required.';
  } else if (input.content.trim().length > 3000) {
    errors.content = 'Content must be 3000 characters or fewer.';
  }

  if (typeof input.author !== 'string' || !input.author.trim()) {
    errors.author = 'Author is required.';
  } else if (input.author.trim().length > 50) {
    errors.author = 'Author must be 50 characters or fewer.';
  }

  if (typeof input.category !== 'string' || !input.category.trim()) {
    errors.category = 'Category is required.';
  } else if (input.category.trim().length > 40) {
    errors.category = 'Category must be 40 characters or fewer.';
  }

  if (typeof input.published !== 'boolean') {
    errors.published = 'Published must be a boolean value.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}
