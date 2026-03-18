# URL Shortener with Analytics

A backend-focused fullstack app for shortening URLs and tracking usage analytics.

## Tech Stack

- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB with Mongoose

## Features

- Create short URLs from long links
- Redirect users from short codes to original URLs
- Store links in MongoDB
- Track click counts
- Store creation date
- Store visit timestamps
- Optional expiration date for links
- Basic rate limiting and request logging

## Cleaner Structure

Frontend:

- `client/src/components/shortener`
- `client/src/components/common`
- `client/src/hooks/useUrlShortener.ts`
- `client/src/lib/linkApi.ts`

Backend:

- `server/src/config`
- `server/src/controllers`
- `server/src/middleware`
- `server/src/models`
- `server/src/routes`
- `server/src/services`
- `server/src/utils`

## Setup Instructions

1. Make sure MongoDB is running locally or update the connection string in `.env`
2. Copy `.env.example` to `.env`
3. Install frontend dependencies:

```bash
cd C:\Users\vigge\Fullstack\projects\url-shortener\client
npm install
```

4. Install backend dependencies:

```bash
cd C:\Users\vigge\Fullstack\projects\url-shortener\server
npm install
```

## How To Run Frontend

```bash
cd C:\Users\vigge\Fullstack\projects\url-shortener\client
npm run dev
```

## How To Run Backend

```bash
cd C:\Users\vigge\Fullstack\projects\url-shortener\server
npm run dev
```

## Example API Requests

Create short URL:

```http
POST /api/shorten
Content-Type: application/json
```

```json
{
  "originalUrl": "https://example.com/articles/how-to-build-an-api",
  "expiresAt": "2026-04-01"
}
```

Get all links:

```http
GET /api/links
```

Get one link with analytics:

```http
GET /api/links/:id
```

Redirect using short code:

```http
GET /:shortCode
```

## How Short Codes Are Generated

Short codes are generated with `nanoid` using a custom alphabet of letters and numbers. Each generated code is 7 characters long, and the backend checks MongoDB before saving to make sure the code is unique.

## Where To Customize Things

- Frontend page layout:
  - `client/src/App.tsx`
- URL form:
  - `client/src/components/shortener/ShortenForm.tsx`
- Analytics panel:
  - `client/src/components/shortener/LinkAnalytics.tsx`
- Frontend state and request flow:
  - `client/src/hooks/useUrlShortener.ts`
- MongoDB schema:
  - `server/src/models/linkModel.js`
- Link creation and redirect logic:
  - `server/src/controllers/linkController.js`
- Response mapping:
  - `server/src/services/mapLinkResponse.js`
- Validation middleware:
  - `server/src/middleware/validateShortenRequest.js`
