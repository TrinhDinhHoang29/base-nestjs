import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SignUpDto } from 'src/modules/auth/dtos/sign-in.dto';
import { SignInDto } from 'src/modules/auth/dtos/sign-up.dto';
import { LocalAuthGuard } from 'src/modules/auth/guards/local.guard';
import { RefreshTokenAuthGuard } from 'src/modules/auth/guards/refresh-token.guard';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { AuthService } from '../../services/auth.service';
import { CREATED, OK } from 'src/helpers/success.helper';

@Controller('auth')
export class AuthControllerV1 {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(@Body() signIn: SignInDto, @Request() req) {
    console.log(signIn);
    const user: UserEntity = req.user;
    return OK('Sign in successful.', {
      ...(await this.authService.signIn(user)),
    });
  }

  @Post('sign-up')
  async signUp(@Body() signUp: SignUpDto) {
    const user = await this.authService.signUp(signUp);
    return CREATED('Sign up success.', { fullName: user.fullname });
  }

  @ApiBearerAuth('access-token')
  @UseGuards(RefreshTokenAuthGuard)
  @Post('refresh-token')
  refreshToken(@Request() req) {
    console.log(req);
    return CREATED('Refresh token successful', { ...req.user });
  }
}
