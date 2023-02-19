import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import BaseModel from "./base.js";
import { TicketComent } from "./ticket_comment.js";
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
  @JoinColumn({ name: "assigned_to" })
  assigned_to: User;
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: "requested_by" })
  requested_by: User;
  @OneToMany(() => TicketComent, (comment) => comment.ticket, {
    eager: true,
  })
  comments: TicketComent[];
}
