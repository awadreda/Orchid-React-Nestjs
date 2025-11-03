import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateStoryDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsBoolean()
  published?: boolean = false;
}
