import cors from 'cors';
import express from 'express';
import postRoutes from './routes/postRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Blog Platform API is running' });
});

app.use('/api/posts', postRoutes);

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
});

export default app;
