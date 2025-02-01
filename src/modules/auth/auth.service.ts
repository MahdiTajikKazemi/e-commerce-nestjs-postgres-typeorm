import { Injectable, UnauthorizedException } from '@nestjs/common';
import {} from './dto';
import { CreateUserDto } from '../users/dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { TokensPayload } from './interfaces/tokens-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);

    const payload: TokensPayload = {
      sub: newUser.user_id,
      role: newUser.role,
    };

    const tokens = this.generateTokens(payload);

    const hashedRefresh = await bcrypt.hash(tokens.refresh_token, 10);
    await this.usersService.update(newUser.user_id, {
      hashed_refresh: hashedRefresh,
    });

    const { password, ...user } = await this.usersService.findOne(
      newUser.user_id,
    );
    return { user, tokens };
  }

  async login(user: User) {
    const payload: TokensPayload = {
      sub: user.user_id,
      role: user.role,
    };

    const tokens = this.generateTokens(payload);

    const hashedRefresh = await bcrypt.hash(tokens.refresh_token, 10);
    await this.usersService.update(user.user_id, {
      hashed_refresh: hashedRefresh,
    });

    const { password, ...rest } = await this.usersService.findOne(user.user_id);
    return { rest, tokens };
  }

  async getAccessToken(user: User) {
    const payload: TokensPayload = {
      sub: user.user_id,
      role: user.role,
    };

    const tokens = this.generateTokens(payload);

    const hashedRefresh = await bcrypt.hash(tokens.refresh_token, 10);
    await this.usersService.update(user.user_id, {
      hashed_refresh: hashedRefresh,
    });

    return tokens;
  }

  async logout(payload: TokensPayload): Promise<{ success: string }> {
    const foundUser = await this.usersService.findOne(payload.sub);

    if (foundUser.hashed_refresh !== null) {
      await this.usersService.update(payload.sub, {
        hashed_refresh: null,
      });
    }
    return { success: 'User logged out.' };
  }

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.findByEmail(email);

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword)
        throw new UnauthorizedException('Invalid Credentials');

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }

  private generateTokens(payload: TokensPayload) {
    const access_token = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('SECRET_KEY'),
      expiresIn: '15m',
    });

    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('REFRESH_KEY'),
      expiresIn: '7d',
    });

    return { access_token, refresh_token };
  }

  async veifyUserRefreshToken(refreshToken: string, userId: number) {
    try {
      const user = await this.usersService.findOne(userId);

      const isMatch = await bcrypt.compare(refreshToken, user.hashed_refresh);
      if (!isMatch) throw new UnauthorizedException();

      return user;
    } catch (error) {
      throw new UnauthorizedException('Refresh token is not valid.');
    }
  }
}
