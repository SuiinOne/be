import { Router } from 'express';
import { createLike, deleteLike, getLikes } from '../controllers/likeController';

const router = Router();


/**
 * @swagger
 * /api/listing/{id}/like:
 *   post:
 *     summary: 좋아요 누르기
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               walletAddress:
 *                 type: string
 *     responses:
 *       201:
 *         description: 좋아요 성공
 */
router.post('/listing/:id/like', createLike);

/**
 * @swagger
 * /api/listing/{id}/like:
 *   delete:
 *     summary: 좋아요 취소
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               walletAddress:
 *                 type: string
 *     responses:
 *       200:
 *         description: 좋아요 취소됨
 */
router.delete('/listing/:id/like', deleteLike);

/**
 * @swagger
 * /api/listing/{id}/likes:
 *   get:
 *     summary: 좋아요 수 조회
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 좋아요 수
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: number
 */
router.get('/listing/:id/likes', getLikes);

export default router;
