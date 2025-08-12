import { buyItem, getItemHistory, getItemStats } from "../controllers/itemController";
import express from "express";
const router = express.Router();

/**
 * @openapi
 * /api/listing/buy/{id}:
 *   patch:
 *     summary: 아이템 구매 요청
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bytes:
 *                 type: string
 *               signature:
 *                 type: string
 *     responses:
 *       200:
 *         description: 아이템 구매 요청 성공
 */
router.patch("/buy/:id", buyItem);

/**
 * @openapi
 * /api/listing/{id}/history:
 *   get:
 *     summary: 아이템 판매 이력 조회
 *     description: 특정 아이템의 모든 판매 이력을 최신순으로 반환
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 아이템 판매 이력 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 itemHistory:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       seller:
 *                         type: string
 *                       buyer:
 *                         type: string
 *                       price:
 *                         type: number
 *                       txDigest:
 *                         type: string
 *                       soldAt:
 *                         type: string
 *                         format: date-time
 */
router.get("/:id/history", getItemHistory);

/**
 * @openapi
 * /api/listing/{id}/stats:
 *   get:
 *     summary: 아이템 좋아요 및 판매 수 통계 조회
 *     description: 특정 아이템의 좋아요 수와 판매 횟수를 반환
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 아이템 좋아요 및 판매 수 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 likeCount:
 *                   type: integer
 *                   description: 좋아요 개수
 *                 saleCount:
 *                   type: integer
 *                   description: 판매된 횟수
 */
router.get("/:id/stats", getItemStats);

export default router;