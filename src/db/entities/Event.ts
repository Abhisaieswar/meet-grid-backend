import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Event {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { length: 255 })
  title: string;

  @Column("varchar", { length: 255 })
  meetId: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column("boolean", { default: false })
  isRecurring: boolean;

  @Column("varchar", { length: 255 })
  recurringType: string;

  @Column({ nullable: true })
  expiresOn: Date;

  @Column("varchar", { length: 255 })
  response: string;

  @CreateDateColumn()
  createdAt: Date;
}
