import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infrastructure/datasource/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";


const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource()
);

export class Server{
    static start(){

        console.log('Server running');
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