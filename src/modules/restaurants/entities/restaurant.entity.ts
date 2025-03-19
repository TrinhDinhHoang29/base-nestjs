import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('restaurants')
export class Restaurant extends BaseEntity {
  @Column({ length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 50, unique: true, nullable: false })
  code: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  phone: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'time', nullable: true })
  open_time: string;

  @Column({ type: 'time', nullable: true })
  close_time: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  lowest_avg_cost: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  highest_avg_cost: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  categories: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  facebook: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  instagram: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  website: string;

  @Column({ nullable: true })
  note: string;

  @Column({ type: 'boolean', default: false })
  is_verified: boolean;
}
