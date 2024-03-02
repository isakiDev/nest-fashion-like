import { IsBoolean, IsDate, IsString } from 'class-validator'
import { Like } from 'src/post/entities'
import { Post } from 'src/post/entities/post.entity'
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany } from 'typeorm'

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

  @Column('text', {
    default: null
  })
  @IsString()
  readonly emailVerifiedAt?: string

  @Column('bool', {
    default: true
  })
  @IsBoolean()
  readonly isActive?: boolean

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
