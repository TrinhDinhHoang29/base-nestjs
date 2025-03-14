import {
  BaseEntity as TypeormBaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

export abstract class BaseEntity extends TypeormBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false }) // Gán giá trị mặc định là false
  deleted: boolean;

  @CreateDateColumn({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' }) // Tự động gán thời gian hiện tại
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', default: () => 'CURRENT_TIMESTAMP' }) // Tự động gán thời gian hiện tại
  updatedAt: Date;
}
