import { Controller, Get, Post, Body, UseGuards, Query, UseInterceptors, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, UploadedFile } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express'

import { PostService } from './post.service'
import { CreatePostDto } from './dto'
import { GetUser } from '../auth/decorators'
import { User } from '../auth/entities/user.entity'
import { PaginationDto } from '../common/dtos/pagination.dto'
// import { UploadedFile } from '../common/decorators/UploadedFile.decorator'
import { CloudinaryService } from '../cloudinary/cloudinary.service'

@Controller('post')
export class PostController {
  constructor (
    private readonly postService: PostService,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  @Post()
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  async createPost (
  @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: /^image\/(jpeg|png|jpg|gif)$/ })
        ]
      })
    ) file: Express.Multer.File
  ) {
    const { secure_url: imageUrl } = await this.cloudinaryService.uploadFile(file, 'fashion-like')

    return await this.postService.create(createPostDto, user, (imageUrl as string))
  }

  @Get()
  async findPosts (
  @Query() paginationDto: PaginationDto
  ) {
    return await this.postService.findAll(paginationDto)
  }

  // @Get(':id')
  // findOne (@Param('id') id: string) {
  //   return this.postService.findOne(+id)
  // }

  // @Patch(':id')
  // update (@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postService.update(+id, updatePostDto)
  // }

  // @Delete(':id')
  // remove (@Param('id') id: string) {
  //   return this.postService.remove(+id)
  // }
}
