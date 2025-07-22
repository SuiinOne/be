import { AppDataSource } from '../config/data-source';
import { GameType } from '../models/gameType';

export const gameTypeRepository = AppDataSource.getRepository(GameType);