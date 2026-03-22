import { shortLinkStore } from '../data/shortLinkStore.js';
import { generatePortfolioShortCode } from '../utils/generatePortfolioShortCode.js';

function mapShortUrl(shortCode) {
  const baseUrl = process.env.PUBLIC_BASE_URL?.replace(/\/+$/, '') ?? 'http://localhost:5000';
  return `${baseUrl}/s/${shortCode}`;
}

export const ShortLinkModel = {
  findAll() {
    return [...shortLinkStore]
      .sort((firstLink, secondLink) => new Date(secondLink.createdAt).getTime() - new Date(firstLink.createdAt).getTime())
      .map((link) => ({ ...link, shortUrl: mapShortUrl(link.shortCode) }));
  },

  findById(linkId) {
    const link = shortLinkStore.find((item) => item.id === linkId);
    return link ? { ...link, shortUrl: mapShortUrl(link.shortCode) } : null;
  },

  findByShortCode(shortCode) {
    return shortLinkStore.find((item) => item.shortCode === shortCode) ?? null;
  },

  create(originalUrl) {
    const existingLink = shortLinkStore.find((item) => item.originalUrl === originalUrl);
    if (existingLink) {
      return { ...existingLink, shortUrl: mapShortUrl(existingLink.shortCode) };
    }

    let shortCode = generatePortfolioShortCode();
    while (shortLinkStore.some((item) => item.shortCode === shortCode)) {
      shortCode = generatePortfolioShortCode();
    }

    const newLink = {
      id: String(shortLinkStore.length + 1),
      originalUrl,
      shortCode,
      clickCount: 0,
      createdAt: new Date().toISOString(),
      visits: []
    };

    shortLinkStore.push(newLink);
    return { ...newLink, shortUrl: mapShortUrl(shortCode) };
  },

  registerVisit(shortCode) {
    const link = shortLinkStore.find((item) => item.shortCode === shortCode);
    if (!link) {
      return null;
    }

    link.clickCount += 1;
    link.visits.push({ visitedAt: new Date().toISOString() });
    return { ...link, shortUrl: mapShortUrl(link.shortCode) };
  }
};
