import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalLoginDto } from './dto/LoginDtos';
import { LocalAuthGuard } from './guards/local-auth/local-auth.guard';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('register')
  async registerUser (@Body() dto: CreateUserDto) {
    return this.authService.RegisterUser(dto);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login (@Body() dto: LocalLoginDto) {

    const token = await this.authService.login(dto);
    return { user: { email: dto.email }, token };
  }
}
