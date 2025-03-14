import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { UsersModule } from 'src/modules/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';

@Module({
  // , JwtModule.register({signOptions:{expiresIn}})]
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      // imports: [ConfigModule],
      // inject: [ConfigService],
      useFactory: () => ({
        secret: process.env.SECRET,
        // secret: configService.get<string>('jwt.secret'), // Lấy secret từ biến môi trường
        signOptions: {
          // expiresIn: configService.get<string>('jwt.expiresIn'), // Ví dụ: lấy thời gian hết hạn từ config
          expiresIn: '60s',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
