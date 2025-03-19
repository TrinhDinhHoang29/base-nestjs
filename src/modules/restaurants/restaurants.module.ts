import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsController } from 'src/modules/restaurants/controllers/v1/restaurants.controller';
import { Restaurant } from 'src/modules/restaurants/entities/restaurant.entity';
import { RestaurantAddress } from 'src/modules/restaurants/entities/restaurant_addresses.entity';
import { RestaurantPartnership } from 'src/modules/restaurants/entities/restaurant_partnerships.entity';
import { CreateRestaurantsService } from 'src/modules/restaurants/services/create-restaurants/create-restautants.service';
import { DeleteRestaurantsService } from 'src/modules/restaurants/services/delete-restaurants/delete-restaurants.service';
import { GetRestaurantsService } from 'src/modules/restaurants/services/get-restaurants/get-restaurants.service';
import { UpdateRestaurantsService } from 'src/modules/restaurants/services/update-restaurants/update-restaurants.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RestaurantAddress,
      Restaurant,
      RestaurantPartnership,
    ]),
  ],
  providers: [
    CreateRestaurantsService,
    DeleteRestaurantsService,
    UpdateRestaurantsService,
    GetRestaurantsService,
  ],
  controllers: [RestaurantsController],
  exports: [
    CreateRestaurantsService,
    DeleteRestaurantsService,
    UpdateRestaurantsService,
    GetRestaurantsService,
  ],
})
export class RestaurantsModule {}
