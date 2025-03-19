import { BaseEntity } from 'src/base/base.entity';
import { Restaurant } from 'src/modules/restaurants/entities/restaurant.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('scraped_data')
export class ScrapedData extends BaseEntity {
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.id, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @Column({ type: 'jsonb', nullable: false })
  data: Record<string, any>;
}
