import { LogModel } from "../../data/mongo";
import { LogDataSource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



export class MongoLogDatasource implements LogDataSource{
    async saveLog(log: any): Promise<void> {
        const newLog = await LogModel.create(log);
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {

        const logs = await LogModel.find({ level: severityLevel });
        return logs.map(log => LogEntity.fromObject(log));
    }
}