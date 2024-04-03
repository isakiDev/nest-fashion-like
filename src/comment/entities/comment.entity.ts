import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

import { User } from '../../auth/entities/user.entity'
import { Post } from '../../post/entities/post.entity'

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('increment')
  readonly id: number

  @Column('text')
  readonly comment: string

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  readonly createdAt?: Date

  @Column('timestamp', {
    default: null
  })
  readonly updatedAt?: Date

  @ManyToOne(
    () => User,
    (user) => user.id
  )
    user: User

  @ManyToOne(
    () => Post,
    (post) => post.id,
    { onDelete: 'CASCADE' }
  )
    post: Post
}
