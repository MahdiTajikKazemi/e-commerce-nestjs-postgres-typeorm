import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto';
import { CreateUserDto } from '../users/dto';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { TokensPayload } from './interfaces/tokens-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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

    return { ...newUser, tokens };
  }

  async login(authDto: AuthDto) {
    return `This action returns all auth`;
  }

  async getAccessToken(refreshToken: string): Promise<string> {
    return `This action returns a #${refreshToken} auth`;
  }

  async logout(id: number): Promise<void> {}

  async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.findByEmail(email);

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword)
        throw new UnauthorizedException('Invalid Credentials');
    } catch (error) {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }

  private generateTokens(payload: TokensPayload) {
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('SECRET_KEY'),
      expiresIn: '15m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('REFRESH_KEY'),
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }
}
