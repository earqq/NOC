import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { SendEmailLogs } from "../domain/use-cases/logs/email/send-logs";
import { FileSystemDataSource } from "../infrastructure/datasource/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasource/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";


const fileSystemLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
);

export class Server{
    static start(){

        console.log('Server running');
        console.log(envs.MAILER_EMAIL);
        console.log(envs.MAILER_SECRET_KEY);
        console.log(envs.MAILER_SERVICE);

        const emailService = new EmailService();
        // emailService.sendEmailWithAttachment(
        //     'earq14@gmail.com'
        // );

        new SendEmailLogs(emailService, fileSystemLogRepository).execute('earq14@gmail.com');

        emailService.sendEmailWithAttachment(
            'earq14@gmail.com'
        );
        //Send email

        CronService.createJob('*/2 * * * * *', () => {

            new CheckService(
                fileSystemLogRepository,
                () => {
                    console.log('success:');
                },
                (error) => {
                    console.error('Error:', error);
                }
            ).execute("https://www.google.com");
        });

    }
}