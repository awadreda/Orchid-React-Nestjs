import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { StoryModule } from './story/story.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    StoryModule,
    CommentModule,
    LikeModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
