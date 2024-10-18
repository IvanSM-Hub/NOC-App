import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDatasource } from "../infrastructure/datasource/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { EmailService } from "./email/email.service";

const fyleSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

export class ServerApp {

    public static start() {

        console.log('Server started...');

        // Mandar Email
        const emailService = new EmailService();
        
        new SendEmailLogs(
            emailService,
            fyleSystemLogRepository
        ).execute(
            ['ivan.sario.madrigal@gmail.com','ivanmadafaca@gmail.com']
        );
        
        /*
        emailService.sendEmail({
            to: 'ivan.sario.madrigal@gmail.com',
            subject: 'Logs de sistema',
            htmlBody: `
            <h3>Logs de sistema - NOC</h3>
            <p>Lorem velit non veniam ullamco ex eu laborum deserunt est am</p>
            <p>Ver logs adjuntos</p>
            `
            });
            emailService.sendEmailWithFileSystemLogs(
                ['ivan.sario.madrigal@gmail.com','ivanmadafaca@gmail.com']
            );

        */

        // CronService.createJob(
        //     '*/5 * * * * *',
        //     () => {
        //         const url = 'http://google.es';
        //         new CheckService(
        //             fyleSystemLogRepository,
        //            () => console.log(`${url} is ok`),
        //            ( error ) => console.log( error ),
        //         ).execute( url );
        //         // new CheckService().execute('http://localhost:3000');
        //     }
        // );

    }

}