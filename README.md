# Viktor Hagman Portfolio

A junior fullstack developer portfolio built with React, TypeScript, Vite, Tailwind CSS, Node.js, and Express.

## Workspace Structure

```text
Fullstack/
  client/                  # Portfolio frontend
  server/                  # Portfolio backend
  projects/
    task-manager/
      client/              # Task Manager frontend
      server/              # Task Manager backend
    blog-platform/
      client/              # Blog Platform frontend
      server/              # Blog Platform backend
    expense-tracker/
      client/              # Expense Tracker frontend
      server/              # Expense Tracker backend
    url-shortener/
      client/              # URL Shortener frontend
      server/              # URL Shortener backend
```

## What Lives Where

- Main portfolio app:
  - `client`
  - `server`
- Included portfolio project:
  - `projects/task-manager/client`
  - `projects/task-manager/server`
  - `projects/blog-platform/client`
  - `projects/blog-platform/server`
  - `projects/expense-tracker/client`
  - `projects/expense-tracker/server`
  - `projects/url-shortener/client`
  - `projects/url-shortener/server`

## Run The Portfolio

Frontend:

```bash
cd C:\Users\vigge\Fullstack\client
npm run dev
```

Backend:

```bash
cd C:\Users\vigge\Fullstack\server
npm run dev
```

Run both from root:

```bash
cd C:\Users\vigge\Fullstack
npm run dev
```

## Connect Frontend And Backend In Production

The portfolio frontend and backend can be deployed separately.

Frontend:

- Deploy `client` to Vercel
- Set `VITE_API_BASE_URL` to your deployed backend URL

Backend:

- Deploy `server` to a Node host such as Render or Railway
- Set `FRONTEND_URL` to your deployed frontend URL
- Set `PUBLIC_BASE_URL` to your deployed backend URL

Example:

- Frontend URL: `https://your-portfolio.vercel.app`
- Backend URL: `https://your-portfolio-api.onrender.com`
- `VITE_API_BASE_URL=https://your-portfolio-api.onrender.com`
- `FRONTEND_URL=https://your-portfolio.vercel.app`
- `PUBLIC_BASE_URL=https://your-portfolio-api.onrender.com`

## Run The Task Manager Project

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

## Run The Expense Tracker Project

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

## Run The Blog Platform Project

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

## Run The URL Shortener Project

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

## Where To Edit The Portfolio

- Main content:
  - `client/src/data/portfolio.ts`
- Portfolio page layout:
  - `client/src/App.tsx`
- Shared styling:
  - `client/src/index.css`
- Embedded Task Manager live demo:
  - `client/src/components/task-demo`
- Embedded Blog Platform live demo:
  - `client/src/components/blog-demo`
- Embedded Expense Tracker live demo:
  - `client/src/components/expense-demo`
- Embedded URL Shortener live demo:
  - `client/src/components/url-demo`
- Embedded Task Manager API:
  - `server/src/routes/taskRoutes.js`
  - `server/src/controllers/taskController.js`
  - `server/src/models/taskModel.js`
- Embedded Blog Platform API:
  - `server/src/routes/postRoutes.js`
  - `server/src/controllers/postController.js`
  - `server/src/models/postModel.js`
- Embedded Expense Tracker API:
  - `server/src/routes/entryRoutes.js`
  - `server/src/controllers/entryController.js`
  - `server/src/models/entryModel.js`
- Embedded URL Shortener API:
  - `server/src/routes/shortLinkRoutes.js`
  - `server/src/controllers/shortLinkController.js`
  - `server/src/models/shortLinkModel.js`

## Where To Edit The Task Manager Project

- Task Manager UI:
  - `projects/task-manager/client/src/App.tsx`
- Task Manager components:
  - `projects/task-manager/client/src/components/tasks`
- Task API:
  - `projects/task-manager/server/src`

## Where To Edit The Expense Tracker Project

- Expense Tracker UI:
  - `projects/expense-tracker/client/src/App.tsx`
- Expense Tracker components:
  - `projects/expense-tracker/client/src/components/expense`
- Expense Tracker API:
  - `projects/expense-tracker/server/src`

## Where To Edit The Blog Platform Project

- Blog Platform UI:
  - `projects/blog-platform/client/src/App.tsx`
- Blog Platform components:
  - `projects/blog-platform/client/src/components/blog`
- Blog Platform API:
  - `projects/blog-platform/server/src`

## Where To Edit The URL Shortener Project

- URL Shortener UI:
  - `projects/url-shortener/client/src/App.tsx`
- URL Shortener components:
  - `projects/url-shortener/client/src/components/shortener`
- URL Shortener API:
  - `projects/url-shortener/server/src`

## Notes

- The portfolio now includes the Task Manager App as a project inside the repository.
- The portfolio now also includes the Blog Platform project inside the repository.
- The portfolio now also includes the Expense Tracker project inside the repository.
- The portfolio now also includes the URL Shortener with Analytics project inside the repository.
- The Task Manager `Live Demo` button inside the portfolio opens a working demo section on the portfolio page.
- The Blog Platform `Live Demo` button inside the portfolio opens a working demo section on the portfolio page.
- The Expense Tracker `Live Demo` button inside the portfolio opens a working demo section on the portfolio page.
- The URL Shortener `Live Demo` button inside the portfolio opens a working demo section on the portfolio page.
- The Task Manager project uses an in-memory store by default, so task data resets when that server restarts.
- The Expense Tracker project uses an in-memory store by default, so entry data resets when that server restarts.
- The portfolio shortener demo uses an in-memory store, while the standalone `projects/url-shortener` app uses MongoDB.
- Replace placeholder GitHub, LinkedIn, demo, and email values in `client/src/data/portfolio.ts`.
