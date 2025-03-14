import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'src/modules/auth/dtos/sign-in.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/modules/auth/guards/local.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async signIn() {
    try {
      return await this.jwtService.sign({ hoang: 'haong' });
    } catch (error) {
      throw error;
    }
  }

  @Post('sign-up')
  async signUp(@Body() signUp: SignUpDto) {
    try {
      const user = await this.authService.signUp(signUp);
      return user;
    } catch (error) {
      throw error;
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  getAbc() {
    return 'ae';
  }
}
