import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './Types/auth-jwtPayload';
import { LoginDto } from './dto/LoginDtos';
import { ref } from 'process';
import refresh_jwtConfig from './config/refresh_jwt.config';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  
  constructor (
    private readonly _prismaService: PrismaService,
    private readonly _usersService: UsersService,
    private readonly _jwtService: JwtService,
    @Inject(refresh_jwtConfig.KEY)
    private readonly _refreshJwtOptions: ConfigType<typeof refresh_jwtConfig>,
  ) {}

  async RegisterUser (dto: CreateUserDto) {
    const userData: CreateUserDto = {
      email: dto.email,
      name: dto.name,
      password: await bcrypt.hash(dto.password, 10),
    };

    const user = await this._usersService.createUser(userData);
    if (!user) throw new BadRequestException('User creation failed');

    return { id: user.id, email: user.email, name: user.name };
  }

  async ValidateUser (email: string, password: string): Promise<AuthJwtPayload> {
    const user = await this._usersService.getUserByEmailToAuth(email);

    if (!user) throw new UnauthorizedException('User not found');

    if (user.password === null)
      throw new UnauthorizedException("User doesn't have a password set");
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    return { sub: user.id, role: user.role };
  }

  async login (user: AuthJwtPayload) {
    const { sub, role } = user;

    const token = await this._jwtService.sign({ sub, role } as AuthJwtPayload);

    const refreshToken = await this._jwtService.sign(
      { sub, role } as AuthJwtPayload,
      this._refreshJwtOptions,
    );

    return { access_token: token, refresh_token: refreshToken };
  }



  async refreshToken(user: AuthJwtPayload) {
    const { sub, role } = user;

    const token = await this._jwtService.sign({ sub, role } as AuthJwtPayload);

  

    return { access_token: token };
  }

}
