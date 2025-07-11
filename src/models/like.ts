import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    listing_id!: number;

    @Column()
    wallet_address!: string;
}