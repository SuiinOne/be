import { AppDataSource } from '../config/data-source';
import {Item} from "../models/item"
import { Transaction } from '@mysten/sui/transactions';
import { broadcastSignedTransaction } from '../utils/suiExecuter';


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

  static async registerListing(
    bytes: string,
    signature: string,
    data: {
      title: string;
      description: string;
      price: number;
      owner: string;
      gameTypeId: number;
    }
  ) {
    const repository = AppDataSource.getRepository(Item);
  
    try {
      // 1. 서명된 트랜잭션 브로드캐스트
      const { digest, effects } = await broadcastSignedTransaction(bytes, signature);
  
      // 2. 체인 성공 후 새 아이템을 DB에 등록
      const item = repository.create({
        title: data.title,
        description: data.description,
        price: data.price,
        owner: data.owner,
        game_type_id: data.gameTypeId,
        txHash: digest,
        active: true,
        createdAt: new Date()
      });
  
      await repository.save(item);
  
      return { success: true, txHash: digest, item };
    } catch (err: any) {
      console.error('Listing 등록 실패:', err);
      return { success: false, error: err.message };
    }
  }
  

}
