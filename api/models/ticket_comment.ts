import { Column, Entity, ManyToOne } from "typeorm";
import BaseModel from "./base.js";
import { Ticket } from "./ticket.js";
import { User } from "./user.js";

@Entity({ name: "ticket" })
export class TicketComent extends BaseModel {
  @Column()
  content: string;
  @ManyToOne(() => User)
  user: User;
  @ManyToOne(() => Ticket)
  ticket: Ticket;
}
