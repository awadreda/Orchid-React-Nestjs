import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword  } from "class-validator";



export class LoginDto {
  
  @ApiProperty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  
  password: string;
}