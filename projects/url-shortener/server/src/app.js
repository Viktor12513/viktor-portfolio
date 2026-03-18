import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import linkRoutes from './routes/linkRoutes.js';
import redirectRoutes from './routes/redirectRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests. Please try again in a minute.' }
});

app.use(cors());
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
