import { Controller } from '@nestjs/common'
import { EmailService } from './email.service'

@Controller('email')
export class EmailController {
  constructor (private readonly emailService: EmailService) {}

  // @Post('')
  // async sendEmail (
  // @Body() sendEmailDto: SendEmailDto
  // ) {
  //   return await this.emailService.sendEmail(sendEmailDto)
  // }
}
