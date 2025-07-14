// src/services/likeService.ts
import { AppDataSource } from '../config/data-source';
import { Like } from '../models/like';

const likeRepository = AppDataSource.getRepository(Like);

export class LikeService {
  static async createLike(listingId: number, walletAddress: string) {
    const existing = await likeRepository.findOneBy({
      listingId,
      walletAddress,
    });

    if (existing) {
      throw new Error('이미 좋아요를 누른 상태입니다.');
    }

    const newLike = likeRepository.create({ listingId, walletAddress });
    return await likeRepository.save(newLike);
  }

  static async deleteLike(listingId: number, walletAddress: string) {
    const result = await likeRepository.delete({ listingId, walletAddress });

    if (result.affected === 0) {
      throw new Error('좋아요 기록이 없습니다.');
    }
  }

  static async getLikeCount(listingId: number) {
    const count = await likeRepository.count({ where: { listingId } });
    console.log('조회된 like 수:', count);
    return count;
  }
}
