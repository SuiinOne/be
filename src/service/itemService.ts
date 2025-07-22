import { Transaction } from '@mysten/sui/transactions';
import { AppDataSource } from "../config/data-source";
import { Item } from "../models/item";
import { relayerKeypair } from "../utils/relayerKeypair";
import { suiClient } from "../config/suiClient";
import { SalesHistory } from "../models/salesHistory";

export class itemService {
    // 구매한 아이템 전송
    static async itemTransfer(itemId: number, buyerAddress: string) {
        const itemRepository = AppDataSource.getRepository(Item);
        const salesHistoryRepository = AppDataSource.getRepository(SalesHistory);
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

            // item table update -> active = false
            item.active = false;
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
}
