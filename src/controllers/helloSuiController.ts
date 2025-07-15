// 테스트용
import { Request, Response } from 'express';
import { HelloSuiService } from '../service/helloSuiService';

const helloSuiService = new HelloSuiService();

export const mintHello = async (req: Request, res: Response) => {
const { address } = req.body;
  console.log("이것이것은:", req.body)
  console.log("이것이것은2:", address)

  if (!address) return res.status(400).json({ message: 'to address is required' });

  try {
    const digest = await helloSuiService.mintTo(address);
    res.json({ txHash: digest });
  } catch (err) {
    console.error('트랜잭션 실패:', err);
    res.status(500).json({ message: '트랜잭션 실패', error: String(err) });
  }
};
