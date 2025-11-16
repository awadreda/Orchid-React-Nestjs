import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, IsString, IsEmail } from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
    @ApiProperty({ type: String })
  
  @IsEmail()
  email?: string

  @IsOptional()
  @IsString()
    @ApiProperty({ type: String })

  name?: string

  @IsOptional()
  @ApiProperty({ type: String })

  @IsString()
  image?: string

    @ApiProperty({ type: String })
  @IsOptional()
  @IsString()
  role?: string
}
