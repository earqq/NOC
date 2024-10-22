import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDataSource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH
}


export class PostgresLogDatasource implements LogDataSource{
    async saveLog(log: LogEntity): Promise<void> {

        const level = severityEnum[log.level];
        const prisma = new PrismaClient();
        const newLog = await prisma.logModel.create({
            data: {
                ...log,
                level
            }
        }); 
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<any[]> {
        const prisma = new PrismaClient();
        const level = severityEnum[severityLevel];
        const logs = await prisma.logModel.findMany({
            where: {
                level
            }
        });
        return logs.map(LogEntity.fromObject);
    }
}