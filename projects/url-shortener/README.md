# URL Shortener with Analytics

A standalone backend-focused fullstack project for shortening URLs, redirecting visitors, and tracking click analytics with MongoDB and Mongoose.

## Tech Stack

- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: MongoDB with Mongoose

## Features

- Create short URLs from long links
- Redirect users from short codes to original URLs
- Store links in MongoDB
- Track click counts and visit timestamps
- Support optional expiration dates
- Include request logging and basic rate limiting

## Project Structure

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
2. Copy `client/.env.example` to `.env` if needed
3. Copy `server/.env.example` to `.env`
4. Install frontend dependencies:

```bash
cd C:\Users\vigge\Fullstack\projects\url-shortener\client
npm install
```

5. Install backend dependencies:

```bash
cd C:\Users\vigge\Fullstack\projects\url-shortener\server
npm install
```

## Run The App

Frontend:

```bash
cd C:\Users\vigge\Fullstack\projects\url-shortener\client
npm run dev
```

Backend:

```bash
cd C:\Users\vigge\Fullstack\projects\url-shortener\server
npm run dev
```

## Environment Variables

Frontend:

- `VITE_API_BASE_URL=http://localhost:5000`

Backend:

- `PORT=5000`
- `MONGODB_URI=mongodb://127.0.0.1:27017/url-shortener`
- `FRONTEND_URL=http://localhost:5173`
- `PUBLIC_BASE_URL=http://localhost:5000`

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

## Deployment Notes

- Frontend can be deployed on Vercel from `projects/url-shortener/client`
- Backend can be deployed on Render from `projects/url-shortener/server`
- In production, set `VITE_API_BASE_URL` to your backend URL
- In production, set `FRONTEND_URL` to your deployed frontend URL
- In production, set `PUBLIC_BASE_URL` to your deployed backend URL so generated short links are correct

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

## Notes

- This project requires MongoDB to be running unless you point `MONGODB_URI` to another database instance.
- The code is intentionally organized clearly so the backend flow is easier to explain in interviews.
