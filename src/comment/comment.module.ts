import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CommentService } from './comment.service'
import { CommentController } from './comment.controller'
import { Comment } from './entities/comment.entity'

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [
    TypeOrmModule.forFeature([Comment])
  ]
})
export class CommentModule {}
