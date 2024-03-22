import { BadRequestException } from '@nestjs/common'

const VALID_EXTENSIONS = ['jpeg', 'png', 'jpg', 'gif']

export const fileFilter = (req: Express.Request, file: Express.Multer.File, callback: Function) => {
  if (!file) return callback(new BadRequestException('File is empty'), false)

  const fileExtension = file.mimetype ? file.mimetype.split('/')[1] : undefined

  if (!fileExtension || !VALID_EXTENSIONS.includes(fileExtension)) {
    return callback(new BadRequestException('File extension not allowed'), false)
  }

  callback(null, true)
}
