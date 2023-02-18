import { nanoid } from "nanoid";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from "typeorm";

export default abstract class BaseModel extends BaseEntity {
  @Column({ default: () => nanoid(8) })
  id: string;
  @DeleteDateColumn()
  deleted: Date;
  @UpdateDateColumn()
  updated: Date;
  @CreateDateColumn()
  created: Date;
}
