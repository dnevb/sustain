import { Column, Entity } from "typeorm";
import BaseModel from "./base";

@Entity({ name: "user" })
export class User extends BaseModel {
  @Column()
  first_name: string;
  @Column()
  last_name: string;
  @Column()
  display_name: string;
  @Column()
  email: string;
  @Column({ enum: ["client", "technician"] })
  role: "client" | "technician";
}
