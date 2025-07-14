import { AppDataSource } from '../config/data-source';
import {Item} from "../models/item"


export class ListingService {
  private itemRepository = AppDataSource.getRepository(Item);

  async getAllListings(): Promise<Item[]> {
    return this.itemRepository.find({
      where: { active: true },
      order: { createdAt: 'DESC' },
    });
  }

  async getListingById(id: number): Promise<Item | null> {
    return this.itemRepository.findOneBy({ id });
  }
}
