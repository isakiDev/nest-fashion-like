import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { Like } from '../like/entities/like.entity'
import { type User } from '../auth/entities/user.entity'
import { PostService } from '../post/post.service'

@Injectable()
export class LikeService {
  constructor (
    private readonly postService: PostService,
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>
  ) {}

  async create (postId: number, user: User) {
    const post = await this.postService.findOne(postId)

    const like = this.likeRepository.create({ user, post })

    await this.likeRepository.save(like)
  }

  // TODO: fix method find like
  async remove (postId: number, user: User) {
    const post = await this.postService.findOne(postId)

    const like = await this.likeRepository.findOneBy({ id: 14 })
    console.log(like)

    if (!like) throw new NotFoundException('Like not found')

    await this.likeRepository.remove(like)
  }
}
