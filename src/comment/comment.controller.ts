import { Body, Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { CommentService } from './comment.service'
import { GetUser } from '../auth/decorators'
import { User } from '../auth/entities/user.entity'
import { CreateCommentDto } from './dtos/create-comment.dto'

@Controller('comment')
export class CommentController {
  constructor (private readonly commentService: CommentService) {}

  @Post('/:postId')
  @UseGuards(AuthGuard())
  async createComment (
  @Param('postId', ParseIntPipe) postId: number,
    @GetUser() user: User,
    @Body() createCommentDto: CreateCommentDto
  ) {
    return await this.commentService.create(postId, user, createCommentDto)
  }
}
