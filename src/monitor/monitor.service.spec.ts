import { User } from '../database/user';
import { MonitoredEndpoint } from '../database/monitored-endpoint';
import { UserRepositoryStub } from '../database/user/__mocks__/user-repository.stub';
import { MonitoredEndpointRepositoryStub } from '../database/monitored-endpoint/__mocks__/monitored-endpoint.repository.stub';
import { MonitoringResultRepositoryStub } from '../database/monitoring-result/__mocks__/monitoring-result.repository.stub';
import { MonitorService } from './monitor.service';
import { MonitorJob } from './monitor-job.model';
import { DatabaseProviderStub } from '../database/__mocks__/database.provider.stub';
import { DatabaseProvider } from '../database';
import { HttpServiceStub } from '../http/__mocks__/http.service.stub';
import Mock = jest.Mock;

// tslint:disable-next-line:no-any
jest.mock('./monitor-job.model');
let service: MonitorService;
let userRepositoryStub: UserRepositoryStub;
let monitoredEndpointRepositoryStub: MonitoredEndpointRepositoryStub;
let monitoringResultRepositoryStub: MonitoringResultRepositoryStub;
let httpServiceStub: HttpServiceStub;
let databaseProviderStub: DatabaseProviderStub;
// tslint:disable-next-line:no-any
const mockUpdate: Mock = jest.fn();// tslint:disable-next-line:no-any
const mockStop: Mock = jest.fn();

beforeEach((): void => {
    userRepositoryStub = new UserRepositoryStub();
    monitoredEndpointRepositoryStub= new MonitoredEndpointRepositoryStub();
    monitoringResultRepositoryStub = new MonitoringResultRepositoryStub();
    httpServiceStub = new HttpServiceStub();
    databaseProviderStub = new DatabaseProviderStub(monitoredEndpointRepositoryStub, monitoringResultRepositoryStub, userRepositoryStub);
    service = new MonitorService(databaseProviderStub as unknown as DatabaseProvider, httpServiceStub);
    // @ts-ignore
    MonitorJob.mockClear();
    mockUpdate.mockClear();
    mockStop.mockClear();
    // @ts-ignore
    // tslint:disable-next-line:typedef
    MonitorJob.mockImplementation(() => {
        return {
            getId: (): number => 1,
            update: mockUpdate,
            stop: mockStop
        };
    });
    });


test('monitor-service: start', async (): Promise<void> => {
    await service.start();
    expect(MonitorJob).toHaveBeenCalledTimes(1);
});

test('monitor-service: add endpoint', (): void => {
    const user: User = {id: 'valid', email: 'test@email.com', accessToken: 'token', endpoints: [], name: 'test'};
    const monitoredEndpoint: MonitoredEndpoint = {id: 1, monitoredInterval: 1, url: 'test.com', lastChecked: new Date(), created: new Date(), monitoringResults: [], owner: user, name: 'test'};
    service.addEndpoint(monitoredEndpoint);
    expect(MonitorJob).toHaveBeenCalledTimes(1);
});

test('monitor-service: update endpoint', async (): Promise<void> => {
    const user: User = {id: 'valid', email: 'test@email.com', accessToken: 'token', endpoints: [], name: 'test'};
    const monitoredEndpoint: MonitoredEndpoint = {id: 1, monitoredInterval: 1, url: 'test.com', lastChecked: new Date(), created: new Date(), monitoringResults: [], owner: user, name: 'test'};
    await service.start();
    service.updateEndpoint(monitoredEndpoint);
    expect(mockUpdate).toHaveBeenCalledTimes(1);
});

test('monitor-service: delete endpoint', async (): Promise<void> => {
    await service.start();
    service.deleteEndpoint(1);
    expect(mockStop).toHaveBeenCalledTimes(1);
});
