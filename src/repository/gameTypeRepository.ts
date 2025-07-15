import { AppDataSource } from '../config/data-source';
import { GameType } from '../models/gameType';

export const itemRepository = AppDataSource.getRepository(GameType);