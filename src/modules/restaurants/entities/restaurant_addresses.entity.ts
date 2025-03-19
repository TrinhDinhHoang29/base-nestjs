import { BaseEntity } from 'src/base/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Entity('restaurant_addresses')
export class RestaurantAddress extends BaseEntity {
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.id, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @Column({ type: 'varchar', length: 255, nullable: true })
  ward: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  district: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  city: string;

  @Column({ type: 'text', nullable: false })
  address: string;
}
