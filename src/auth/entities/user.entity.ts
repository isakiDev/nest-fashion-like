import { IsBoolean, IsDate, IsString } from 'class-validator'
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm'

import { Like } from '../../like/entities/like.entity'
import { Post } from '../../post/entities/post.entity'
import { Comment } from 'src/comment/entities/comment.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column('text')
  @IsString()
  readonly name: string

  @Column('text', {
    unique: true
  })
  @IsString()
    email: string

  @Column('text', {
    select: false
  })
  @IsString()
    password: string

  @Column('bool', {
    default: false
  })
  @IsBoolean()
    emailVerified?: boolean

  @Column('bool', {
    default: true
  })
  @IsBoolean()
    isActive?: boolean

  @Column('text', {
    array: true,
    default: ['user']
  })
  readonly roles?: string[]

  // TODO: load url from .env
  @Column('text', {
    default: 'https://res.cloudinary.com/dzn3nempv/image/upload/v1709931089/fashion-like/users/smtcqxhlfpqjqwbeqvf4.png'
  })
  @IsString()
  readonly image?: string

  @Column('text', {
    default: null
  })
    emailToken?: string

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  @IsDate()
    createdAt?: Date

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  @IsDate()
  readonly updatedAt?: Date

  @OneToMany(
    () => Post,
    (post) => post.user
  )
    post: Post

  @OneToMany(
    () => Like,
    (like) => like.user
  )
    like: Like

  @OneToMany(
    () => Comment,
    (comment) => comment.user
  )
    comment: Comment

  @BeforeInsert()
  checkFieldsInsert () {
    this.email = this.email.toLocaleLowerCase().trim()
  }

  @BeforeUpdate()
  checkFieldsUpdate () {
    this.checkFieldsInsert()
  }
}
