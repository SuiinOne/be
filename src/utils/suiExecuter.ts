// src/utils/suiExecutor.ts
import { Transaction } from '@mysten/sui/transactions';
import { suiClient } from '../config/suiClient';
import { relayerKeypair } from './relayerKeypair';

export async function sendTransactionByServer(tx: Transaction): Promise<string> {
  const { digest } = await suiClient.signAndExecuteTransaction({
    transaction: tx,
    signer: relayerKeypair,
    requestType: 'WaitForLocalExecution',
    options: {
      showEffects: true,
      showEvents: true,
      showInput: true,
      showObjectChanges: true
    }
  });

  return digest;
}

export async function broadcastSignedTransaction(
  bytes: string,
  signature: string
): Promise<{ digest: string; effects: any }> {
  const { digest, effects } = await suiClient.executeTransactionBlock({
    transactionBlock: bytes,
    signature,
    requestType: 'WaitForLocalExecution',
    options: {
      showEffects: true,
      showEvents: true,
      showInput: true,
      showObjectChanges: true,
    },
  });

  return { digest, effects };
}