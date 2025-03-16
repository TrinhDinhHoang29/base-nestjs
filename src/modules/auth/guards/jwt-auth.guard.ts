import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NOT_JWT } from 'src/helpers/error.helper';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(err: any, user: any, info: any): TUser {
    if (err) {
      return NOT_JWT(err);
    }
    if (!user) {
      return NOT_JWT(info?.message);
    }
    return user;
  }
}
