import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor (private readonly commentService: CommentService) {}

  @Get('GetCommentsByStoryId/:id')
  async getAllCommentsForStory (@Param('id') id: string) {
    const numId = parseInt(id);

    if (isNaN(numId)) {
      return { message: 'Invalid story ID' };
    }
    const comments = await this.commentService.getAllCommentsForStory(numId);

    return comments;
  }

  @Get('GetCommentById/:id')
  async getCommentById (@Param('id') id: string) {
    const numId = parseInt(id);
    if (isNaN(numId)) {
      return { message: 'Invalid comment ID' };
    }
    const comment = await this.commentService.getCommentById(numId);
    if (!comment) {
      return { message: 'Comment not found' };
    }
    return comment;
  }

  @Post('CreateComment')
  async createComment (@Body() createCommentDto: CreateCommentDto) {
    const comment = await this.commentService.createComment(createCommentDto);
    if (!comment) {
      throw new Error('Comment creation failed');
    }
    return comment;
  }

  @Put('UpdateComment/:id')
  async updateComment (
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {

    const numId = parseInt(id);
    if (isNaN(numId)) {
      return { message: 'Invalid comment ID' };
    }
    const updatedComment = await this.commentService.updateComment(
      numId,
      updateCommentDto,
    );
    if (!updatedComment) {
      return { message: 'Comment not found or update failed' };
    }
    return updatedComment;
  }

  @Delete('DeleteComment/:id')
  async deleteComment (@Param('id') id: string) {

    const numId = parseInt(id);
    if (isNaN(numId)) {
      return { message: 'Invalid comment ID' };
    }
    const deletedComment = await this.commentService.deleteComment(numId);
    if (!deletedComment) {
      return { message: 'Comment not found or deletion failed' };
    }
    return deletedComment;
  }
}
