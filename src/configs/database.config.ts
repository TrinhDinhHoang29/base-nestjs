import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantAssignment } from 'src/modules/restaurant_assignments/entities/restaurant_assignment.entity';
import { Restaurant } from 'src/modules/restaurants/entities/restaurant.entity';
import { RestaurantAddress } from 'src/modules/restaurants/entities/restaurant_addresses.entity';
import { RestaurantPartnership } from 'src/modules/restaurants/entities/restaurant_partnerships.entity';
import { ScrapedData } from 'src/modules/scraped_data/entities/scraped_data.entity';
import { User } from 'src/modules/users/entities/user.entity';

export const ConnectToTypeORM = TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return {
      type: 'postgres', // Chỉnh lại theo database bạn dùng
      host: configService.get<string>('database.host'),
      port: configService.get<number>('database.port'),
      username: configService.get<string>('database.username'),
      password: configService.get<string>('database.password'),
      database: 'faba_tech',
      entities: [
        User,
        Restaurant,
        RestaurantAddress,
        RestaurantAssignment,
        RestaurantPartnership,
        ScrapedData,
      ], // Chỉ định các entity của bạn
      synchronize: true, // Chỉ nên bật trong môi trường development},
    };
  },
});
