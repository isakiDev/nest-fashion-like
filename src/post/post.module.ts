import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { PostService } from './post.service'
import { PostController } from './post.controller'
import { Post, Like } from './entities'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    TypeOrmModule.forFeature([Post, Like]),
    AuthModule
  ]
})
export class PostModule {}
