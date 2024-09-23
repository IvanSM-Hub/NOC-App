import { LogSeverityLevel } from "../enums/logSeverityLevel.enum";

export class LogEntity {
    
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;

    constructor( message: string, level: LogSeverityLevel ) {
        this.message = message;
        this.level = level;
        this.createdAt = new Date();
    }

    static fromJson = ( json: string ): LogEntity => {
        const { message, createdAt, level } = JSON.parse(json);
        const log = new LogEntity( message, level );
        log.createdAt = new Date( createdAt );
        return log;
    }

}
