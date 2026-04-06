# Blog Platform

A standalone junior-friendly fullstack project for writing, editing, publishing, and managing blog posts through a clean React dashboard and a simple Express API.

## Tech Stack

- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Node.js + Express
- Data: In-memory store by default

## Features

- Create new blog posts
- Edit existing posts
- Delete posts
- Mark posts as published or draft
- View content in a simple dashboard
- Show loading, validation, and error states

## Project Structure

```text
blog-platform/
  client/
    src/
      components/
      hooks/
      lib/
      types/
  server/
    src/
      controllers/
      data/
      models/
      routes/
      utils/
```

## Local Setup

1. Open a terminal in `C:\Users\vigge\Fullstack\projects\blog-platform`
2. Install frontend dependencies:

```bash
cd client
npm install
```

3. Install backend dependencies:

```bash
cd ..\server
npm install
```

## Run The App

Frontend:

```bash
cd C:\Users\vigge\Fullstack\projects\blog-platform\client
npm run dev
```

Backend:

```bash
cd C:\Users\vigge\Fullstack\projects\blog-platform\server
npm run dev
```

## Environment Variables

Frontend:

- Copy `client/.env.example` to `.env`
- Set `VITE_API_BASE_URL` when deploying the frontend separately

Backend:

- Copy `server/.env.example` to `.env`
- Set `FRONTEND_URL` when deploying the backend separately
- Set `PORT` only if your host requires it

## Example API Routes

- `GET /api/health`
- `GET /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts`
- `PUT /api/posts/:id`
- `DELETE /api/posts/:id`

## Example Create Request

```json
{
  "title": "Learning Express routing",
  "excerpt": "A short summary of what I learned building Express routes.",
  "content": "This post explains how I practiced route handlers, validation, and CRUD operations.",
  "author": "Viktor Hagman",
  "category": "Backend",
  "published": true
}
```

## Deployment Notes

- Frontend can be deployed on Vercel from `projects/blog-platform/client`
- Backend can be deployed on Render from `projects/blog-platform/server`
- In production, set `VITE_API_BASE_URL` to your backend URL
- In production, set `FRONTEND_URL` on the backend to your deployed frontend URL

## Where To Customize

- Main page layout:
  - `client/src/App.tsx`
- Header and hero:
  - `client/src/components/blog/AppHeader.tsx`
  - `client/src/components/blog/ProjectHero.tsx`
- Post form:
  - `client/src/components/blog/PostForm.tsx`
- Post list and stats:
  - `client/src/components/blog/PostList.tsx`
  - `client/src/components/blog/PostStats.tsx`
- Backend starter data:
  - `server/src/data/postStore.js`
- Backend validation:
  - `server/src/utils/validatePost.js`

## Notes

- The project uses an in-memory store, so posts reset when the server restarts.
- The code is intentionally kept simple and readable so it stays easy to explain in interviews.
