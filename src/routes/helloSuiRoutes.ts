// src/routes/helloSuiRoutes.ts
import { Router } from 'express';
import { mintHello } from '../controllers/helloSuiController';

const router = Router();


/**
 * @openapi
 * /api/hello-sui/mint:
 *   post:
 *     summary: Hello Sui 테스트용 민팅
 *     description: 테스트용 Move 함수 호출을 통해 체인에 트랜잭션을 보냅니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 example: "0x1234..."
 *     responses:
 *       200:
 *         description: 트랜잭션 해시 반환 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 txHash:
 *                   type: string
 *                   example: "6fK...8dD"
 */
router.post('/hello-sui/mint', mintHello);

export default router;
