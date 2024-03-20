import { join } from 'path'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { MailerModule } from '@nestjs-modules/mailer'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'

import { EmailService } from './email.service'
import { EmailController } from './email.controller'

@Module({
  imports: [
    // ? use forRootAsync because its need get .envs to connect
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('EMAIL_HOST'),
          // port: Number('465'), // 587 - 465
          secure: false,
          auth: {
            user: config.get('EMAIL_USER'),
            pass: config.get('EMAIL_PASSWORD')
          }
        },
        defaults: {
          from: config.get('EMAIL_FROM')
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter(),
          options: {
            strict: false
          }
        }
      })
    })
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService]
})

export class EmailModule {}
