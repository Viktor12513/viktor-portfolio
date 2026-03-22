# Blog Platform

A clean beginner-friendly fullstack blog platform built for the portfolio workspace.

## Tech Stack

- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: in-memory fallback by default

## Features

- Create blog posts
- Edit blog posts
- Delete blog posts
- Mark posts as published or draft
- View all posts in a clean content dashboard
- Form validation, loading states, and error handling

## Step-by-Step Setup

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

## How To Run Frontend

```bash
cd C:\Users\vigge\Fullstack\projects\blog-platform\client
npm run dev
```

## How To Run Backend

```bash
cd C:\Users\vigge\Fullstack\projects\blog-platform\server
npm run dev
```

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

## Where To Customize Things

- Main page layout:
  - `client/src/App.tsx`
- Post form:
  - `client/src/components/blog/PostForm.tsx`
- Post list:
  - `client/src/components/blog/PostList.tsx`
- Backend starter data:
  - `server/src/data/postStore.js`
- Backend validation:
  - `server/src/utils/validatePost.js`

## Notes

- The project uses an in-memory store, so posts reset when the server restarts.
- The structure is intentionally simple so it stays beginner-friendly and easy to explain.
