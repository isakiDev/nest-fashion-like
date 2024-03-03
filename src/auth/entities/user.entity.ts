import { IsBoolean, IsDate, IsString } from 'class-validator'
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm'

import { Like } from '../../like/entities/like.entity'
import { Post } from '../../post/entities/post.entity'

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
  readonly emailVerified?: boolean

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

  @Column('text', {
    default: 'default.jpg'
  })
  @IsString()
  readonly image?: string

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

  @BeforeInsert()
  checkFieldsInsert () {
    this.email = this.email.toLocaleLowerCase().trim()
  }

  @BeforeUpdate()
  checkFieldsUpdate () {
    this.checkFieldsInsert()
  }
}
