import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  database_config,
  jwt_config,
  server_config,
} from 'src/configs/configuration.config';
import { ConnectToTypeORM } from 'src/configs/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from 'src/exception-filters/global-exception.filter';
import { RestaurantsModule } from './modules/restaurants/restaurants.module';
import { RestaurantAssignmentsModule } from './modules/restaurant_assignments/restaurant_assignments.module';
import { ScrapedDataModule } from './modules/scraped_data/scraped_data.module';

@Module({
  imports: [
    ConnectToTypeORM,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
      load: [database_config, server_config, jwt_config],
    }),
    UsersModule,
    AuthModule,
    RestaurantsModule,
    RestaurantAssignmentsModule,
    ScrapedDataModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
