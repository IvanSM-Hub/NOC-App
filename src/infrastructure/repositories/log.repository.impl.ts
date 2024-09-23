import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity } from "../../domain/entities/log.entity";
import { LogSeverityLevel } from "../../domain/enums/logSeverityLevel.enum";
import { LogRepository } from "../../domain/repository/log.repository";

export class LogRepositoryImpl implements LogRepository {

    constructor(
        private readonly logDataSource: LogDatasource
    ) {}

    async saveLog(log: LogEntity): Promise<void> {
        return this.logDataSource.saveLog(log);
    }
    
    async getLogs(logSeverityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this.logDataSource.getLogs(logSeverityLevel);
    }

}