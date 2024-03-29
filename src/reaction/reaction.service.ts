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
      await this.reactionRepository.update(reaction.id, { user, type })
      return { id: reaction.id, type }
    }

    await this.reactionRepository.remove(reaction)

    return {}
  }

  // async toggleLike (postId: number, user: User) {
  //   const like = await this.findOne(postId, user)

  //   if (!like) {
  //     const like = this.likeRepository.create({ user, post: { id: postId } })
  //     const { id } = await this.likeRepository.save(like)

  //     return { id }
  //   }

  //   await this.likeRepository.remove(like)

  //   return { id: undefined }
  // }

  // async create (postId: number, user: User) {
  //   const like = await this.findOne(postId, user)

  //   if (like) throw new ConflictException('Already like')

  //   const newLike = this.likeRepository.create({ user, post: { id: postId } })

  //   await this.likeRepository.save(newLike)
  // }

  // async remove (postId: number, user: User) {
  //   const like = await this.findOne(postId, user)

  //   if (!like) throw new NotFoundException('Like not found')

  //   await this.likeRepository.remove(like)
  // }
}
