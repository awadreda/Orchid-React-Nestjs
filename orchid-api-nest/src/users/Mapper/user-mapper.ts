
import { User } from '@prisma/client';
import { TypeMapper } from 'ts-mapper';
import { UserResponseDto } from '../dto/user-response.dto';



export class UserMapper extends TypeMapper {


 constructor() {

   super();
   this.createMap<User,UserResponseDto>() 
   .map(src => src.id, dest => dest.id)
    .map(src => src.email, dest => dest.email)
    .map(src => src.name, dest => dest.name)
    .map(src => src.image , dest => dest.image)
    .map(src => src.role , dest => dest.role)
    .map(src => src.createdAt , dest => dest.createdAt)
 }



  toResponseDto(user:User) {

    return this.map<User,UserResponseDto>(user,UserResponseDto)
  }


  toResponseList(users:User[]){
    return users.map(user => this.toResponseDto(user))
  }




}