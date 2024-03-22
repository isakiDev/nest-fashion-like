import { Injectable } from '@nestjs/common'
import { v2, type UploadApiErrorResponse, type UploadApiResponse } from 'cloudinary'

@Injectable()
export class CloudinaryService {
  async uploadFile (
    file: Express.Multer.File
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return await new Promise((resolve, reject) => {
      v2.uploader.upload_stream(
        {
          resource_type: 'image',
          folder: 'fashion-like'
        },
        (error, result) => {
          if (error) { reject(error); return }
          resolve(result)
        }
      ).end(file.buffer)
    })
  }
}
