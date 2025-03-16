import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  database_config,
  jwt_config,
  server_config,
} from 'src/configs/configuration.config';
import { UsersModule } from './modules/users/users.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { TaskEntity } from 'src/modules/tasks/entities/task.entity';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
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
          entities: [UserEntity, TaskEntity], // Chỉ định các entity của bạn
          synchronize: true, // Chỉ nên bật trong môi trường development},
        };
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
      load: [database_config, server_config, jwt_config],
    }),
    UsersModule,
    TasksModule,
    AuthModule,
  ],
  providers: [AppService],
  controllers: [],
})
export class AppModule {}
