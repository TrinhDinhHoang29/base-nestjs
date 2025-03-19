import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepositoryAbstract } from 'src/base/base.abstract.repository';
import { Restaurant } from 'src/modules/restaurants/entities/restaurant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UpdateRestaurantsService extends BaseRepositoryAbstract<Restaurant> {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {
    super(restaurantRepository);
  }
  updateRestaurant() {}
}
