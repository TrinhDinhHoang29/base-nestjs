import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from 'src/modules/tasks/entities/task.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';

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
      entities: [UserEntity, TaskEntity], // Chỉ định các entity của bạn
      synchronize: true, // Chỉ nên bật trong môi trường development},
    };
  },
});
