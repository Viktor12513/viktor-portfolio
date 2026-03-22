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

function isAllowedOrigin(origin) {
  if (!origin) {
    return true;
  }

  const allowedOrigins = [frontendUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'].filter(Boolean);

  if (allowedOrigins.includes(origin)) {
    return true;
  }

  try {
    const parsedOrigin = new URL(origin);
    const hostname = parsedOrigin.hostname;

    if (hostname.endsWith('.vercel.app')) {
      return true;
    }

    if (hostname === 'www.viktorhagman.se' || hostname === 'viktorhagman.se') {
      return true;
    }
  } catch {
    return false;
  }

  return false;
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    }
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
