import { IsDate } from 'class-validator'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from 'src/auth/entities/user.entity'
import { Post } from './post.entity'

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn('increment')
  readonly id: number

  @Column('date', {
    default: new Date().toDateString()
  })
  @IsDate()
  readonly createdAt?: Date

  @Column('date', {
    default: new Date().toDateString()
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
