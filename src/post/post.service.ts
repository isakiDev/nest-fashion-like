import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { type CreatePostDto } from './dto/create-post.dto'
import { type User } from '../auth/entities/user.entity'
import { Post } from './entities/post.entity'
import { type PaginationDto } from '../common/dtos/pagination.dto'

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

    return await this.postRespository.save(post)
  }

  async findAll (paginationDto: PaginationDto) {
    const { limit = 5, offset = 0 } = paginationDto

    const posts = await this.postRespository.find({
      take: limit,
      skip: offset
    })

    return posts
  }

  async findOne (id: number) {
    const post = await this.postRespository.findOneBy({ id })

    if (!post) throw new NotFoundException(`Post with id ${id} not found`)

    return post
  }

  // update (id: number, updatePostDto: UpdatePostDto) {
  //   return `This action updates a #${id} post`
  // }

  // remove (id: number) {
  //   return `This action removes a #${id} post`
  // }
}
