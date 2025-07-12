import { decodeSuiPrivateKey } from '@mysten/sui/cryptography';
import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519';
import dotenv from 'dotenv';

dotenv.config();

// .env에서 비밀키 불러오기 (Bech32 형식)
const encoded = process.env.SUI_SECRET_KEY!;
if (!encoded) throw new Error('SUI_SECRET_KEY가 없습니다.');

// 디코딩 → 키 타입 확인 + 시크릿 키 바이트
const { scheme, secretKey } = decodeSuiPrivateKey(encoded);

let keypair;
switch (scheme) {
	case 'ED25519':
		keypair = Ed25519Keypair.fromSecretKey(secretKey);
		break;
	default:
		throw new Error(`Unsupported key scheme: ${scheme}`);
}

// 지갑 주소 가져오기
const address = keypair.getPublicKey().toSuiAddress();
console.log('서버 지갑 주소:', address);
