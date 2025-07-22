import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./item";
import { GameType } from "./gameType";

@Entity('saleshistory')
export class SalesHistory {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Item)
    @JoinColumn({ name: 'item_id' })
    item!: Item;

    @ManyToOne(() => GameType, gameType => gameType.items)
    @JoinColumn({ name: 'game_type_id' })
    gameType!: GameType;

    @Column()
    seller!: string;

    @Column()
    buyer!: string;

    @Column()
    price!: number;

    @Column()
    txDigest!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    soldAt!: Date;
}