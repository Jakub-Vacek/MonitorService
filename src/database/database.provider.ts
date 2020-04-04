import { createConnection, getManager } from 'typeorm';
import { User, UserRepository } from './user';
import { MonitoredEndpoint, MonitoredEndpointRepository } from './monitored-endpoint';
import { MonitoringResult, MonitoringResultRepository } from './monitoring-result';
import { injectable } from 'inversify';
@injectable()
export class DatabaseProvider{
    public async connect(): Promise<void> {
        // @ts-ignore
        await createConnection({
            type: 'mysql',
            host: process.env.MYSQL_HOST || 'localhost',
            port: process.env.MYSQL_PORT ||3306,
            username: process.env.MYSQL_USERNAME || 'root',
            password: process.env.MYSQL_PASSWORD || 'root',
            database: process.env.MYSQL_DATABASE  || 'applifting',
            entities: [
                User, MonitoredEndpoint, MonitoringResult
            ],
            synchronize: false
        });
    }
    public getUserRepository():UserRepository {
        return getManager().getCustomRepository(UserRepository);
    }
    public getMonitoredEndpointRepository():MonitoredEndpointRepository {
        return getManager().getCustomRepository(MonitoredEndpointRepository);
    }
    public getMonitoringResultRepository():MonitoringResultRepository {
        return getManager().getCustomRepository(MonitoringResultRepository);
    }
}
