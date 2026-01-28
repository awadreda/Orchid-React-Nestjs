import { registerAs } from '@nestjs/config';
import { JwtModuleOptions, JwtSignOptions } from '@nestjs/jwt';

export default registerAs<JwtSignOptions>('refresh_jwt', () => ({
  secret: process.env.REFRESH_TOKEN_SECRET,

  expiresIn: Number(process.env.REFRESH_TOKEN_EXPIRES_IN) || 604800,
}));
