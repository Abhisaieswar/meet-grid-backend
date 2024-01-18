import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToMany,
} from "typeorm";
import { User } from "./User";

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

  @ManyToMany((type) => User, (user) => user.events, { cascade: true })
  users: User[];
}

// SELECT * FROM events
// WHERE user_id = 'user123'
// AND (start_date <= '2024-01-13' AND (end_date >= '2024-01-13' OR end_date IS NULL));

// CREATE TABLE IF NOT EXISTS "user_events_event" (
//   "userId" INTEGER REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
//   "eventId" INTEGER REFERENCES "event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
//   PRIMARY KEY ("userId", "eventId")
// );

// CREATE TABLE IF NOT EXISTS "event" (
//   "id" SERIAL PRIMARY KEY,
//   "title" VARCHAR(255) NOT NULL,
//   "meetId" VARCHAR(255) NOT NULL,
//   "startTime" TIMESTAMP NOT NULL,
//   "endTime" TIMESTAMP NOT NULL,
//   "startDate" TIMESTAMP NOT NULL,
//   "endDate" TIMESTAMP,
//   "isRecurring" BOOLEAN DEFAULT false,
//   "recurringType" VARCHAR(255) NOT NULL,
//   "expiresOn" TIMESTAMP,
//   "response" VARCHAR(255) NOT NULL,
//   "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );
