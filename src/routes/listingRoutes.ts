// src/routes/listingRoutes.ts
import { Router } from 'express';
import { getListingById, getListings, registerListing} from '../controllers/listController';

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


/**
 * @openapi
 * /api/listing/register:
 *   post:
 *     summary: 새로운 NFT Listing 등록
 *     description: |
 *       클라이언트가 NFT를 마켓에 등록하기 위한 API.
 *       - 클라이언트는 소유자 지갑으로 트랜잭션(bytes, signature)을 서명하여 전송.
 *       - 서버는 트랜잭션을 브로드캐스트하고 체인 성공 시 DB에 아이템을 등록.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bytes
 *               - signature
 *               - title
 *               - price
 *               - owner
 *               - gameTypeId
 *             properties:
 *               bytes:
 *                 type: string
 *                 description: 체인에 전송할 서명된 트랜잭션 바이트
 *               signature:
 *                 type: string
 *                 description: 트랜잭션 서명값
 *               title:
 *                 type: string
 *                 description: NFT 아이템 제목
 *               description:
 *                 type: string
 *                 description: 아이템 상세 설명 (옵션)
 *               price:
 *                 type: number
 *                 description: NFT 판매 가격
 *               owner:
 *                 type: string
 *                 description: 소유자 지갑 주소
 *               gameTypeId:
 *                 type: integer
 *                 description: 연관된 게임 타입 ID
 *     responses:
 *       200:
 *         description: Listing 등록 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 txHash:
 *                   type: string
 *                   description: 블록체인 트랜잭션 해시
 *                 item:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     price:
 *                       type: number
 *                     owner:
 *                       type: string
 *                     game_type_id:
 *                       type: integer
 *                     txHash:
 *                       type: string
 *                     active:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       400:
 *         description: 필수 파라미터 누락
 *       500:
 *         description: 서버 오류 (트랜잭션 브로드캐스트 또는 DB 저장 실패)
 */
router.post("/register", registerListing);

export default router;
