import { ShortLinkModel } from '../models/shortLinkModel.js';
import { validatePortfolioUrl } from '../utils/validatePortfolioUrl.js';

export function createShortLink(req, res) {
  const { originalUrl } = req.body;

  if (!originalUrl || typeof originalUrl !== 'string' || !validatePortfolioUrl(originalUrl)) {
    return res.status(400).json({ message: 'Please provide a valid URL that starts with http:// or https://.' });
  }

  const createdLink = ShortLinkModel.create(originalUrl);
  return res.status(201).json(createdLink);
}

export function getAllShortLinks(_req, res) {
  res.json(ShortLinkModel.findAll());
}

export function getShortLinkById(req, res) {
  const link = ShortLinkModel.findById(req.params.id);

  if (!link) {
    return res.status(404).json({ message: 'Short link not found.' });
  }

  return res.json(link);
}

export function redirectShortLink(req, res) {
  const link = ShortLinkModel.registerVisit(req.params.shortCode);

  if (!link) {
    return res.status(404).json({ message: 'Short link not found.' });
  }

  return res.redirect(link.originalUrl);
}
