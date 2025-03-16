import { BaseEntity } from 'src/base/base.entity';
import { TaskEntity } from 'src/modules/tasks/entities/task.entity';
import { Column, DeepPartial, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @Column({ name: 'fullname' })
  fullname: string;
  @Column({ name: 'email', unique: true })
  email: string;
  @Column({ name: 'password' })
  password: string;
  @Column({ name: 'avatar', nullable: true })
  avatar: string;
  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string;

  @Column({ name: 'refresh_token_exp', nullable: true })
  refreshTokenExp: Date;

  @OneToMany(() => TaskEntity, (task) => task.user)
  tasks: TaskEntity[];
  constructor(user?: DeepPartial<UserEntity>) {
    super();
    if (user) {
      Object.assign(this, user);
    }
  }
}
