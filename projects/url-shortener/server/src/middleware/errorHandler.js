export function errorHandler(error, _req, res, _next) {
  console.error(error);

  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid resource identifier.' });
  }

  return res.status(500).json({ message: 'Something went wrong on the server.' });
}
