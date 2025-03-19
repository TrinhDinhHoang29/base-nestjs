import { BaseEntity } from 'src/base/base.entity';
import { Column, DeepPartial, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ name: 'fullname' })
  fullname: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ type: 'varchar', length: 10, nullable: false })
  role: 'admin' | 'sales';

  @Column({ name: 'avatar', nullable: true })
  avatar: string;

  @Column({ name: 'nation' })
  nation: string;

  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string;

  @Column({ name: 'refresh_token_exp', nullable: true })
  refreshTokenExp: Date;

  constructor(user?: DeepPartial<User>) {
    super();
    if (user) {
      Object.assign(this, user);
    }
  }
}
