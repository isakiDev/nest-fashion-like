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
