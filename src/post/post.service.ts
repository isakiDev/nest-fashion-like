import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { type CreatePostDto } from './dto/create-post.dto'
import { type UpdatePostDto } from './dto/update-post.dto'
import { type User } from '../auth/entities/user.entity'
import { Post } from './entities/post.entity'

@Injectable()
export class PostService {
  constructor (
    @InjectRepository(Post)
    private readonly postRespository: Repository<Post>
  ) {}

  async create (createPostDto: CreatePostDto, user: User) {
    console.log(user)

    const post = this.postRespository.create({
      ...createPostDto,
      user
    })

    await this.postRespository.save(post)

    return post
  }

  findAll () {
    return 'This action returns all post'
  }

  findOne (id: number) {
    return `This action returns a #${id} post`
  }

  update (id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`
  }

  remove (id: number) {
    return `This action removes a #${id} post`
  }
}
