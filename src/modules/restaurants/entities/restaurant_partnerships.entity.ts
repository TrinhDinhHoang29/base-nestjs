import { Column, Entity, ManyToOne } from 'typeorm';
import { Restaurant } from './restaurant.entity';
import { BaseEntity } from 'src/base/base.entity';

@Entity('restaurant_partnerships')
export class RestaurantPartnership extends BaseEntity {
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.id, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @Column({ type: 'int', default: 0 })
  visits: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  poc: string; // Người liên hệ chính

  @Column({ type: 'int', nullable: true })
  monthly_use: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  budget: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  provider: string;
}
