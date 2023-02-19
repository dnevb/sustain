import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import BaseModel from "./base.js";
import type { Ticket } from "./ticket.js";
import { User } from "./user.js";

@Entity({ name: "ticket_comment" })
export class TicketComent extends BaseModel {
  @Column()
  content: string;
  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;
  @ManyToOne("Ticket")
  @JoinColumn({ name: "ticket_id" })
  ticket: Ticket;
}
