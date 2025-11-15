import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { UserResponseDto } from './dto/user-response.dto';
import { UserMapper } from './Mapper/user-mapper';

@Injectable()
export class UsersService {
  constructor(private readonly _prisma: PrismaService
      
  ) {}


   private userMapper = new UserMapper();

  async getUsers(): Promise<UserResponseDto[]> {
    try {
      const users = await this._prisma.user.findMany();

        const mappedUsers = this.userMapper.toResponseList(users);

      return mappedUsers;
    } catch (error) {
      return [];
    }
  }


  async getUserById(id:number) : Promise<UserResponseDto   | null> {
    try {
      const user = await this._prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        return null;
      }

      return this.userMapper.toResponseDto(user);
    } catch (error) {
      return null;
    }
  }


    async createUser(createUserDto:CreateUserDto) : Promise<UserResponseDto|null> {


      try { 
        const newUser = await this._prisma.user.create({
          data:{
            email:createUserDto.email,
            name:createUserDto.name,
            image:createUserDto.image
            ,role:createUserDto.role,
            createdAt:new Date(),

            
          }
      
        })
        return this.userMapper.toResponseDto(newUser);
      } catch (error) {
        return null
      }

    }


    async updateUser(id:number,updateUserDto:UpdateUserDto) : Promise<UserResponseDto|null> {
      
   
      try {
            const updatedUser = await this._prisma.user.update  ({
              where:{id},
              data:updateUserDto
            })

            if(!updatedUser){
              return null;
            }
            return this.userMapper.toResponseDto(updatedUser);}
        catch (error) { 
          return null;


      }
   
    }

    async deleteUser(id:number) : Promise<boolean> {
    
    
      try{
        await this._prisma.user.delete({
          where:{id}
        });
        return true;
      } catch (error) {
        return false;
      }
    }




    // async createUser(createUserDto: CreateUserDto): Promise<User> {
}
