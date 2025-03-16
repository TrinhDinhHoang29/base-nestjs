import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  database_config,
  jwt_config,
  server_config,
} from 'src/configs/configuration.config';
import { TypeORM } from 'src/configs/database.config';
import { AuthModule } from './modules/auth/auth.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { UsersModule } from './modules/users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from 'src/exception-filters/global-exception.filter';

@Module({
  imports: [
    TypeORM,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
      load: [database_config, server_config, jwt_config],
    }),
    UsersModule,
    TasksModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
