import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userEmail: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  readAt?: Date;

  @Column()
  title: string;

  @Column()
  message: string;
}
