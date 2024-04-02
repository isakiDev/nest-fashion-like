import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm'

import { Reaction } from '../../reaction/entities/reaction.entity'
import { Post } from '../../post/entities/post.entity'
import { Comment } from '../../comment/entities/comment.entity'
import { Roles } from '../interfaces'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string

  @Column('text')
  readonly name: string

  @Column('text', {
    unique: true
  })
    email: string

  @Column('text', {
    select: false
  })
    password: string

  @Column('bool', {
    default: false
  })
    emailVerified?: boolean

  @Column('bool', {
    default: true
  })
    isActive?: boolean

  @Column('text', {
    array: true,
    default: [Roles.USER]
  })
    roles?: string[]

  // TODO: load url from .env
  @Column('text', {
    default: 'https://res.cloudinary.com/dzn3nempv/image/upload/v1709931089/fashion-like/users/smtcqxhlfpqjqwbeqvf4.png'
  })
  readonly image?: string

  @Column('text', {
    default: null
  })
    emailToken?: string

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
    createdAt?: Date

  @Column('timestamp', {
    default: () => 'CURRENT_TIMESTAMP'
  })
  readonly updatedAt?: Date

  @OneToMany(
    () => Post,
    (post) => post.user
  )
    post: Post

  @OneToMany(
    () => Reaction,
    (reaction) => reaction.user
  )
    reaction: Reaction

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
