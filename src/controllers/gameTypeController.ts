// src/controllers/acceptedTypeController.ts
import { Request, Response } from 'express';
import { AcceptedTypeService } from '../service/gameTypeService';

export const getAcceptedTypes = async (req: Request, res: Response) => {
  try {
    const types = await AcceptedTypeService.getAcceptedTypes();
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ message: '수용 가능한 게임 타입 조회 실패', error });
  }
};
