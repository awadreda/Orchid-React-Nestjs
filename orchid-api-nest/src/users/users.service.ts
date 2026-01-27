import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';
import { UserDashboardDto, UserResponseDto } from './dto/user-response.dto';
import { UserMapper } from './Mapper/user-mapper';
import { CommentMapper } from 'src/comment/Mappers/comment-mapper';
import { StoryMapper } from 'src/story/Mapper/stroy-mapper';
import { LikeMapper } from 'src/like/Mappers/like-mapper';

@Injectable()
export class UsersService {
  constructor (private readonly _prisma: PrismaService) {}

  private userMapper = new UserMapper();
  private commentMapper = new CommentMapper();
  private storyMapper = new StoryMapper();
  private likeMapper = new LikeMapper();

  async getUsers (): Promise<UserResponseDto[]> {
    try {
      const users = await this._prisma.user.findMany({
        include: {
          comments: true,
          likes: true,
          stories: {
            include: {
              comments: true,
              likes: true,
              author: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      const mappedUsers = users.map(user =>
        this.userMapper.toResponseDto(
          user,
          user.comments.map(comment => this.commentMapper.toResponse(comment)),
          user.likes.map(like => this.likeMapper.toResponse(like)),
          user.stories.map(story =>
            this.storyMapper.toStoryResponse(
              story,
              story.comments.map(comment =>
                this.commentMapper.toResponse(comment),
              ),
              story.likes.map(like => this.likeMapper.toResponse(like)),
              story.author
                ? this.userMapper.toSampleResponse(story.author)
                : null,
            ),
          ),
        ),
      );

      return mappedUsers;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async getUserById (id: number): Promise<UserResponseDto | null> {
    try {
      const user = await this._prisma.user.findUnique({
        where: { id },
        include: {
          comments: true,
          likes: true,
          stories: {
            include: {
              author: true,
              comments: true,
              likes: true,
            },
          },
        },
      });
      if (!user) {
        return null;
      }

      return this.userMapper.toResponseDto(
        user,
        user.comments.map(comment => this.commentMapper.toResponse(comment)),
        user.likes.map(like => this.likeMapper.toResponse(like)),
        user.stories.map(story =>
          this.storyMapper.toStoryResponse(
            story,
            story.comments.map(comment =>
              this.commentMapper.toResponse(comment),
            ),
            story.likes.map(like => this.likeMapper.toResponse(like)),
            story.author
              ? this.userMapper.toSampleResponse(story.author)
              : null,
          ),
        ),
      );
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw error;
    }
  }

  async getUsersDashboardData (): Promise<UserDashboardDto[]> {
    try {
      const users = await this._prisma.user.findMany({
        include: {
          comments: true,
          likes: true,
          stories: true,
        },
      });

      return users.map(user => {
        const storiesCount = user.stories?.length ?? 0;
        const commentsCount = user.comments?.length ?? 0;

        return this.userMapper.toUserDashboardDto(
          user,
          storiesCount,
          commentsCount,
        );
      });
    } catch (error) {
      console.error('Error fetching users dashboard data:', error);
      throw error;
    }
  }

  async getUserDashboardDataByID (id: number): Promise<UserDashboardDto | null> {
    try {
      const user = await this._prisma.user.findUnique({
        where: { id },
        include: {
          comments: true,
          likes: true,
          stories: true,
        },
      });
      if (!user) {
        return null;
      }
      const storiesCount = user.stories?.length ?? 0;
      const commentsCount = user.comments?.length ?? 0;

      return this.userMapper.toUserDashboardDto(
        user,
        storiesCount,
        commentsCount,
      );
    } catch (error) {
      console.error('Error fetching user dashboard data:', error);
      throw error;
    }
  }

  isUserExist (id: number): Promise<boolean> {
    return this._prisma.user.findUnique({ where: { id } }).then(user => !!user);
  }

  async createUser (
    createUserDto: CreateUserDto,
  ): Promise<UserResponseDto | null> {
    try {
      const newUser = await this._prisma.user.create({
        data: {
          email: createUserDto.email,
          name: createUserDto.name,
          password: createUserDto.password,
          image: createUserDto.image,
          role: createUserDto.role,
          createdAt: new Date(),
        },
      });
      return this.userMapper.toSampleResponse(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser (
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto | null> {
    try {
      const updatedUser = await this._prisma.user.update({
        where: { id },
        data: updateUserDto,
      });

      if (!updatedUser) {
        return null;
      }
      return this.userMapper.toSampleResponse(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser (
    id: number,
  ): Promise<{ message: string; user: UserResponseDto | null }> {
    try {
      if (!(await this.isUserExist(id))) {
        return { message: 'User not found', user: null };
      }

      const user = await this._prisma.user.delete({
        where: { id },
      });

      return {
        message: 'User deleted successfully',
        user: this.userMapper.toSampleResponse(user),
      };
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // async createUser(createUserDto: CreateUserDto): Promise<User> {
}
