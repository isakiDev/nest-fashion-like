import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'

import { CloudinaryService } from './cloudinary.service'

@Controller('cloudinary')
export class CloudinaryController {
  constructor (private readonly cloudinaryService: CloudinaryService) {}

  // @Post('upload/file')
  // @UseInterceptors(FileInterceptor('file'))
  // async uploadSingleImage (
  // @UploadedFile(
  //   new ParseFilePipe({
  //     fileIsRequired: true,
  //     validators: [
  //       new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
  //       new FileTypeValidator({ fileType: /^image\/(jpeg|jpg|gif)$/ })
  //     ]
  //   })
  // ) file: Express.Multer.File
  // ) {
  //   const result = await this.cloudinaryService.uploadFile(file)
  //   return result.secure_url
  // }
}
