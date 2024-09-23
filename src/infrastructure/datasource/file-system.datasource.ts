import fs from 'fs';

import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogEntity } from '../../domain/entities/log.entity';
import { LogSeverityLevel } from '../../domain/enums/logSeverityLevel.enum';



export class FileSystemDatasource implements LogDatasource {

    private readonly logPath = 'logs/';
    private readonly allLogPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    constructor() {
        this.createLogsFiles();
    }

    private createLogsFiles = () => {

        // Revisamos que el directorio está creado, sinó lo creamos.
        if ( !fs.existsSync( this.logPath ) ) fs.mkdirSync( this.logPath );

        [
            this.allLogPath,
            this.mediumLogsPath,
            this.highLogsPath,
        ].forEach( path => {
            if( fs.existsSync( path ) )return;
            fs.writeFileSync( path, '' );
        } );

    }
    
    async saveLog(newLog: LogEntity): Promise<void> {

        const logAsJson = `${ JSON.stringify( newLog ) }\n`;
        
        fs.appendFileSync( this.allLogPath, logAsJson );

        switch (newLog.level) {
            case LogSeverityLevel.low:
                return;
            case LogSeverityLevel.medium:
                fs.appendFileSync( this.mediumLogsPath, logAsJson );
                return;
            case LogSeverityLevel.high:
                fs.appendFileSync( this.highLogsPath, logAsJson );
                break;
            default:
                throw new Error(`${ newLog.level } not valid.`);
        }

    }

    private getLogsFromFile = (path: string): LogEntity[] => {

        const content = fs.readFileSync( path, 'utf-8' );

        const stringLogs = content.split('\n').map( 
            log => LogEntity.fromJson( log )  
        );
        
        // const stringLogs = content.split('\n').map( LogEntity.fromJson );
        
        return stringLogs;
    }
    
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        
        switch( severityLevel ) {

            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.allLogPath);

            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.mediumLogsPath);

            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.highLogsPath);

            default:
                throw new Error(`${ severityLevel } not implemented.`);
            
        }
    
    }

}
