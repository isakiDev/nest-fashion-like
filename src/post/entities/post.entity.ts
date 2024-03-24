import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { User } from '../../auth/entities/user.entity'
import { Like } from '../../like/entities/like.entity'
import { Comment } from '../../comment/entities/comment.entity'

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('increment')
  readonly id: number

  @Column('text')
  readonly description: string

  @Column('text', {
    default: 'default.jpg'
  })
  readonly image?: string

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

  @OneToMany(
    () => Like,
    (likes) => likes.post
  )
    likes: Like[]

  @OneToMany(
    () => Comment,
    (comments) => comments.post
  )
    comments: Comment[]
}
