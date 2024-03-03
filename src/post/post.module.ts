import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PostService } from './post.service'
import { PostController } from './post.controller'
import { Post } from './entities/post.entity'
import { AuthModule } from '../auth/auth.module'

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    TypeOrmModule.forFeature([Post]),
    AuthModule
  ],
  exports: [
    PostService
  ]
})
export class PostModule {}
