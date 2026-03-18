# Expense Tracker

A clean beginner-friendly fullstack expense tracker built for the portfolio workspace.

## Tech Stack

- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Node.js + Express
- Database: in-memory fallback by default

## Features

- Add income and expense entries
- Delete entries
- Show total balance
- Show category summaries
- Simple summary UI for financial overview
- Validation, loading states, and error handling

## Step-by-Step Setup

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

## How To Run Frontend

```bash
cd C:\Users\vigge\Fullstack\projects\expense-tracker\client
npm run dev
```

Frontend URL:

- [http://localhost:5173](http://localhost:5173)

## How To Run Backend

```bash
cd C:\Users\vigge\Fullstack\projects\expense-tracker\server
npm run dev
```

Backend URL:

- [http://localhost:5000](http://localhost:5000)

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

## Where To Customize Things

- Main page layout:
  - `client/src/App.tsx`
- Form fields and validation:
  - `client/src/components/expense/ExpenseForm.tsx`
- Summary cards and breakdown:
  - `client/src/components/expense/SummaryCards.tsx`
  - `client/src/components/expense/CategorySummary.tsx`
- Backend starter data:
  - `server/src/data/entryStore.js`
- Backend validation:
  - `server/src/utils/validateEntry.js`

## Notes

- The project uses an in-memory store, so entries reset when the server restarts.
- The structure is intentionally simple so it stays beginner-friendly and easy to explain.
