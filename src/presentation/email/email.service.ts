import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugins';
import { LogEntity } from '../../domain/entities/log.entity';
import { LogSeverityLevel } from '../../domain/enums/logSeverityLevel.enum';

interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    constructor() {}

    async sendEmail( options: SendEmailOptions ): Promise<boolean> {
        
        const { to, subject, htmlBody, attachments: attachments = [] } = options;
        
        try {
            
            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlBody,
                attachments: attachments,
            });

            const log = new LogEntity({
                level: LogSeverityLevel.low,
                message: 'Email sent',
                origin: 'email.service.ts',
            });
            
            return true;

        } catch (error) {
            const log = new LogEntity({
                level: LogSeverityLevel.high,
                message: 'Email not sent: ' + error,
                origin: 'email.service.ts',
            });
            return false;
        }
    }

    async sendEmailWithFileSystemLogs( to: string | string[] ) {
        
        const subject = 'Logs del servidor';
        const htmlBody = `
        <h1>Reporte de Logs del Sistema</h1>
        <p>Estimado administrador,</p>
        <p>A continuación, se detalla el reporte de logs del sistema:</p>
        `;
        const attachments: Attachment[] = [
            { filename: 'logs-all.log', path: './logs/logs-all.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
        ];

        return this.sendEmail({ to, subject, htmlBody, attachments });

    }

}
