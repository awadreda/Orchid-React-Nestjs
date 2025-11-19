import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CommentMapper } from './Mappers/comment-mapper';

@Injectable()
export class CommentService {
  constructor (private readonly _prisma: PrismaService) {}

  commentMapper = new CommentMapper();

  async getAllCommentsForStory (storyId: number) {
    try {
      const commnets = await this._prisma.comment.findMany({
        where: { storyId: storyId },
        orderBy: { createdAt: 'desc' },
      });
      return commnets.map(comment => this.commentMapper.toResponse(comment));
    } catch (error) {
      console.error('Error fetching comments for story:', error);
      throw error;
    }
  }

  async getCommentById (id: number) {
    try {
      const comment = await this._prisma.comment.findUnique({
        where: { id },
      });

      if (!comment) {
        return null;
      }

      return this.commentMapper.toResponse(comment);
    } catch (error) {
      console.error('Error fetching comment by ID:', error);
      throw error;
    }
  }

  async isCommentExist (id: number): Promise<boolean> {
    const comment = await this._prisma.comment.findUnique({
      where: { id },
    });
    return comment ? true : false;
  }

  async createComment (createCommentDto: CreateCommentDto) {
    try {
      const newComment = await this._prisma.comment.create({
        data: {
          content: createCommentDto.content,
          storyId: createCommentDto.storyId,
          authorId: createCommentDto.authorId,
        },
      });

      return this.commentMapper.toResponse(newComment);
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  }

  async updateComment (id: number, updateCommentDto: UpdateCommentDto) {
    try {
      if (!(await this.isCommentExist(id))) {
        return { message: 'Comment not found' };
      }
      const updatedComment = await this._prisma.comment.update({
        where: { id },
        data: {
          content: updateCommentDto.content,
        },
      });

      return this.commentMapper.toResponse(updatedComment);
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  }

  async deleteComment (id: number) {
    try {
      if (!(await this.isCommentExist(id))) {
        return { message: 'Comment not found' };
      }
      await this._prisma.comment.delete({
        where: { id },
      });
      return { message: 'Comment deleted successfully' };
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }
}
