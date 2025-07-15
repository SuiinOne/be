import { Entity, PrimaryGeneratedColumn, Column,OneToMany } from 'typeorm';
import { Like } from "./like";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  walletAddress!: string;

  @OneToMany(() => Like, like => like.user)
  likes!: Like[];
}
