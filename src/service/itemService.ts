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

export class itemService {
    // 구매한 아이템 전송
    static async itemTransfer(itemId: number, buyerAddress: string) {
        const item = await itemRepository.findOneBy({
            id: itemId
        })

        if (!item) {
            throw new Error("등록되지 않은 아이템입니다.");
        }
        if (!item.active) {
            throw new Error("이미 판매된 아이템입니다.");
        }

        const tx = new Transaction();
        tx.transferObjects([item.objectId], buyerAddress); 
        // 마켓 서명
        const result = await suiClient.signAndExecuteTransaction({
            transaction: tx,
            signer: relayerKeypair,
        });
        const transaction = await suiClient.waitForTransaction({
            digest: result.digest,
            options: {
                showEffects: true,
            },
        });

        if (transaction.effects) {
            console.log("object 전송 트랜잭션 실행 성공");
            const salesHistory = salesHistoryRepository.create({ // salesHistory table update
                item: item,
                gameType: item.gameType,
                seller: item.owner,
                buyer: buyerAddress,
                price: item.price,
                txDigest: transaction.digest,
            })
            const saveHistory = await salesHistoryRepository.save(salesHistory);

            // item table update -> active = false, owner 변경
            item.active = false;
            item.owner = buyerAddress;
            const saveItem = await itemRepository.save(item);

            return saveHistory;

        } else {
            throw new Error("object 전송 트랜잭션 실패")
        }
    }

    // 아이템 구매 비용 지불
    static async itemPayment() { 
        //const { bytes, signature } = tx.sign({ client: suiClient, signer: relayerKeypair });
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
            where: { listingId: itemId}
        });
        const likeCount = like.length;
        const salesHistory = await salesHistoryRepository.find({
            where: { item: item}
        });
        const saleCount = salesHistory.length;
        return { likeCount, saleCount };
    }
}
