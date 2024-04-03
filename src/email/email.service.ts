import { Injectable } from '@nestjs/common'
import { MailerService } from '@nestjs-modules/mailer'

import { type SendUserConfirmationDto } from './dtos'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class EmailService {
  constructor (
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}

  async sendUserConfirmation (sendUserConfirmationDto: SendUserConfirmationDto) {
    const { name, email, token } = sendUserConfirmationDto

    const url = `${this.configService.get('FRONT_END_HOST')}/auth/confirm?token=${token}`
    const subject = `Welcome ${name}`

    await this.mailerService.sendMail({
      to: email,
      subject,
      template: './confirmation',
      context: { name, url }
    })
  }
}
