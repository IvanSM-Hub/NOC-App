import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDatasource } from "../infrastructure/datasource/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fyleSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDatasource()
);

export class ServerApp {

    public static start() {

        console.log('Server started...');

        CronService.createJob(
            '*/5 * * * * *',
            () => {
                const url = 'http://google.es';
                new CheckService(
                    fyleSystemLogRepository,
                   () => console.log(`${url} is ok`),
                   ( error ) => console.log( error ),
                ).execute( url );
                // new CheckService().execute('http://localhost:3000');
            }
        );

    }

}