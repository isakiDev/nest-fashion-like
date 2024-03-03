import { Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { LikeService } from './like.service'
import { GetUser } from '../auth/decorators'
import { User } from '../auth/entities/user.entity'

@Controller('like')
export class LikeController {
  constructor (private readonly likeService: LikeService) {}

  @Post('/:postId')
  @UseGuards(AuthGuard())
  async createLike (
  @Param('postId', ParseIntPipe) postId: number,
    @GetUser() user: User
  ) {
    await this.likeService.create(postId, user)
  }
}
