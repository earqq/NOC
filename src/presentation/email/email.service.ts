
import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repositories/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';


interface SendMailOptions{
    to: string;
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment{
    filename: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor( 
    ){}

    async sendEmail(options: SendMailOptions): Promise<Boolean> {

        const { to, subject, htmlBody, attachments } = options;
        try{
            const sentInformation = await this.transporter.sendMail({
                from: envs.MAILER_EMAIL,
                to,
                subject,
                html: htmlBody,
                attachments
            });

            return true;
        }
        catch(err){
            return false;
        }
    }

    async sendEmailWithAttachment(to: string): Promise<Boolean> {
            
        try{
            const subject = 'Logs files';
            const htmlBody = '<h1>Logs files</h1>';
            const attachments: Attachment[] = [
                {
                    filename: 'logs-low.log',
                    path: 'logs/logs-low.log'
                },
            ];

            return this.sendEmail({ to, subject, htmlBody, attachments });
        }
        catch(err){
            console.error('Error sending email:', err);
            return false;
        }
    }
}

