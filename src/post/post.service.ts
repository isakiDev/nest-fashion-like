import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Repository } from 'typeorm'

import { type CreatePostDto } from './dto/create-post.dto'
import { type User } from '../auth/entities/user.entity'
import { Post } from './entities/post.entity'
import { type PaginationDto } from '../common'
import { CloudinaryService } from '../cloudinary/cloudinary.service'
import { type UpdatePostDto } from './dto'

@Injectable()
export class PostService {
  constructor (
    @InjectRepository(Post)
    private readonly postRespository: Repository<Post>,
    private readonly cloudinaryService: CloudinaryService
  ) {}

  async create (createPostDto: CreatePostDto, user: User, file: Express.Multer.File) {
    const { secure_url: imageUrl } = await this.cloudinaryService.uploadFile(file, 'fashion-like')

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
      relations: ['user', 'comments', 'comments.user', 'reactions', 'reactions.user'],
      select: {
        user: { id: true, name: true, email: true, image: true },
        reactions: { id: true, type: true, user: { id: true, name: true } },
        comments: { id: true, comment: true, user: { id: true, name: true, email: true, image: true } }
      },
      order: { createdAt: 'DESC' }
    })

    return posts
  }

  async findOne (id: number) {
    const post = await this.postRespository.findOneBy({ id })

    if (!post) throw new NotFoundException(`Post with id ${id} not found`)

    return post
  }

  async delete (id: number) {
    const { image } = await this.findOne(id)
    const imageId = image.split('/').at(-1).split('.').at(0)

    await this.postRespository.delete(id)
    await this.cloudinaryService.deleteFile(imageId, 'fashion-like')
  }

  async update (id: number, updatePostDto: UpdatePostDto, user: User) {
    const post = await this.postRespository.findOne({
      where: { id },
      relations: ['user'],
      select: ['user']
    })

    if (user.id !== post.user.id) throw new UnauthorizedException('The post does not belong to this user')

    const updatedPost = {
      ...post,
      ...updatePostDto,
      updatedAt: new Date(Date.now()).toISOString()
    }

    await this.postRespository.save(updatedPost)

    delete updatedPost.user

    return updatedPost
  }
}
