import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { User } from '../../auth/entities/user.entity'
import { Post } from '../../post/entities/post.entity'

@Entity('likes')
// @Unique(['user', 'post'])
export class Like {
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
