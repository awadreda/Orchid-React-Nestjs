import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
  Res,
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
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { Public } from './Decorators/public.decorator';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { RegesterUserDto } from 'src/users/dto/RegesterUser.dto';
import express, {response, type Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, type: RegesterUserDto })
  @ApiBody({ type: RegesterUserDto })
  async registerUser(@Body() dto: RegesterUserDto) {
    return this.authService.RegisterUser(dto);
  }

  @Post('registerListOfUsers')
  @ApiResponse({ status: 201, type: [RegesterUserDto] })
  @ApiBody({ type: [RegesterUserDto] })
  async registerListOfUsers(@Body() dtos: RegesterUserDto[]) {
    return this.authService.RegisterListOfUsers(dtos);
  }

  @ApiBody({ type: LoginDto })
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req , @Res({passthrough:true}) res: Response) {
    const result = await this.authService.login(req.user);
    res.cookie('refresh_token', result.refresh_token, {
      httpOnly:true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 * 7, // 7 days
    });


    return {
      access_token: result.access_token,
    
    };
  }



  @UseGuards(RefreshAuthGuard)
  @ApiBearerAuth()
  @Post('refresh')
  async refreshToken(@Request() req , @Res({passthrough:true}) res: Response) {
    const result = await this.authService.refreshToken(req.user);
      res.cookie('refresh_token', result.refresh_token, {
        httpOnly:true,
        secure: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000 * 7, // 7 days
      });
    
    return { access_token: result.access_token };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logOut')
  @ApiBearerAuth()
  async logOut(@Request() req , @Res({passthrough:true}) res: Response) {

    await this.authService.logOut(req.user.sub);

    res.clearCookie('refresh_token');
  }




  @Public()
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  async googleLogin() {}

  @Public()
  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(@Req() req) {
    const result = await this.authService.login(req.user);
    return {
    
      access_token: result.access_token,
      refresh_token: result.refresh_token,
    };
  }
}
