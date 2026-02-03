import * as config from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from '../config/jwt.config';
import { AuthJwtPayload } from '../Types/auth-jwtPayload';
import { Inject, Injectable } from '@nestjs/common';
import refresh_jwtConfig from '../config/refresh_jwt.config';
import { Request } from 'express';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor (
    @Inject(refresh_jwtConfig.KEY)
    private refreshJwtConfigeration: config.ConfigType<
      typeof refresh_jwtConfig
    >,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: refreshJwtConfigeration.secret as string,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }
  validate (req: Request, payload: AuthJwtPayload) {
    const refreshToken = req
      .get('authorization')
      ?.replace('Bearer ', '')
      .trim();

    return payload;
  }
}
