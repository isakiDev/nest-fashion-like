import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common'
import { PostService } from './post.service'
import { CreatePostDto } from './dto'
import { GetUser } from 'src/auth/decorators'
import { User } from 'src/auth/entities/user.entity'
import { AuthGuard } from '@nestjs/passport'
import { PaginationDto } from 'src/common/dtos/pagination.dto'

@Controller('post')
export class PostController {
  constructor (private readonly postService: PostService) {}

  // TODO: add image to upload
  @Post()
  @UseGuards(AuthGuard())
  async createPost (
  @Body() createPostDto: CreatePostDto,
    @GetUser() user: User
  ) {
    return await this.postService.create(createPostDto, user)
  }

  @Get()
  async findAll (
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
