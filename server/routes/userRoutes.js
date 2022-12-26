import express from 'express';

const router = express.Router();

router.get('/:id');
router.post('/:id/:friendId');

export default router;
