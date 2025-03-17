import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {
  BAD_REQUEST,
  NOT_FOUND_USER,
  PASSWORD_WRONG,
} from 'src/helpers/error.helper';
import { SignUpDto } from 'src/modules/auth/dtos/sign-in.dto';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class AuthService {
  private SALT_ROUND = 11;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  async signUp(signUpDto: SignUpDto) {
    const existedUser = await this.usersService.findOneByCondition({
      where: {
        email: signUpDto.email,
      },
    });
    if (existedUser) {
      throw new Error('Email already existed!!');
    }
    const hashed_password = await bcrypt.hash(
      signUpDto.password,
      this.SALT_ROUND,
    );
    const newUserEntity = new UserEntity(signUpDto);
    newUserEntity.password = hashed_password;
    const user = await this.usersService.create(newUserEntity);
    return user;
  }

  async signIn(user: UserEntity) {
    const refreshToken = await this.generateRefreshToken({
      id: user.id,
      fullName: user.fullname,
      email: user.email,
    });

    // const sessionExpiresAt = dayjs().add(30, 'days').toDate(); // Ví dụ: Hết hạn sau 30 ngày

    // console.log(sessionExpiresAt);
    await this.usersService.update(user.id, {
      refreshToken: refreshToken,
      // refreshTokenExp: sessionExpiresAt,
    });

    return {
      accessToken: await this.generateAccessToken({
        id: user.id,
        fullName: user.fullname,
        email: user.email,
      }),
      accessTokenExp: this.configService.get<string>('jwt.expiresIn'),
      refreshToken: refreshToken,
      // refreshTokenExp: sessionExpiresAt,
    };
  }

  async getAuthenticatedUser(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const user = await this.usersService.findOneByCondition({
      where: { email: email },
    });
    if (!user) {
      return NOT_FOUND_USER('Not found user !');
    }
    await this.verifyPlainContentWithHashedContent(password, user?.password);
    return user;
  }

  private async verifyPlainContentWithHashedContent(
    plain_text: string,
    hashed_text: string,
  ) {
    const is_matching = await bcrypt.compare(plain_text, hashed_text);
    if (!is_matching) {
      return PASSWORD_WRONG('Password is wrong !');
    }
  }

  async refreshToken(jwt, userId: string) {
    const user: UserEntity | null = await this.usersService.findOneByCondition({
      where: {
        id: userId,
        refreshToken: jwt,
      },
    });
    if (user == null) return BAD_REQUEST('User was blocked.', {});
    //kiểm tra thời gian refreshExp trong db

    const refreshTokenJwt = await this.generateRefreshToken({
      id: user.id,
      fullName: user.fullname,
      email: user.email,
    });

    await this.usersService.update(user.id, {
      refreshToken: refreshTokenJwt,
    });

    return {
      accessToken: await this.generateAccessToken({
        id: user.id,
        fullName: user.fullname,
        email: user.email,
      }),
      accessTokenExp: this.configService.get<string>('jwt.expiresIn'),
      refreshToken: refreshTokenJwt,
    };
  }

  private generateAccessToken(payload: {
    id: string;
    fullName: string;
    email: string;
  }) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('jwt.secret'),
      expiresIn: this.configService.get<string>('jwt.expiresIn'),
    });
  }
  // payload: TokenPayload

  private generateRefreshToken(payload: {
    id: string;
    fullName: string;
    email: string;
  }) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('refresh.secret'),
      expiresIn: this.configService.get<string>('refresh.expiresIn'),
    });
  }

  //Khi người dùng gửi lên đúng với
}
