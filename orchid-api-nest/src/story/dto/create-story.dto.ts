// create-story.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsString,
  IsInt,
} from 'class-validator';

export class CreateStoryDto {
  @IsString()
  @ApiProperty({ type: String })
  @IsNotEmpty()
  title: string;

  @IsString()
  @ApiProperty({ type: String })
  @IsOptional()
  content?: string;

  @IsBoolean()
  @ApiProperty({ type: Boolean })
  @IsOptional()
  published?: boolean;

  @IsInt()
  @IsOptional()
  @ApiProperty({ type: Number })
  authorId?: number;
}
