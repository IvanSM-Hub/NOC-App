import { LogSeverityLevel } from "../enums/logSeverityLevel.enum";

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    origin: string;
    createdAt?: Date;
}

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor( options: LogEntityOptions ) {
        const { 
            message,
            level,
            origin,
            createdAt = new Date()
        } = options;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
        this.origin = origin;
    }

    static fromJson = (json: string): LogEntity => {
        const { messageJson, levelJson, originJson, createdAtJson } = JSON.parse(json);
        const log = new LogEntity({ 
            message: messageJson,
            level: levelJson, 
            origin: originJson,
            createdAt: createdAtJson
        });
        log.createdAt = new Date( createdAtJson );
        return log;
    }

}
