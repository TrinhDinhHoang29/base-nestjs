import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { AuthService } from 'src/modules/auth/auth.service';
import { Request } from 'express';
import { BAD_REQUEST } from 'src/helpers/error.helper';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refresh-token',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.REFRESH_SECRET, // Đảm bảo kiểu `string`
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: UserEntity) {
    try {
      const refreshToken = req.headers.authorization?.split(' ')[1]; // Lấy token từ header

      if (!refreshToken) {
        return BAD_REQUEST(`Refresh token not provided`, 400);
      }

      const user = await this.authService.refreshToken(
        refreshToken,
        payload.id,
      );
      return { ...user };
    } catch (error: unknown) {
      if (error instanceof Error) {
        return BAD_REQUEST(`Authentication failed:`, {});
      }
      return BAD_REQUEST('Refresh cant not successful');
    }
  }
}
