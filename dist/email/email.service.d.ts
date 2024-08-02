import { MailerService } from '@nestjs-modules/mailer';
import { type SendUserConfirmationDto } from './dtos';
import { ConfigService } from '@nestjs/config';
export declare class EmailService {
    private readonly mailerService;
    private readonly configService;
    constructor(mailerService: MailerService, configService: ConfigService);
    sendUserConfirmation(sendUserConfirmationDto: SendUserConfirmationDto): Promise<void>;
}
