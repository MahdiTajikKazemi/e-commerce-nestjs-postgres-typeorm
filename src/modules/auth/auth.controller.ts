import {
  Controller,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { CreateUserDto } from '../users/dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @HttpCode(200)
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@CurrentUser() user: User) {
    return this.authService.login(user);
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
