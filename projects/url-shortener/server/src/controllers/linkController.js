import { LinkModel } from '../models/linkModel.js';
import { getAppBaseUrl } from '../config/env.js';
import { mapLinkResponse } from '../services/mapLinkResponse.js';
import { generateShortCode } from '../utils/generateShortCode.js';

async function createUniqueShortCode() {
  let shortCode = generateShortCode();

  while (await LinkModel.exists({ shortCode })) {
    shortCode = generateShortCode();
  }

  return shortCode;
}

export async function createShortLink(req, res, next) {
  try {
    const { originalUrl, expiresAt } = req.body;
    const baseUrl = getAppBaseUrl();

    const existingLink = await LinkModel.findOne({ originalUrl });
    if (existingLink) {
      return res.status(200).json(mapLinkResponse(existingLink, baseUrl));
    }

    const shortCode = await createUniqueShortCode();
    const newLink = await LinkModel.create({
      originalUrl,
      shortCode,
      expiresAt: expiresAt ? new Date(expiresAt) : null
    });

    return res.status(201).json(mapLinkResponse(newLink, baseUrl));
  } catch (error) {
    return next(error);
  }
}

export async function getAllLinks(_req, res, next) {
  try {
    const baseUrl = getAppBaseUrl();
    const links = await LinkModel.find().sort({ createdAt: -1 });
    return res.json(links.map((link) => mapLinkResponse(link, baseUrl)));
  } catch (error) {
    return next(error);
  }
}

export async function getLinkById(req, res, next) {
  try {
    const baseUrl = getAppBaseUrl();
    const link = await LinkModel.findById(req.params.id);

    if (!link) {
      return res.status(404).json({ message: 'Link not found.' });
    }

    return res.json(mapLinkResponse(link, baseUrl));
  } catch (error) {
    return next(error);
  }
}

export async function redirectToOriginalUrl(req, res, next) {
  try {
    const link = await LinkModel.findOne({ shortCode: req.params.shortCode });

    if (!link) {
      return res.status(404).json({ message: 'Short link not found.' });
    }

    if (link.expiresAt && link.expiresAt.getTime() < Date.now()) {
      return res.status(410).json({ message: 'This short link has expired.' });
    }

    link.clickCount += 1;
    link.visits.push({ visitedAt: new Date() });
    await link.save();

    return res.redirect(link.originalUrl);
  } catch (error) {
    return next(error);
  }
}
