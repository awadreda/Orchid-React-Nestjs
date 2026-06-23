import { Injectable } from "@nestjs/common";
import { UploadApiErrorResponse, UploadApiResponse, v2 } from "cloudinary";
import { error } from "console";
import { PrismaService } from "src/prisma/prisma.service";
import { UsersService } from "src/users/users.service";
import { Readable } from "stream";



@Injectable()
export class ImagesService {
  constructor (
    private readonly _prisma: PrismaService,
    private readonly _userService: UsersService,
  ) {}



  async uploadImageToCloudinary (file: Express.Multer.File): Promise<UploadApiResponse|UploadApiErrorResponse|undefined> {

    return new Promise((resolve, reject) => {
      
        const result =  v2.uploader.upload_stream( {
          folder: 'OrchidStoriesThumb',
        },(error,result) => {
          if (error) {
            console.error('Error uploading image to Cloudinary:', error);
            reject(error);
          } else {
            resolve(result);
          }
        });
        Readable.from(file.buffer).pipe(result);
      }
    );
  }



      deleteImageFromCloudinary (publicId: string): Promise<UploadApiResponse|UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader.destroy(publicId, (error, result) => {
        if (error) {
          console.error('Error deleting image from Cloudinary:', error);
          reject(error);
        } else {
          resolve(result);
        }
      });
    });

  }

}