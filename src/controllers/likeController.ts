
import { Request, Response } from 'express';
import { LikeService } from '../service/likeService';

export const createLike = async (req: Request, res: Response) => {
  const listingId = Number(req.params.id);
  const walletAddress = req.body.walletAddress; // 추후 JWT에서 추출 예정

  try {
    const like = await LikeService.createLike(listingId, walletAddress);
    res.status(201).json({ message: '좋아요 성공', like });
  } catch (error: any) {
    res.status(400).json({ message: error.message || '좋아요 실패' });
  }
};

export const deleteLike = async (req: Request, res: Response) => {
  const listingId = Number(req.params.id);
  const walletAddress = req.body.walletAddress;

  try {
    await LikeService.deleteLike(listingId, walletAddress);
    res.status(200).json({ message: '좋아요 취소 성공' });
  } catch (error: any) {
    res.status(400).json({ message: error.message || '좋아요 취소 실패' });
  }
};

export const getLikes = async (req: Request, res: Response) => {
  const listingId = Number(req.params.id);

  try {
    const count = await LikeService.getLikeCount(listingId);
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: '좋아요 수 조회 실패', error });
  }
};
