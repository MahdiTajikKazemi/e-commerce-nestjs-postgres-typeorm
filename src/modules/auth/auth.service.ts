import { Injectable } from '@nestjs/common';
import { AuthDto } from './dto';
import { CreateUserDto } from '../users/dto';

@Injectable()
export class AuthService {
  async create(createUserDto: CreateUserDto) {
    return 'This action adds a new auth';
  }

  async login(authDto: AuthDto) {
    return `This action returns all auth`;
  }

  async getAccessToken(refreshToken: string): Promise<string> {
    return `This action returns a #${refreshToken} auth`;
  }

  async logout(id: number): Promise<void> {}
}
