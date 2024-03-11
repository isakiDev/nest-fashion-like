import { join } from 'path'
import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'

import { EmailService } from './email.service'
import { EmailController } from './email.controller'

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        // port: Number('465'), // 587 - 465
        secure: false,
        auth: {
          user: 'gaspar.c.test@gmail.com',
          pass: 'yujz tzed jjgq kcih'
        }
      },
      defaults: {
        from: '"From Name" <from@example.com>'
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new EjsAdapter(),
        options: {
          strict: true
        }
      }
    })
  ],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService]
})

export class EmailModule {}
