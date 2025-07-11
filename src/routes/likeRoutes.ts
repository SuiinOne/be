import { Router } from 'express';
import { createLike, deleteLike, getLikes } from '../controllers/likeController';

const router = Router();

router.post('/listing/:id/like', createLike);
router.delete('/listing/:id/like', deleteLike);
router.get('/listing/:id/likes', getLikes);

export default router;
