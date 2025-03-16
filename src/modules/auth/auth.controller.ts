import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { SignUpDto } from 'src/modules/auth/dtos/sign-in.dto';
import { SignInDto } from 'src/modules/auth/dtos/sign-up.dto';
import { LocalAuthGuard } from 'src/modules/auth/guards/local.guard';
import { RefreshTokenAuthGuard } from 'src/modules/auth/guards/refresh-token.guard';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { AuthService } from './auth.service';
import { CustomError } from 'src/helpers/res/error.res';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn(
    @Body() signIn: SignInDto,
    @Request() req,
    @Res() res: Response,
  ) {
    try {
      console.log(signIn);
      const user: UserEntity = req.user;
      return res.status(HttpStatus.OK).json({
        ...(await this.authService.signIn(user)),
        statusCode: HttpStatus.OK,
        message: 'Sign in successful.',
      });
    } catch (error) {
      throw new CustomError(error);
    }
  }

  @Post('sign-up')
  async signUp(@Body() signUp: SignUpDto) {
    try {
      const user = await this.authService.signUp(signUp);
      return user;
    } catch (error) {
      throw new CustomError(error);
    }
  }

  @ApiBearerAuth('access-token')
  @UseGuards(RefreshTokenAuthGuard)
  @Post('refresh-token')
  refreshToken(@Request() req) {
    try {
      console.log(req);
      return req.user;
    } catch (error) {
      return new CustomError(error);
    }
  }
}
