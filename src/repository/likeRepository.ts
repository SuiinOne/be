import { AppDataSource } from '../config/data-source';
import { Like } from '../models/like';

export const likeRepository = AppDataSource.getRepository(Like);
