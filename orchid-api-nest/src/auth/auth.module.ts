import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { localStartegy } from './strategies/local_strategy';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt_strategy';
import refresh_jwtConfig from './config/refresh_jwt.config';
import { RefreshJwtStrategy } from './strategies/refresh.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refresh_jwtConfig),
  ],
  providers: [
    AuthService,
    UsersService,
    localStartegy,
    JwtStrategy,
    RefreshJwtStrategy,
  ],
})
export class AuthModule {}
