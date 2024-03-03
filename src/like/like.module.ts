import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { LikeService } from './like.service'
import { LikeController } from './like.controller'
import { Like } from './entities/like.entity'

@Module({
  controllers: [LikeController],
  providers: [LikeService],
  imports: [
    TypeOrmModule.forFeature([Like])
  ]
})
export class LikeModule {}
