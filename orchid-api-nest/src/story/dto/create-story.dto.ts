// create-story.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsString,
  IsInt,
} from 'class-validator';
import { buffer } from 'stream/consumers';

export class CreateStoryDto {
  @IsString()
  @ApiProperty({ type: String })
  @IsNotEmpty()
  title: string;

  @IsString()
  @ApiProperty({ type: String })
  @IsOptional()
  content?: string;

  @IsString()
  @ApiProperty({ type: String })
  @IsOptional()
  caption?: string;

  @IsString()
  @ApiProperty({ type: String, format: 'binary' })
  @IsOptional()
  thumbnail: Express.Multer.File;

  @IsBoolean()
  @ApiProperty({ type: Boolean })
  @IsOptional()
  published?: boolean;

  @IsInt()
  @IsOptional()
  @ApiProperty({ type: Number })
  authorId?: number;
}
