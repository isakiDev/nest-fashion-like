import { IsDate } from 'class-validator'
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
  @IsDate()
  readonly createdAt?: Date

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  @IsDate()
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
