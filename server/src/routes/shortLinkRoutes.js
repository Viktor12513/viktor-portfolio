import { Router } from 'express';
import {
  createShortLink,
  getAllShortLinks,
  getShortLinkById
} from '../controllers/shortLinkController.js';

const router = Router();

router.post('/shorten', createShortLink);
router.get('/short-links', getAllShortLinks);
router.get('/short-links/:id', getShortLinkById);

export default router;
