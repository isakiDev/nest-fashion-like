import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CommentService } from './comment.service'
import { CommentController } from './comment.controller'
import { Comment } from './entities/comment.entity'
import { PostModule } from '../post/post.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [
    TypeOrmModule.forFeature([Comment]),
    AuthModule,
    PostModule
  ]
})
export class CommentModule {}
