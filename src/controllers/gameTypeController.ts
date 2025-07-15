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


export const registerAcceptedType = async (req: Request, res: Response) => {
  try {
    const result = await AcceptedTypeService.registerType(req.body);
    res.status(201).json({ message: '타입 등록 요청 완료', data: result });
  } catch (error: any) {
    console.error('등록 오류:', error);
    res.status(500).json({ message: '타입 등록 실패', error: error.message });
  }
};

