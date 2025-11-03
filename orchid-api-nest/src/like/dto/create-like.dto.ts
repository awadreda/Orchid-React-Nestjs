import { IsInt } from 'class-validator';

export class CreateLikeDto {
  @IsInt()
  storyId: number;
}
