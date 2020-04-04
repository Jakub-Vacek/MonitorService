import { MonitoredEndpointRepositoryStub } from '../monitored-endpoint/__mocks__/monitored-endpoint.repository.stub';
import { MonitoredEndpointRepository } from '../monitored-endpoint';
import { MonitoringResultRepository } from '../monitoring-result';
import { MonitoringResultRepositoryStub } from '../monitoring-result/__mocks__/monitoring-result.repository.stub';
import { UserRepositoryStub } from '../user/__mocks__/user-repository.stub';
import { UserRepository } from '../user';


export class DatabaseProviderStub {
    public constructor(public readonly monitoredEndpointRepository: MonitoredEndpointRepositoryStub,
                       public readonly monitoringResultRepository: MonitoringResultRepositoryStub,
                       public readonly userRepository: UserRepositoryStub
    ){}
    public getUserRepository():UserRepository {
        return this.userRepository as unknown as UserRepository;
    }
    public getMonitoredEndpointRepository():MonitoredEndpointRepository {
        return this.monitoredEndpointRepository as unknown as MonitoredEndpointRepository;
    }
    public getMonitoringResultRepository():MonitoringResultRepository {
        return this.monitoringResultRepository as unknown as MonitoringResultRepository;
    }
}
