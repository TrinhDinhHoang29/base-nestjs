import { BaseEntity } from 'src/base/base.entity';
import { Restaurant } from 'src/modules/restaurants/entities/restaurant.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity('restaurant_assignments')
export class RestaurantAssignment extends BaseEntity {
  @ManyToOne(() => Restaurant, (restaurant) => restaurant.id, {
    onDelete: 'CASCADE',
  })
  restaurant: Restaurant;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  assigned_at: Date;

  @Column({ type: 'varchar', length: 20, default: 'assigned' })
  status: 'assigned' | 'completed';
}
