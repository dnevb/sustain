import { Column, Entity } from "typeorm";
import BaseModel from "./base.js";

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
  @Column()
  password: string;
  @Column({ enum: ["client", "technician"] })
  role: "client" | "technician";

  static async getByEmail(email: string) {
    return await this.findOneBy({ email });
  }

  static async getRandom() {
    const items = await this.find();
    const index = Math.ceil(Math.random() * items.length);

    return items[index]!;
  }
}
