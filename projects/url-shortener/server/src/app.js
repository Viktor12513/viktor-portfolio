import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import linkRoutes from './routes/linkRoutes.js';
import redirectRoutes from './routes/redirectRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const frontendUrl = process.env.FRONTEND_URL;

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests. Please try again in a minute.' }
});

app.use(
  cors({
    origin: frontendUrl ? [frontendUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'] : true
  }),
);
app.use(express.json());
app.use(morgan('dev'));
app.use(limiter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'URL Shortener API is running' });
});

app.use('/api', linkRoutes);
app.use('/', redirectRoutes);

app.use(errorHandler);

export default app;
