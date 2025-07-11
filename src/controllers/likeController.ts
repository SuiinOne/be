import { Request, Response } from 'express';
import { Like } from '../models/like';
import { AppDataSource } from "../config/data-source";


const likeRepository = AppDataSource.getRepository(Like);

export const createLike = async (req: Request, res: Response) => {
  const listingId = Number(req.params.id);
  const walletAddress = req.body.walletAddress; // 실제 로그인된 사용자에서 가져오는 것이 더 좋음

  const newLike = likeRepository.create({ listing_id: listingId, wallet_address: walletAddress });

  try {
    await likeRepository.save(newLike);
    res.status(201).json({ message: '좋아요 성공' });
  } catch (error) {
    res.status(500).json({ message: '좋아요 실패', error });
  }
};

export const deleteLike = async (req: Request, res: Response) => {
  const listingId = Number(req.params.id);
  const walletAddress = req.body.walletAddress;

  try {
    const result = await likeRepository.delete({ listing_id: listingId, wallet_address: walletAddress });
    res.status(200).json({ message: '좋아요 취소됨' });
  } catch (error) {
    res.status(500).json({ message: '좋아요 취소 실패', error });
  }
};

export const getLikes = async (req: Request, res: Response) => {
  const listingId = Number(req.params.id);

  try {
    const count = await likeRepository.count({ where: { listing_id: listingId } });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: '좋아요 수 조회 실패', error });
  }
};
