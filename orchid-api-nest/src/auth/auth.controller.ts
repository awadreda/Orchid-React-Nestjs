import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/LoginDtos';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';
import { RefreshAuthGuard } from './guards/refresh-auth/refresh-auth.guard';
import { testbody } from './Types/auth-jwtPayload';

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('register')
  async registerUser (@Body() dto: CreateUserDto) {
    return this.authService.RegisterUser(dto);
  }

  @ApiBody({ type: LoginDto })
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login (@Req() req) {
    const result = await this.authService.login(req.user);
    return {
      access_token: result.access_token,
      refresh_token: result.refresh_token,
    };
  }

  @UseGuards(RefreshAuthGuard)
  @ApiBearerAuth()
  @Post('refresh')
  async refreshToken (@Request() req) {
    const result = await this.authService.refreshToken(req.user);
    return { access_token: result.access_token };
  }
}
