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
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDashboardDto, UserResponseDto } from './dto/user-response.dto';
import { ApiBearerAuth, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Controller('user')
export class UsersController {
  constructor (private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return this.usersService.getMe(req.user.sub);
  }


  @ApiOkResponse({ type: [UserResponseDto] })
  @Get('allusers')
  async GetAllUsers (): Promise<UserResponseDto[] | { message: string }> {
    const users = await this.usersService.getUsers();

    if (users.length === 0) {
      return { message: 'No users found' };
    }
    return users;
  }


  @ApiOkResponse({ type: UserResponseDto })
  @Get('userbyid/:id')
  async GetUserById (
    @Param('id') id: string,
  ): Promise<UserResponseDto | { message: string }> {
    if (isNaN(parseInt(id))) {
      return { message: 'Invalid user ID' };
    }

    const idNum = parseInt(id);
    const user = await this.usersService.getUserById(idNum);

    if (!user) {
      return { message: 'User not found' };
    }

    return user;
  }

  @ApiOkResponse({ type: [UserDashboardDto] })
  @Get('usersdashboard')
  async GetUsersDashboard (): Promise<UserDashboardDto[]> {
    return this.usersService.getUsersDashboardData();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access_token')
  @ApiOkResponse({ type: [UserDashboardDto] })
  @Get('testjwt')
  async GetUserTestJwt (): Promise<UserDashboardDto[]> {
    return this.usersService.getUsersDashboardData();
  }

  @ApiOkResponse({ type: UserDashboardDto })
  @Get('userdashboard/:id')
  async GetUserDashboard (
    @Param('id') id: string,
  ): Promise<UserDashboardDto | { message: string }> {
    if (isNaN(parseInt(id))) {
      return { message: 'Invalid user ID' };
    }

    const idNum = parseInt(id);
    const dashboardData = await this.usersService.getUserDashboardDataByID(
      idNum,
    );

    if (!dashboardData) {
      return { message: 'User not found' };
    }

    return dashboardData;
  }

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Returns the user dashboard data for the given user ID.
   * Requires a valid JWT token to be passed in the Authorization header.
   * @param id The user ID to fetch the dashboard data for.
   * @returns The user dashboard data if found, otherwise an object with a message property.
   */
  /*******  3420be86-5bc2-40ae-8b7f-ffd7c603babe  *******/

  @Post('createuser')
  @HttpCode(201)
  async CreateUser (
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto | { message: string }> {
    const user = await this.usersService.createUser(createUserDto);
    if (!user) {
      return { message: 'User not created' };
    }
    return user;
  }

  @Post('createListUsers')
  @HttpCode(201)
  async CreateListUsers (
    @Body() createUserDtos: CreateUserDto[],
  ): Promise<UserResponseDto[] | { message: string }> {
    for (const createUserDto of createUserDtos) {
      const user = await this.usersService.createUser(createUserDto);
      if (!user) {
        return { message: 'Users not created' };
      }
    }
    return { message: 'Users created successfully' };
  }
  
   
  
  @Put('updateuser/:id')
  async UpdateUser (
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto | { message: string }> {
    if (isNaN(parseInt(id))) {
      return { message: 'Invalid user ID' };
    }

    const idNum = parseInt(id);
    const updatedUser = await this.usersService.updateUser(
      idNum,
      updateUserDto,
    );

    if (!updatedUser) {
      return { message: 'User not found' };
    }
    return updatedUser;
  }

  @Delete('deleteuser/:id')
  async DeleteUser (
    @Param('id') id: string,
  ): Promise<{ message: string; user: UserResponseDto | null }> {
    if (isNaN(parseInt(id))) {
      return { message: 'Invalid user ID', user: null };
    }
    const idNum = parseInt(id);
    const result = await this.usersService.deleteUser(idNum);

    if (!result) {
      return { message: 'User not found', user: null };
    }
    return result;
  }
}
