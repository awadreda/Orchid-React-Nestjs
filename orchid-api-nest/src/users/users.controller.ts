import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  HttpCode,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("allusers")
  async GetAllUsers() : Promise<UserResponseDto[] | { message: string }> {
    const users = await this.usersService.getUsers();

    if (users.length === 0) {
      return { message: 'No users found' };
    }
    return users;
  }

    @Get('userbyid/:id')
    async GetUserById(@Param('id') id:string): Promise<UserResponseDto | { message: string }>{

   if(isNaN(parseInt(id))) {
        return { message: 'Invalid user ID' };
   }

    const idNum = parseInt(id);
      const user = await this.usersService.getUserById(idNum);

    if(!user)
    {
        return { message: 'User not found' };
    }

    return user;


    }



      @Post('createuser')
      @HttpCode(201)

    async CreateUser( @Body() createUserDto: CreateUserDto): Promise<UserResponseDto | { message: string }>{
        const user = await this.usersService.createUser(createUserDto);
        if(!user){
            return { message: 'User not created' };
        }
        return user;
    }





    @Put('updateuser/:id')
    async UpdateUser(@Param('id') id:string, @Body() updateUserDto: UpdateUserDto): Promise<UserResponseDto | { message: string }>{


    if(isNaN(parseInt(id))) {
          return { message: 'Invalid user ID' };

    }

    const idNum = parseInt(id);
    const updatedUser = await this.usersService.updateUser(idNum, updateUserDto);

    if(!updatedUser){
        return { message: 'User not found' };
    }
    return updatedUser;

    }

    @Delete('deleteuser/:id')
    async DeleteUser(@Param('id') id:string): Promise< { message: string }>{
    if(isNaN(parseInt(id))) {
          return { message: 'Invalid user ID' };
    }
    const idNum = parseInt(id);
    const result = await this.usersService.deleteUser(idNum);

    if(!result){
        return { message: 'User not found' };
    }
    return result;
    
    }


      




}
