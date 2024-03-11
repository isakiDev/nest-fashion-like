import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

import { type SendEmailDto } from './dtos'

@Injectable()
export class EmailService {
  constructor (
    private readonly mailerService: MailerService
  ) {}

  async sendMail (sendEmailDto: SendEmailDto) {
    const { email, name } = sendEmailDto

    const subject = `Welcome ${name}`

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './welcome',
      context: { name }
    })

    return { msg: 'Check email' }
  }
}
