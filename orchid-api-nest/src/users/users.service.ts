import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { UserResponseDto } from './dto/user-response.dto';
import { UserMapper } from './Mapper/user-mapper';

@Injectable()
export class UsersService {
  constructor (private readonly _prisma: PrismaService) {}

  private userMapper = new UserMapper();

  async getUsers (): Promise<UserResponseDto[]> {
    try {
      const users = await this._prisma.user.findMany();

      const mappedUsers = users.map(user =>
        this.userMapper.toResponseDto(user),
      );

      return mappedUsers;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async getUserById (id: number): Promise<UserResponseDto | null> {
    try {
      const user = await this._prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        return null;
      }

      return this.userMapper.toResponseDto(user);
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  }

  async isUserExist (id): Promise<boolean> {
    const user = await this._prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return false;
    }
    return true;
  }

  async createUser (
    createUserDto: CreateUserDto,
  ): Promise<UserResponseDto | null> {
    try {
      const newUser = await this._prisma.user.create({
        data: {
          email: createUserDto.email,
          name: createUserDto.name,
          image: createUserDto.image,
          role: createUserDto.role,
          createdAt: new Date(),
        },
      });
      return this.userMapper.toResponseDto(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser (
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto | null> {
    try {
      const updatedUser = await this._prisma.user.update({
        where: { id },
        data: updateUserDto,
      });

      if (!updatedUser) {
        return null;
      }
      return this.userMapper.toResponseDto(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser (
    id: number,
  ): Promise<{ message: string; user: UserResponseDto | null }> {
    try {
      if (!(await this.isUserExist(id))) {
        return { message: 'User not found', user: null };
      }

      const user = await this._prisma.user.delete({
        where: { id },
      });

      return {
        message: 'User deleted successfully',
        user: this.userMapper.toResponseDto(user),
      };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // async createUser(createUserDto: CreateUserDto): Promise<User> {
}
