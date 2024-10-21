import { LogDataSource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repositories/log.repository";


export class LogRepositoryImpl implements LogRepository{

    constructor(
        private readonly logDataSource: LogDataSource,
    ){

    }

    saveLog(log: LogEntity): Promise<void> {
        return this.logDataSource.saveLog(log);
    }
    getLogs(LogSeverity: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(LogSeverity);
    }
    
}