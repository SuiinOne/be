import { AppDataSource } from '../config/data-source';
import { Item } from '../models/item';

export const itemRepository = AppDataSource.getRepository(Item);