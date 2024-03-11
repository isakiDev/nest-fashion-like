import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

import { type SendUserConfirmationDto } from './dtos'

@Injectable()
export class EmailService {
  constructor (
    private readonly mailerService: MailerService
  ) {}

  async sendUserConfirmation (sendUserConfirmationDto: SendUserConfirmationDto) {
    const { name, email, token } = sendUserConfirmationDto

    console.log(token)

    const url = `http://localhost:5173/auth/confirm?token=${token}`
    const subject = `Welcome ${name}`

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './confirmation',
      context: { name, url }
    })
  }
}
