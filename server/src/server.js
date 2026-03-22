import cors from 'cors';
import express from 'express';
import { featuredProjects } from './data/projects.js';
import entryRoutes from './routes/entryRoutes.js';
import postRoutes from './routes/postRoutes.js';
import shortRedirectRoutes from './routes/shortRedirectRoutes.js';
import shortLinkRoutes from './routes/shortLinkRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const frontendUrl = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: frontendUrl ? [frontendUrl, 'http://localhost:5173'] : true
  }),
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Portfolio API is running' });
});

app.get('/api/projects', (_req, res) => {
  res.json(featuredProjects);
});

app.use('/api/posts', postRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/entries', entryRoutes);
app.use('/api', shortLinkRoutes);
app.use('/', shortRedirectRoutes);

app.listen(PORT, () => {
  console.log(`Portfolio server running at http://localhost:${PORT}`);
});
