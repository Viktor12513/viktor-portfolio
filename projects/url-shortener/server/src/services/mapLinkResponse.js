export function mapLinkResponse(linkDocument, baseUrl) {
  return {
    id: String(linkDocument._id),
    originalUrl: linkDocument.originalUrl,
    shortCode: linkDocument.shortCode,
    shortUrl: `${baseUrl}/${linkDocument.shortCode}`,
    clickCount: linkDocument.clickCount,
    createdAt: linkDocument.createdAt,
    expiresAt: linkDocument.expiresAt,
    visits: linkDocument.visits
  };
}
