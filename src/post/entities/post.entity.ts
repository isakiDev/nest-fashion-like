import { IsDate, IsString } from 'class-validator'
import { User } from 'src/auth/entities/user.entity'
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Like } from './like.entity'

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
    (user) => user.id,
    { eager: true }
  )
    user: User

  @OneToMany(
    () => Like,
    (like) => like.post,
    { eager: true }
  )
    like: Like
}
