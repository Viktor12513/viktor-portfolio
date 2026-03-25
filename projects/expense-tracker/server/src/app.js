import cors from 'cors';
import express from 'express';
import entryRoutes from './routes/entryRoutes.js';

const app = express();
const frontendUrl = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: frontendUrl ? [frontendUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'] : true
  }),
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Expense Tracker API is running' });
});

app.use('/api/entries', entryRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

export default app;
