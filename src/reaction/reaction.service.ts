import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { Reaction } from '../reaction/entities/reaction.entity'
import { type User } from '../auth/entities/user.entity'
import { PostService } from '../post/post.service'
import { type CreateReactionDto } from './dtos/create-interaction.dto'

@Injectable()
export class ReactionService {
  constructor (
    @InjectRepository(Reaction)
    private readonly reactionRepository: Repository<Reaction>,
    private readonly postService: PostService
  ) {}

  async findOne (postId: number, user: User) {
    const post = await this.postService.findOne(postId)

    const reaction = await this.reactionRepository.findOne({
      where: { post: { id: post.id }, user: { id: user.id } }
    })

    return reaction
  }

  async handlePostReaction (postId: number, user: User, createReactionDto: CreateReactionDto) {
    const { type } = createReactionDto
    const reaction = await this.findOne(postId, user)

    if (!reaction) {
      const reaction = this.reactionRepository.create({ user, post: { id: postId }, type })
      const interaction = await this.reactionRepository.save(reaction)
      return { id: interaction.id, type: interaction.type }
    }

    if (reaction.type !== type) {
      await this.reactionRepository.update(reaction.id, {
        user,
        type,
        updatedAt: new Date(Date.now()).toISOString()
      })
      return { id: reaction.id, type }
    }

    await this.reactionRepository.remove(reaction)

    return {}
  }
}
