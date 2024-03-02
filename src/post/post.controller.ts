import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { PostService } from './post.service'
import { CreatePostDto } from './dto'
import { GetUser } from 'src/auth/decorators'
import { User } from 'src/auth/entities/user.entity'
import { AuthGuard } from '@nestjs/passport'

@Controller('post')
export class PostController {
  constructor (private readonly postService: PostService) {}

  @Post()
  @UseGuards(AuthGuard())
  async create (
  @Body() createPostDto: CreatePostDto,
    @GetUser() user: User
  ) {
    return await this.postService.create(createPostDto, user)
  }

  @Get()
  async findAll () {
    return await this.postService.findAll()
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
