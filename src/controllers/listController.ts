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