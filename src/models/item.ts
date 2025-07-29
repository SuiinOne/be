import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { GameType } from './gameType';

@Entity('item')
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  description!: string;

  @Column()
  price!: number;

  @Column()
  owner!: string;

  @Column({ default: true })
  active!: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ nullable: true })
  txHash?: string; // Sui 트랜잭션 해시 (Listing 등록 시 채워짐)

  // GameType FK 설정
  @ManyToOne(() => GameType, gameType => gameType.items)
  @JoinColumn({ name: 'game_type_id' }) // FK 컬럼 이름
  gameType!: GameType;

  @Column()
  game_type_id!: number; // 실제 DB 컬럼 (명시적으로 포함)
}
