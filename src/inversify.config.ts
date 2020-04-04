import { Container } from 'inversify';
import { DatabaseProvider } from './database';
import { TYPE, interfaces } from 'inversify-restify-utils';
import { MonitoringResultController } from './web/monitored-endpoint/monitoring-result';
import { MonitoredEndpointController } from './web/monitored-endpoint';
import { MonitoringResultService } from './monitoring-result';
import { MonitoredEndpointService } from './monitored-endpoint';
import { AuthorizationService } from './authorization';
import { IntegerValidationService, MonitoredEndpointValidationService } from './validation';
import { HttpService } from './http';
import { MonitorService } from './monitor';
export class InversifyConfig {
    public createContainer(): Container {
        const container: Container = new Container();
        container.bind<DatabaseProvider>(DatabaseProvider).toSelf().inSingletonScope();
        // container.bind<MonitoredEndpointPersistanceService>(MonitoredEndpointPersistanceService).toSelf().inSingletonScope();
        // container.bind<MonitoringResultPersistanceService>(MonitoringResultPersistanceService).toSelf().inSingletonScope();
        // container.bind<UserPersistanceService>(UserPersistanceService).toSelf().inSingletonScope();

        container.bind<AuthorizationService>(AuthorizationService).toSelf().inSingletonScope();
        container.bind<MonitoredEndpointValidationService>(MonitoredEndpointValidationService).toSelf().inSingletonScope();
        container.bind<IntegerValidationService>(IntegerValidationService).toSelf().inSingletonScope();
        container.bind<HttpService>(HttpService).toSelf().inSingletonScope();
        container.bind<MonitorService>(MonitorService).toSelf().inSingletonScope();

        container.bind<interfaces.Controller>(TYPE.Controller).to(MonitoringResultController).whenTargetNamed('MonitoringResultController');
        container.bind<interfaces.Controller>(TYPE.Controller).to(MonitoredEndpointController).whenTargetNamed('MonitoredEndpointController');
        container.bind<MonitoringResultService>(MonitoringResultService).toSelf().inSingletonScope();
        container.bind<MonitoredEndpointService>(MonitoredEndpointService).toSelf().inSingletonScope();
        return container;
    }
}
