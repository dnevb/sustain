import { nanoid } from "nanoid";
import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

export default abstract class BaseModel extends BaseEntity {
  @PrimaryColumn({ default: () => nanoid(8) })
  id: string;
  @DeleteDateColumn()
  deleted: Date;
  @UpdateDateColumn()
  updated: Date;
  @CreateDateColumn()
  created: Date;
}
