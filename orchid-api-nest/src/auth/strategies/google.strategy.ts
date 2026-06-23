import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import * as config from '@nestjs/config';
import googleOauthConfig from '../config/google-oauth.config';
import { validate } from 'class-validator';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @Inject(googleOauthConfig.KEY)
    private googleConfigration: config.ConfigType<typeof googleOauthConfig>,

    private readonly _authService: AuthService,
  ) {
    super({
      clientID: googleConfigration.clientId!,
      clientSecret: googleConfigration.clientSecret!,
      callbackURL: googleConfigration.callbackURL!,
      scope: ['email', 'profile'],
      passReqToCallback: true,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const user = await this._authService.ValidateGoogleUser({
      email: profile.emails[0].value,
      name: profile.displayName,
      image: profile.photos[0].value,
      password: '',
    });

    if (user) {
      done(null, user);
    }
    done(null, false);
  }
}
