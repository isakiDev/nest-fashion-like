import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { PostService } from '../post/post.service'
import { Comment } from './entities/comment.entity'
import { type User } from '../auth/entities/user.entity'
import { type CreateCommentDto } from './dtos/create-comment.dto'

@Injectable()
export class CommentService {
  constructor (
    private readonly postService: PostService,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) { }

  async create (postId: number, user: User, createCommentDto: CreateCommentDto) {
    const post = await this.postService.findOne(postId)

    const comment = this.commentRepository.create({ user, post, comment: createCommentDto.comment })

    await this.commentRepository.save(comment)
  }
}
