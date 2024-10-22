import { envs } from "../config/plugins/envs.plugin";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multipe";
import { FileSystemDataSource } from "../infrastructure/datasource/file-system.datasource";
import { MongoLogDatasource } from "../infrastructure/datasource/mongo-log.datasource";
import { PostgresLogDatasource } from "../infrastructure/datasource/postgres-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email.service";


const fsSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);
const mongoSystemLogRepository = new LogRepositoryImpl(
    new MongoLogDatasource()
);
const postgresSystemLogRepository = new LogRepositoryImpl(
    new PostgresLogDatasource()
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

        // new SendEmailLogs(emailService, fileSystemLogRepository).execute('earq14@gmail.com');

        emailService.sendEmailWithAttachment(
            'earq14@gmail.com'
        );
        //Send email

        // CronService.createJob('*/2 * * * * *', () => {

        //     new CheckServiceMultiple(
        //         [ fsSystemLogRepository, mongoSystemLogRepository, postgresSystemLogRepository ],
        //         () => {
        //             console.log('success:');
        //         },
        //         (error) => {
        //             console.error('Error:', error);
        //         }
        //     ).execute("https://www.google.com");
        // });

    }
}