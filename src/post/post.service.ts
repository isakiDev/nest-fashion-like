import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { type CreatePostDto } from './dto/create-post.dto'
import { type User } from '../auth/entities/user.entity'
import { Post } from './entities/post.entity'
import { type PaginationDto } from '../common/dtos/pagination.dto'
import { CloudinaryService } from '../cloudinary/cloudinary.service'

@Injectable()
export class PostService {
  constructor (
    @InjectRepository(Post)
    private readonly postRespository: Repository<Post>,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async create (createPostDto: CreatePostDto, user: User, imageUrl: string) {
    const post = this.postRespository.create({
      ...createPostDto,
      user,
      image: imageUrl
    })

    return await this.postRespository.save(post)
  }

  async findAll (paginationDto: PaginationDto) {
    const { limit = 5, offset = 0 } = paginationDto

    const posts = await this.postRespository.find({
      take: limit,
      skip: offset,
      relations: ['user', 'comments', 'comments.user', 'likes', 'likes.user'],
      select: {
        user: { id: true, name: true, email: true, image: true },
        likes: { id: true, user: { id: true, name: true } },
        comments: { id: true, comment: true, user: { id: true, name: true, email: true, image: true } }
      }
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
