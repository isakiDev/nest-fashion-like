import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { User } from '../../auth/entities/user.entity'
import { Post } from '../../post/entities/post.entity'
import { TypeReaction } from '../interfaces/reaction.interface'

@Entity('reactions')
// @Unique(['user', 'post'])
export class Reaction {
  @PrimaryGeneratedColumn('increment')
  readonly id: number

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  readonly createdAt?: Date

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  readonly updatedAt?: Date

  @Column('enum', {
    enum: TypeReaction
  })
  readonly type: TypeReaction

  @ManyToOne(
    () => User,
    (user) => user.id
  )
    user: User

  @ManyToOne(
    () => Post,
    (post) => post.id
  )
    post: Post
}
