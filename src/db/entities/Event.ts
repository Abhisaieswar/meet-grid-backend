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

  @Column()
  startDate: Date;

  @Column({ nullable: true })
  endDate: Date;

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

// SELECT * FROM events
// WHERE user_id = 'user123'
// AND (start_date <= '2024-01-13' AND (end_date >= '2024-01-13' OR end_date IS NULL));
