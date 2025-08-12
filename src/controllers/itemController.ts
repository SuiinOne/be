import { Request, Response } from "express";
import { itemService } from "../service/itemService";

export const buyItem = async ( req: Request, res: Response ) => {
    const itemId = Number(req.params.id); // 구매할 아이템의 id
    const { bytes, signature } = req.body;

    try {
        const salesHistory = await itemService.itemTransfer(itemId, bytes, signature);
        return res.status(200).json({ message: "아이템 구매 성공", salesHistory});

    } catch (err) {
        console.log("error: ", err);
        return res.status(500).json({ message: "아이템 구매 실패"});
    }
};

export const getItemHistory = async (req: Request, res: Response) => {
    const itemId = Number(req.params.id);
    try {
        const itemHistory = await itemService.itemHistory(itemId);
        if ( itemHistory.length == 0 ) {
            return res.status(200).json({ message: "아이템 판매 이력이 없습니다.", itemHistory});
        } 
        return res.status(200).json({ message: "아이템 판매 이력 조회 성공", itemHistory});
    } catch(err) {
        console.log("error", err);
        return res.status(500).json({ message: "아이템 판매 이력 조회 실패"});
    }
};

export const getItemStats = async (req: Request, res: Response) => {
    const itemId = Number(req.params.id);
    try {
        const { likeCount, saleCount } = await itemService.itemStats(itemId);
        return res.status(200).json({ message: "아이템 좋아요, 판매 수 조회 성공", likeCount, saleCount});

    } catch(err) {
        console.log("error: ", err);
        return res.status(500).json({ message: "아이템 좋아요, 판매 수 조회 실패"});
    }
};
