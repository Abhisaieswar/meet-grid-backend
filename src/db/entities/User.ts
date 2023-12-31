import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column("varchar", { length: 255 })
  name: string;

  @Column("varchar", { length: 255 })
  password: string;
}