import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { CreateUserDto } from '../users/dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @Post('token')
  getAccessToken(@Body() refreshToken: string) {
    return this.authService.getAccessToken(refreshToken);
  }

  @Post('logout/:id')
  logout(@Param('id', ParseIntPipe) id: number) {
    return this.authService.logout(id);
  }
}
