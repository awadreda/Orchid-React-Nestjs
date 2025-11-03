import { IsOptional, IsString, IsEmail } from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
  name?: string

  @IsOptional()
  @IsString()
  image?: string

  @IsOptional()
  @IsString()
  role?: string
}
