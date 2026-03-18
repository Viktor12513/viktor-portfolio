import { Router } from 'express';
import { redirectToOriginalUrl } from '../controllers/linkController.js';

const router = Router();

router.get('/:shortCode', redirectToOriginalUrl);

export default router;
