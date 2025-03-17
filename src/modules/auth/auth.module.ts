import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategyAccessToken } from 'src/modules/auth/strategies/jwt.strategy';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { RefreshTokenStrategy } from 'src/modules/auth/strategies/refresh-token.strategy';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthService } from './services/auth.service';
import { AuthControllerV1 } from 'src/modules/auth/controllers/v1/auth.controller';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({})],
  controllers: [AuthControllerV1],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategyAccessToken,
    RefreshTokenStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
