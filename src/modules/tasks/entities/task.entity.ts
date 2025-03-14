import { BaseEntity } from 'src/base/base.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeepPartial,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'tasks' })
export class TaskEntity extends BaseEntity {
  @Column({ name: 'title' })
  title: string;
  @Column({ name: 'description', nullable: true })
  description: string;
  @CreateDateColumn({ name: 'start_date' })
  startDate: Date;
  @CreateDateColumn({ name: 'end_date' })
  endDate: Date;
  @ManyToOne(() => UserEntity, (user) => user.tasks)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
  constructor(task?: DeepPartial<TaskEntity>) {
    super();
    if (task) {
      Object.assign(this, task);
    }
  }
}
