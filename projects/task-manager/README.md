# Task Manager App

A standalone junior-friendly fullstack project for creating, updating, completing, and filtering tasks through a clean React interface and a simple Express API.

## Tech Stack

- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Node.js + Express
- Data: In-memory store by default

## Features

- Create new tasks with title, description, priority, and due date
- Edit existing tasks
- Mark tasks as complete
- Delete tasks from the list
- Filter between all, active, and completed tasks
- Show loading, validation, and error states

## Project Structure

```text
task-manager/
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

1. Open a terminal in `C:\Users\vigge\Fullstack\projects\task-manager`
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
cd C:\Users\vigge\Fullstack\projects\task-manager\client
npm run dev
```

Backend:

```bash
cd C:\Users\vigge\Fullstack\projects\task-manager\server
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
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Example Create Request

```json
{
  "title": "Finish portfolio updates",
  "description": "Review project cards and deploy the latest changes",
  "priority": "High",
  "dueDate": "2026-04-08",
  "completed": false
}
```

## Deployment Notes

- Frontend can be deployed on Vercel from `projects/task-manager/client`
- Backend can be deployed on Render from `projects/task-manager/server`
- In production, set `VITE_API_BASE_URL` to your backend URL
- In production, set `FRONTEND_URL` on the backend to your deployed frontend URL

## Where To Customize

- Main page layout:
  - `client/src/App.tsx`
- Header and hero:
  - `client/src/components/tasks/AppHeader.tsx`
  - `client/src/components/tasks/ProjectHero.tsx`
- Task creation and editing form:
  - `client/src/components/tasks/TaskForm.tsx`
- Filters and summary:
  - `client/src/components/tasks/TaskFilters.tsx`
  - `client/src/components/tasks/TaskSummary.tsx`
- Backend starter data:
  - `server/src/data/taskStore.js`
- Backend validation:
  - `server/src/utils/validateTask.js`

## Notes

- The project uses an in-memory store, so tasks reset when the server restarts.
- The code is intentionally kept simple and readable so it stays easy to explain in interviews.
