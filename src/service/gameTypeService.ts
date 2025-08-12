
// src/service/acceptedTypeService.ts
import { AppDataSource } from '../config/data-source';
import { GameType } from '../models/gameType';
import { Transaction } from '@mysten/sui/transactions';
import { sendTransactionByServer } from '../utils/suiExecuter';

const GAMETYPE_MODULE_NAME = 'accepted_type';
const GAMETYPE_FUNCTION_NAME = 'register_type';
const GAME_TYPE_REGISTER = '0xa7023574d5591bcdc871ca64bd416799c6e51161b6de84c9076c09e5bdacc22b';
const PACKAGEID = "0xb1f15f4fe50612117e731a5aac0106053ae451be299d6bfe44f6de3867e1d756";

export class AcceptedTypeService {
  static async getAcceptedTypes() {
    const gameTypeRepository = AppDataSource.getRepository(GameType);
    return await gameTypeRepository.find({
      where: { active: true },
      select: ['id', 'typeName', 'type', 'moduleAddress'],
    });
  }

  static async registerType(data: any) {
    const repository = AppDataSource.getRepository(GameType);

    // 1. DB에 먼저 저장 (active: false)
    const gameType = repository.create({
      moduleAddress: data.moduleAddress,
      typeName: data.typeName,
      type: data.type,
      url: data.url,
      owner: data.owner,
      password: data.password,
      active: false,
    });

    const saved = await repository.save(gameType);

    // 2. 체인 등록 시도
    try {
      const tx = this.buildRegisterTypeTransaction(saved);
      const txHash = await sendTransactionByServer(tx);

      saved.active = true;
      await repository.save(saved);
      return { txHash, ...saved };
    } catch (err) {
      console.error('체인 등록 실패:', err);
      return { txHash: null, ...saved };
    }
  }

  /** 
   * DB에 저장된 GameType을 기반으로 트랜잭션 생성
   */
  private static buildRegisterTypeTransaction(saved: GameType): Transaction {
    const tx = new Transaction();
    tx.moveCall({
      target: `${PACKAGEID}::${GAMETYPE_MODULE_NAME}::${GAMETYPE_FUNCTION_NAME}`,
      arguments: [   
        tx.pure.string(`${PACKAGEID}::test_nft::TestNFT`), // type_name
        tx.pure.address(saved.moduleAddress), 
        tx.pure.string(saved.url), // metadata_url
        tx.object(GAME_TYPE_REGISTER) // acceptedTypeRegisteryId
      ],
    });
    return tx;
  }
}
