import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokensPayload } from '../interfaces/tokens-payload.interface';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.getOrThrow('REFRESH_KEY'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: TokensPayload) {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();

    return await this.authService.veifyUserRefreshToken(
      refreshToken,
      payload.sub,
    );
  }
}
