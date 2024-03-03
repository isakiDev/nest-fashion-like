import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LikeService } from './like.service'
import { LikeController } from './like.controller'
import { Like } from './entities/like.entity'
import { AuthModule } from '../auth/auth.module'
import { PostModule } from 'src/post/post.module'

@Module({
  controllers: [LikeController],
  providers: [LikeService],
  imports: [
    TypeOrmModule.forFeature([Like]),
    AuthModule,
    PostModule
  ]
})
export class LikeModule {}
