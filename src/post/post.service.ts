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
    const post = this.postRespository.create({
      ...createPostDto,
      user
    })

    await this.postRespository.save(post)

    const { user: userData, ...postData } = post

    return {
      post: postData,
      user: userData
    }
  }

  async findAll () {
    const posts = await this.postRespository.find()

    return posts.map(({ user, like, ...post }) => ({
      user,
      like,
      post
    }))
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
