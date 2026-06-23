import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsOptional, IsString, IsUrl, MinLength } from "class-validator"

export  class RegesterUserDto {

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
  
}