import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Item } from './item';

@Entity('game_type')
export class GameType {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  moduleAddress!: string;

  @Column()
  typeName!: string;

  @Column()
  type!: string;

  @Column()
  url!: string;

  @Column()
  owner!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  active!: boolean;

  // ✅ 역방향 설정 (optional)
  @OneToMany(() => Item, item => item.gameType)
  items!: Item[];
}
