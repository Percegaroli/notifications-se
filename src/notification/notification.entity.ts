import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    userId: string;

    @Column()
    createdAt: Date

    @Column()
    readAt?: Date;

    @Column()
    title: string;

    @Column()
    message: string;
}