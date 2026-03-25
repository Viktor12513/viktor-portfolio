# Expense Tracker

A standalone junior-friendly fullstack project for tracking income and expenses with a clean dashboard, category summaries, and a simple Express API.

## Tech Stack

- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Node.js + Express
- Data: In-memory store by default

## Features

- Add income and expense entries
- Delete entries from the dashboard
- View total balance, income, and expenses
- Review grouped category totals
- Show loading, validation, and error states

## Project Structure

```text
expense-tracker/
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

1. Open a terminal in `C:\Users\vigge\Fullstack\projects\expense-tracker`
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
cd C:\Users\vigge\Fullstack\projects\expense-tracker\client
npm run dev
```

Backend:

```bash
cd C:\Users\vigge\Fullstack\projects\expense-tracker\server
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
- `GET /api/entries`
- `POST /api/entries`
- `DELETE /api/entries/:id`

## Example Create Request

```json
{
  "title": "Client project payment",
  "amount": 500,
  "category": "Freelance",
  "type": "income",
  "date": "2026-03-20",
  "notes": "Landing page project"
}
```

## Deployment Notes

- Frontend can be deployed on Vercel from `projects/expense-tracker/client`
- Backend can be deployed on Render from `projects/expense-tracker/server`
- In production, set `VITE_API_BASE_URL` to your backend URL
- In production, set `FRONTEND_URL` on the backend to your deployed frontend URL

## Where To Customize

- Main page layout:
  - `client/src/App.tsx`
- Header and hero:
  - `client/src/components/expense/AppHeader.tsx`
  - `client/src/components/expense/ProjectHero.tsx`
- Form fields and validation:
  - `client/src/components/expense/ExpenseForm.tsx`
- Summary UI:
  - `client/src/components/expense/SummaryCards.tsx`
  - `client/src/components/expense/CategorySummary.tsx`
- Backend starter data:
  - `server/src/data/entryStore.js`
- Backend validation:
  - `server/src/utils/validateEntry.js`

## Notes

- The project uses an in-memory store, so entries reset when the server restarts.
- The code is intentionally kept simple and readable so it stays easy to explain in interviews.
