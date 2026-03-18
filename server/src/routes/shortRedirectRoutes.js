import { Router } from 'express';
import { redirectShortLink } from '../controllers/shortLinkController.js';

const router = Router();

router.get('/s/:shortCode', redirectShortLink);

export default router;
