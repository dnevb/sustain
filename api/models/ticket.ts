import { Column, Entity, ManyToOne } from "typeorm";
import BaseModel from "./base.js";
import { User } from "./user.js";

const status = ["pending", "in_progress", "canceled", "completed"];

@Entity({ name: "ticket" })
export class Ticket extends BaseModel {
  @Column()
  summary: string;
  @Column({ nullable: true })
  description: string;
  @Column({ enum: status })
  status: string;
  @Column()
  priority: number;

  @ManyToOne(() => User, { eager: true })
  assigned_to: string;
  @ManyToOne(() => User)
  requested_by: string;
}
