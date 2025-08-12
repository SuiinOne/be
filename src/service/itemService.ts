import { Transaction } from '@mysten/sui/transactions';
import { AppDataSource } from "../config/data-source";
import { Item } from "../models/item";
import { relayerKeypair } from "../utils/relayerKeypair";
import { suiClient } from "../config/suiClient";
import { SalesHistory } from "../models/salesHistory";
import { Like } from '../models/like';
import { itemRepository } from '../repository/ItemRepository';
import { salesHistoryRepository } from '../repository/salesHistoryRepository';
import { likeRepository } from '../repository/likeRepository';
import { broadcastSignedTransaction } from '../utils/suiExecuter';

export class itemService {
    // 구매한 아이템 전송
    static async itemTransfer(itemId: number, bytes: string, signature: string) {
        const item = await itemRepository.findOneBy({
            id: itemId
        })

        if (!item) {
            throw new Error("등록되지 않은 아이템입니다.");
        }
        if (!item.active) {
            throw new Error("이미 판매된 아이템입니다.");
        }

        const { digest, effects } = await broadcastSignedTransaction(bytes, signature);

        if ( digest ) {
            console.log("object 전송 트랜잭션 실행 성공");
            const salesHistory = salesHistoryRepository.create({ // salesHistory table update
                item: item,
                gameType: item.gameType,
                seller: item.owner,
                buyer: effects.sender,
                price: item.price,
                txDigest: digest,
            })
            const saveHistory = await salesHistoryRepository.save(salesHistory);

            // item table update -> active = false, owner 변경
            item.active = false;
            item.owner = effects.sender;
            const saveItem = await itemRepository.save(item);

            return saveHistory;

        } else {
            throw new Error("object 전송 트랜잭션 실패")
        }
    }

    static async itemHistory(itemId: number) {
        const item = await itemRepository.findOneBy({
            id: itemId
        })

        if (!item) {
            throw new Error("등록되지 않은 아이템입니다.");
        }

        const historys = await salesHistoryRepository.find({
            where: { item: item },
            order: { soldAt: "DESC"},
        });
        return historys;
    }

    static async itemStats(itemId: number) {
        const item = await itemRepository.findOneBy({
            id: itemId
        })
        if (!item) {
            throw new Error("등록되지 않은 아이템입니다.");
        }

        const like = await likeRepository.find({
            where: { listingId: itemId }
        });
        const likeCount = like.length;
        const salesHistory = await salesHistoryRepository.find({
            where: { item: item}
        });
        const saleCount = salesHistory.length;
        return { likeCount, saleCount };
    }
}
