// update-story.dto.ts
import { ApiProperty, ApiResponse } from '@nestjs/swagger';
import { IsOptional, IsBoolean, IsString, IsInt } from 'class-validator';

export class UpdateStoryDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  title?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  content?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: Boolean })
  published?: boolean;

  @IsInt()
  @ApiProperty({ type: Number })
  @IsOptional()
  authorId?: number;
}
