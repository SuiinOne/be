// src/routes/listingRoutes.ts
import { Router } from 'express';
import { getListingById, getListings } from '../controllers/listController';

const router = Router();

/**
 * @openapi
 * /api/listing:
 *   get:
 *     summary: 전체 listing 목록 조회
 *     responses:
 *       200:
 *         description: listing 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   owner:
 *                     type: string
 *                   active:
 *                     type: boolean
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   game_type_id:
 *                     type: integer
 */
router.get('/', getListings);

/**
 * @openapi
 * /api/listing/{id}:
 *   get:
 *     summary: 특정 listing 상세 조회
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: listing 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 price:
 *                   type: number
 *                 owner:
 *                   type: string
 *                 active:
 *                   type: boolean
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 game_type_id:
 *                   type: integer
 *       404:
 *         description: 해당 listing을 찾을 수 없음
 */
router.get('/:id', getListingById);

export default router;
