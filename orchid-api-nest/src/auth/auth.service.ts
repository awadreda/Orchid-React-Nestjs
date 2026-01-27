import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './Types/auth-jwtPayload';
import { LocalLoginDto } from './dto/LoginDtos';

@Injectable()
export class AuthService {
  constructor (
    private readonly _prismaService: PrismaService,
    private readonly _usersService: UsersService,
    private readonly _jwtService: JwtService,
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

  async ValidateUser (email: string, password: string) {
    const user = await this._prismaService.user.findUnique({
      where: { email },
    });

    if (!user) throw new UnauthorizedException('User not found');

    if (user.password === null)
      throw new UnauthorizedException("User doesn't have a password set");
    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    return { id: user.id, email: user.email, name: user.name };
  }

  login (dto: LocalLoginDto) {
    const { email} = dto;

    return this._jwtService.signAsync({email} as AuthJwtPayload); 
  }
}
