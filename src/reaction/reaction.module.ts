import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ReactionService } from './reaction.service'
import { ReactionController } from './reaction.controller'
import { Reaction } from './entities/reaction.entity'
import { AuthModule } from '../auth/auth.module'
import { PostModule } from 'src/post/post.module'

@Module({
  controllers: [ReactionController],
  providers: [ReactionService],
  imports: [
    TypeOrmModule.forFeature([Reaction]),
    AuthModule,
    PostModule
  ]
})
export class ReactionModule {}
