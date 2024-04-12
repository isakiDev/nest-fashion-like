import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './auth/auth.module'
import { PostModule } from './post/post.module'
import { ReactionModule } from './reaction/reaction.module'
import { CommentModule } from './comment/comment.module'
import { EmailModule } from './email/email.module'
import { CloudinaryModule } from './cloudinary/cloudinary.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod',
      extra: {
        ssl: process.env.STAGE !== 'prod'
          ? { rejectUnauthorized: false }
          : null
      },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true
    }),

    AuthModule,
    PostModule,
    ReactionModule,
    CommentModule,
    EmailModule,
    CloudinaryModule
  ]
})
export class AppModule {}
