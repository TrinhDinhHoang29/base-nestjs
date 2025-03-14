import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from 'src/modules/auth/dtos/sign-in.dto';
import { SignInDto } from 'src/modules/auth/dtos/sign-up.dto';

@Injectable()
export class AuthService {
  private SALT_ROUND = 11;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async signUp(signUpDto: SignUpDto) {
    try {
      const existedUser = await this.usersService.findOneByCondition({
        where: {
          email: signUpDto.email,
        },
      });
      if (existedUser) {
        throw {
          status: 401,
          message: 'Email already existed!!',
        };
      }
      const hashed_password = await bcrypt.hash(
        signUpDto.password,
        this.SALT_ROUND,
      );
      const newUserEntity = new UserEntity(signUpDto);
      newUserEntity.password = hashed_password;
      const user = await this.usersService.create(newUserEntity);
      return user;
    } catch (error) {
      throw error;
    }
  }
  // async signIn(signInDto: SignInDto) {
  //   try {
  //     const existedUser = await this.usersService.findOneByCondition({
  //       where: {
  //         email: signUpDto.email,
  //       },
  //     });
  //     if (existedUser) {
  //       throw {
  //         status: 401,
  //         message: 'Email already existed!!',
  //       };
  //     }
  //     const hashed_password = await bcrypt.hash(
  //       signUpDto.password,
  //       this.SALT_ROUND,
  //     );
  //     const newUserEntity = new UserEntity(signUpDto);
  //     newUserEntity.password = hashed_password;
  //     const user = await this.usersService.create(newUserEntity);
  //     return user;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  async getAuthenticatedUser(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    try {
      const user = await this.usersService.findOneByCondition({
        where: { email: email },
      });
      if (!user) {
        throw new BadRequestException('Wrong credentials!!');
      }
      await this.verifyPlainContentWithHashedContent(password, user?.password);
      console.log(user);
      return user;
    } catch (error) {
      throw new BadRequestException('Wrong credentials!!' + error);
    }
  }

  private async verifyPlainContentWithHashedContent(
    plain_text: string,
    hashed_text: string,
  ) {
    const is_matching = await bcrypt.compare(plain_text, hashed_text);
    if (!is_matching) {
      throw new BadRequestException();
    }
  }

  generateAccessToken(payload) {
    return this.jwtService.sign(payload);
  }
  // payload: TokenPayload
  generateRefreshToken(payload) {
    return this.jwtService.sign(payload, {
      secret: 'refresh_token_secret',
    });
  }
}
