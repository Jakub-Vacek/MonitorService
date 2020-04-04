import { plugins, Server as restifyServer} from 'restify';
import { InversifyRestifyServer } from 'inversify-restify-utils';
import { InversifyConfig } from './inversify.config';
import { Container } from 'inversify';
import { DatabaseProvider } from './database';
import { AuthorizationService } from './authorization';
import logger from './logger/logger.model';
import { MonitorService } from './monitor';

export class Server {
    private server!: InversifyRestifyServer;
    private readonly container: Container;
    public constructor() {
        this.container = (new InversifyConfig()).createContainer();
    }
    private initializeServer(port: number): void {
        this.server = new InversifyRestifyServer(this.container);
        this.server.setConfig((app: restifyServer): void => {
            app.use(plugins.fullResponse());
            app.use(plugins.bodyParser({ mapParams : false }));
            app.use(plugins.authorizationParser(), this.container.get<AuthorizationService>(AuthorizationService).auth);
        }).build().listen(port);
    }
    public async start(port: number = 3000): Promise<void> {
        await this.container.get<DatabaseProvider>(DatabaseProvider).connect();
        logger.info('Connected to DB');
        await this.container.get<MonitorService>(MonitorService).start();
        logger.info('Monitor service started');
        this.initializeServer(port);
    }
}
