import cors from 'cors';
import express from 'express';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const frontendUrl = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: frontendUrl ? [frontendUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'] : true
  }),
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Task Manager API is running' });
});

app.use('/api/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

export default app;
