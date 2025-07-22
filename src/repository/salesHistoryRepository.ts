import { AppDataSource } from '../config/data-source';
import { SalesHistory } from '../models/salesHistory';

export const salesHistoryRepository = AppDataSource.getRepository(SalesHistory);