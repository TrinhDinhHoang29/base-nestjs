import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantAssignment } from 'src/modules/restaurant_assignments/entities/restaurant_assignment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantAssignment])],
})
export class RestaurantAssignmentsModule {}
