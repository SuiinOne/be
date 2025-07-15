import { Entity, PrimaryGeneratedColumn, Column ,ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user";

@Entity('like') 
export class Like {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: "listing_id" })
    listingId!: number;
    
    @ManyToOne(() => User, user => user.likes, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "wallet_address", referencedColumnName: "walletAddress" })
    user!: User;

    @Column()
    walletAddress!: string;
}