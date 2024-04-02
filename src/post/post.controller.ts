import { Controller, Get, Post, Body, UseGuards, Query, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator, Param, Delete, ParseIntPipe } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express'

import { PostService } from './post.service'
import { CreatePostDto } from './dto'
import { Auth, GetUser } from '../auth/decorators'
import { User } from '../auth/entities/user.entity'
import { PaginationDto } from '../common'
import { ValidRoles } from '../auth/interfaces'

@Controller('post')
export class PostController {
  constructor (
    private readonly postService: PostService
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
    return await this.postService.create(createPostDto, user, file)
  }

  @Get()
  async findPosts (
  @Query() paginationDto: PaginationDto
  ) {
    return await this.postService.findAll(paginationDto)
  }

  @Delete('/:id')
  @Auth(ValidRoles.admin)
  async deletePost (
  @Param('id', ParseIntPipe) id: number
  ) {
    await this.postService.delete(+id)
  }
}
