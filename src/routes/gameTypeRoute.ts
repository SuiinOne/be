// src/routes/acceptedTypeRoutes.ts
import { Router } from 'express';
import { getAcceptedTypes } from '../controllers/gameTypeController';

const router = Router();

/**
 * @openapi
 * /api/accepted-types:
 *   get:
 *     summary: 마켓이 수용하는 게임 아이템 타입 목록
 *     description: active = true인 GameType만 조회
 *     responses:
 *       200:
 *         description: 수용 가능한 게임 타입 리스트
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   typeName:
 *                     type: string
 *                   type:
 *                     type: string
 *                   moduleAddress:
 *                     type: string
 */
router.get('/accepted-types', getAcceptedTypes);

export default router;
