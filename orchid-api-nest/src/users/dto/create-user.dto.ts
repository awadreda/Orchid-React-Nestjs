import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  image?: string

  @IsOptional()
  @IsString()
  role?: string = 'USER'
}
