import * as config from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from '../config/jwt.config';
import { AuthJwtPayload } from '../Types/auth-jwtPayload';
import { Inject, Injectable } from '@nestjs/common';
import refresh_jwtConfig from '../config/refresh_jwt.config';


@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy,"refresh-jwt") {
  constructor ( @Inject(refresh_jwtConfig.KEY) private refreshJwtConfigeration: config.ConfigType<typeof refresh_jwtConfig>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: refreshJwtConfigeration.secret as string,
      ignoreExpiration: false,
    });
  }
  validate (payload: AuthJwtPayload) {

    return payload; 
  }
}
