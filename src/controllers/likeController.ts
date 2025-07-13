import { Request, Response } from 'express';
import { Like } from '../models/like';
import { AppDataSource } from "../config/data-source";
import { getLikeCount} from "../service/likeService"


const likeRepository = AppDataSource.getRepository(Like);

export const createLike = async (req: Request, res: Response) => {
  const listingId = Number(req.params.id);
  const walletAddress = req.body.walletAddress; // jwt 로 변경 예정

};

export const deleteLike = async (req: Request, res: Response) => {
  const listingId = Number(req.params.id);
  const walletAddress = req.body.walletAddress;

  
};

export const getLikes = async (req: Request, res: Response) => {
  const listingId = Number(req.params.id);

  console.log("getLike 컨트롤러 시작")

  try {
    const count = await getLikeCount(listingId)
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: '좋아요 수 조회 실패', error });
  }
};
