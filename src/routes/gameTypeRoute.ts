// src/routes/acceptedTypeRoutes.ts
import { Router } from 'express';
import { getAcceptedTypes, registerAcceptedType } from '../controllers/gameTypeController';

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

/**
 * @openapi
 * /api/accepted-types:
 *   post:
 *     summary: 게임 타입 체인 등록 요청
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               moduleAddress:
 *                 type: string
 *               typeName:
 *                 type: string
 *               type:
 *                 type: string
 *               url:
 *                 type: string
 *               owner:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: 등록 요청 완료
 */
router.post('/accepted-types', registerAcceptedType);


export default router;
