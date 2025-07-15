// 테스트용
import { Transaction } from '@mysten/sui/transactions';
import { sendTransactionByServer } from '../utils/suiExecuter';

const PACKAGE_ID = '0x4838969c5cb4fd965b969c8e1d6fb19c714aa1cf5eab7860fb649d59bf3a665a';
const MODULE_NAME = 'hello_sui';
const FUNCTION_NAME = 'mint';

export class HelloSuiService {
  async mintTo(address: string): Promise<string> {
    const tx = new Transaction();

    tx.moveCall({
      target: `${PACKAGE_ID}::${MODULE_NAME}::${FUNCTION_NAME}`,
      arguments: [tx.pure.address(address)],
    });

    const digest = await sendTransactionByServer(tx);
    return digest;
  }
}
