// src/service/acceptedTypeService.ts
import { AppDataSource } from '../config/data-source';
import { GameType } from '../models/gameType';

export class AcceptedTypeService {
  static async getAcceptedTypes() {
    const gameTypeRepository = AppDataSource.getRepository(GameType);

    // active = true인 타입만 수용
    const acceptedTypes = await gameTypeRepository.find({
      where: { active: true },
      select: ['id', 'typeName', 'type', 'moduleAddress'],
    });

    return acceptedTypes;
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
        active: false
      });

    const saved = await repository.save(gameType);

    // 2. 체인에 등록 시도 (가짜 호출)
    try {
      const txHash = await this.callRegisterTypeOnChain(data);
      
      // 3. 등록 성공 → DB 업데이트
      saved.active = true;
      await repository.save(saved);
      
      return { txHash, ...saved };
    } catch (err) {
      console.error('체인 등록 실패:', err);
      return { txHash: null, ...saved };
    }
  }

  static async callRegisterTypeOnChain(data: any): Promise<string> {
    // 이 부분은 나중에 실제 체인 SDK 연결
    console.log('체인에 register_type 호출 시도 중...');

    // 가짜 대기 시간 + 더미 응답
    await new Promise((res) => setTimeout(res, 1000));

    // 여기에 실제 relayer 지갑으로 트랜잭션 서명 & 실행 로직 들어갈 예정
    return '0xFAKE_TX_HASH_123';
  }

}


