import { isValidUrl } from '../utils/isValidUrl.js';

export function validateShortenRequest(req, res, next) {
  const { originalUrl, expiresAt } = req.body;

  if (!originalUrl || typeof originalUrl !== 'string' || !isValidUrl(originalUrl)) {
    return res.status(400).json({ message: 'Please provide a valid URL that starts with http:// or https://.' });
  }

  if (expiresAt !== undefined && expiresAt !== null && Number.isNaN(Date.parse(expiresAt))) {
    return res.status(400).json({ message: 'expiresAt must be a valid date if provided.' });
  }

  return next();
}
