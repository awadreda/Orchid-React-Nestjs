import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly _prisma: PrismaService) {}
  async getUsers(): Promise<User[]> {
    try {
      const users = await this._prisma.user.findMany();

      return users;
    } catch (error) {
      return [];
    }
  }


  async getUserById(id:number) : Promise<User | null> {
    try {
      const user = await this._prisma.user.findUnique({
        where: { id },
      });

      return user;
    } catch (error) {
      return null;
    }
  }


    // async createUser(createUserDto: CreateUserDto): Promise<User> {
}
