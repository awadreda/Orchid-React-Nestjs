import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString, IsUrl, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  @IsString()
  @ApiProperty({ type: String })
  email: string
  
  @IsOptional()
  @ApiProperty({ type: String })
  @IsString()
  name?: string

  @MinLength(6)
  @ApiProperty({ type: String })
  @IsString()
  password: string

  @IsOptional()
  @IsUrl()
  @ApiProperty({ type: String })
  @IsString()
  image?: string
  
  @IsOptional()
  @ApiProperty({ type: String })
  @IsString()
  role?: string = 'USER'
}
