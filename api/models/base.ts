import {
  BaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

export default abstract class BaseModel extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @DeleteDateColumn()
  deleted: Date;
  @UpdateDateColumn()
  updated: Date;
  @CreateDateColumn()
  created: Date;
}
