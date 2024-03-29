import { Body, Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

import { ReactionService } from './reaction.service'
import { GetUser } from '../auth/decorators'
import { User } from '../auth/entities/user.entity'
import { CreateReactionDto } from './dtos/create-interaction.dto'

@Controller('reaction')
export class ReactionController {
  constructor (private readonly reactionService: ReactionService) {}

  @Post('/:postId')
  @UseGuards(AuthGuard())
  async handlePostReaction (
  @Param('postId', ParseIntPipe) postId: number,
    @GetUser() user: User,
    @Body() createReactionDto: CreateReactionDto
  ) {
    return await this.reactionService.handlePostReaction(postId, user, createReactionDto)
  }

  // @Delete('/:postId')
  // @UseGuards(AuthGuard())
  // async deleteLike (
  // @Param('postId', ParseIntPipe) postId: number,
  //   @GetUser() user: User
  // ) {
  //   await this.likeService.remove(postId, user)
  // }
}
