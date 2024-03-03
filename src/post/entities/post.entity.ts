import { IsDate, IsString } from 'class-validator'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { User } from '../../auth/entities/user.entity'
import { Like } from '../../like/entities/like.entity'
import { Comment } from 'src/comment/entities/comment.entity'

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('increment')
  readonly id: number

  @Column('text')
  @IsString()
  readonly title: string

  @Column('text')
  @IsString()
  readonly description: string

  @Column('text', {
    default: 'default.jpg'
  })
  @IsString()
  readonly image?: string

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

  @OneToMany(
    () => Like,
    (like) => like.post
  )
    like: Like

  @OneToMany(
    () => Comment,
    (comment) => comment.post
  )
    comment: Comment
}
