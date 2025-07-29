import { Request, Response } from 'express';
import { ListingService } from '../service/listingService';

const listingService = new ListingService();


export const listItem = async (request: any, response: any) => {
    console.log(request, response);

}

export const getListings = async (req: Request, res: Response) => {
    try {
        const items = await listingService.getAllListings();
        return res.json(items);
      } catch (err) {
        return res.status(500).json({ message: 'listing 조회를 실패히였습니다.' });
      }
  };

export const getListingById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const item = await listingService.getListingById(id);
        if (!item) return res.status(404).json({ message: '해당 아이디의 아이템을 찾을 수 없습니다.' });
        return res.json(item);
      } catch (err) {
        return res.status(500).json({ message: '아이템 상세 조회를 실패하였습니다. ' });
      }
  };

  export const registerListing = async (req: Request, res: Response) => {
    try {
      const { bytes, signature, title, description, price, owner, gameTypeId } = req.body;
  
      // 필수 값 확인
      if (!bytes || !signature || !title || !price || !owner || !gameTypeId) {
        return res.status(400).json({
          success: false,
          message: "필수 파라미터(bytes, signature, title, price, owner, gameTypeId)가 누락되었습니다.",
        });
      }
  
      // Listing 등록 (트랜잭션 + DB 저장)
      const result = await ListingService.registerListing(bytes, signature, {
        title,
        description: description || "", // description은 optional 처리 가능
        price,
        owner,
        gameTypeId,
      });
  
      return res.json(result);
    } catch (err: any) {
      console.error("registerListing API 에러:", err);
      return res.status(500).json({ success: false, message: "리스트 등록 처리 중 오류가 발생했습니다." });
    }
  };