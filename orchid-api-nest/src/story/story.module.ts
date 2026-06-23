import { Module } from '@nestjs/common';
import { StoryService } from './Services/story.service';
import { StoryController } from './story.controller';
import { UsersModule } from 'src/users/users.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryProvider } from './Services/Images/cloudinary.provider';
import { ImagesService } from './Services/Images/Images.service';

@Module({
  imports: [PrismaModule,UsersModule],
  controllers: [StoryController],
  providers: [StoryService, CloudinaryProvider, ImagesService],
  exports: [CloudinaryProvider, ImagesService],
})
export class StoryModule {}
