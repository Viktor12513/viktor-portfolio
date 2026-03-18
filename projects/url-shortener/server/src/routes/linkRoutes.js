import { Router } from 'express';
import {
  createShortLink,
  getAllLinks,
  getLinkById
} from '../controllers/linkController.js';
import { validateShortenRequest } from '../middleware/validateShortenRequest.js';

const router = Router();

router.post('/shorten', validateShortenRequest, createShortLink);
router.get('/links', getAllLinks);
router.get('/links/:id', getLinkById);

export default router;
