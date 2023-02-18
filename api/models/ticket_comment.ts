import { Column, Entity, ManyToOne } from "typeorm";
import BaseModel from "./base";
import { Ticket } from "./ticket";
import { User } from "./user";

@Entity({ name: "ticket" })
export class TicketComent extends BaseModel {
  @Column()
  content: string;
  @ManyToOne(() => User)
  user: User;
  @ManyToOne(() => Ticket)
  ticket: Ticket;
}
