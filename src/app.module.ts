import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {
  database_config,
  server_config,
} from 'src/configs/configuration.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.dev',
      load: [database_config, server_config],
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
