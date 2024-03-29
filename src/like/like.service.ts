import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { Like } from '../like/entities/like.entity'
import { type User } from '../auth/entities/user.entity'
import { PostService } from '../post/post.service'

@Injectable()
export class LikeService {
  constructor (
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
    private readonly postService: PostService
  ) {}

  async findOne (postId: number, user: User) {
    const post = await this.postService.findOne(postId)

    const like = await this.likeRepository.findOne({
      where: { post: { id: post.id }, user: { id: user.id } }
    })

    return like
  }

  async toggleLike (postId: number, user: User) {
    const like = await this.findOne(postId, user)

    if (!like) {
      const like = this.likeRepository.create({ user, post: { id: postId } })
      const { id } = await this.likeRepository.save(like)

      return { id }
    }

    await this.likeRepository.remove(like)

    return { id: undefined }
  }
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
