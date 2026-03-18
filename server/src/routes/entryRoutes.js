import { Router } from 'express';
import { createEntry, deleteEntry, getEntries } from '../controllers/entryController.js';

const router = Router();

router.get('/', getEntries);
router.post('/', createEntry);
router.delete('/:id', deleteEntry);

export default router;
