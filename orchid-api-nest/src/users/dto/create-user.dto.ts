import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({ type: String })
  email: string
  
  @IsOptional()
  @ApiProperty({ type: String })
  @IsString()
  name?: string
  
  @IsOptional()
  @ApiProperty({ type: String })
  @IsString()
  image?: string
  
  @IsOptional()
  @ApiProperty({ type: String })
  @IsString()
  role?: string = 'USER'
}
