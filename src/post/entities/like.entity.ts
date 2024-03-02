import { IsDate } from 'class-validator'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from 'src/auth/entities/user.entity'
import { Post } from './post.entity'

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn('increment')
  readonly id: number

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
