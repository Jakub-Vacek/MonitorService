import { MonitoredEndpointService } from './monitored-endpoint.service';
import { UserRepositoryStub } from '../database/user/__mocks__/user-repository.stub';
import { MonitoredEndpointRepositoryStub } from '../database/monitored-endpoint/__mocks__/monitored-endpoint.repository.stub';
import { MonitoringResultRepositoryStub } from '../database/monitoring-result/__mocks__/monitoring-result.repository.stub';
import { DatabaseProviderStub } from '../database/__mocks__/database.provider.stub';
import { DatabaseProvider, MonitoredEndpoint, User } from '../database';
import { MonitorServiceStub } from '../monitor/__mocks__/monitor.service.stub';
import { MonitorService } from '../monitor';
import { NotAuthorizedError, NotFoundError } from 'restify-errors';
const realDate: DateConstructor = Date;
const date: Date = new Date();
// @ts-ignore
global.Date = jest.fn((): Date => date);
let service: MonitoredEndpointService;
let userRepositoryStub: UserRepositoryStub;
let monitoredEndpointRepositoryStub: MonitoredEndpointRepositoryStub;
let monitoringResultRepositoryStub: MonitoringResultRepositoryStub;
let monitorServiceStub: MonitorServiceStub;
beforeEach((): void => {
    userRepositoryStub = new UserRepositoryStub();
    monitoredEndpointRepositoryStub= new MonitoredEndpointRepositoryStub();
    monitoringResultRepositoryStub = new MonitoringResultRepositoryStub();
    monitorServiceStub = new MonitorServiceStub();
    service = new MonitoredEndpointService((new DatabaseProviderStub(monitoredEndpointRepositoryStub, monitoringResultRepositoryStub, userRepositoryStub)) as unknown as DatabaseProvider,
                                            monitorServiceStub as unknown as MonitorService);
});
test('monitored-endpoint-service: get user endpoints', async (): Promise<void> => {
    const user: User = {id: 'valid', email: 'test@email.com', accessToken: 'token', endpoints: [], name: 'test'};
    expect.assertions(1);
    const expected: MonitoredEndpoint[] =  [{id: 1, monitoredInterval: 1, url: 'test.com', lastChecked: date, created: date, monitoringResults: [], owner: user, name: 'test'}];
    const data: MonitoredEndpoint[] = await service.getUserEndpoints('test');
    expect(data).toStrictEqual(expected);
});
test('monitored-endpoint-service: create endpoint', async (): Promise<void> => {
    const user: User = {id: 'valid', email: 'test@email.com', accessToken: 'token', endpoints: [], name: 'test'};
    const expected: MonitoredEndpoint =  new MonitoredEndpoint('test', 'test.com', 1, user);
    await service.create(user, 'test','test.com', 1);
    expect(monitoredEndpointRepositoryStub.saved).toStrictEqual(expected);
    expect(monitorServiceStub.added).toStrictEqual(expected);
});
test('monitored-endpoint-service: update endpoint, successful', async (): Promise<void> => {
    const user: User = {id: 'valid', email: 'test@email.com', accessToken: 'token', endpoints: [], name: 'test'};
    const expected: MonitoredEndpoint =  {id: 1, name: 'update', url: 'updated url', monitoredInterval: 4, owner: user, lastChecked: date, created: date, monitoringResults: []};
    const newEndpoint: Partial<MonitoredEndpoint> = {monitoredInterval: 4, name: 'update', url: 'updated url'};
    await service.update(1, newEndpoint, 'valid'  );
    expect(monitoredEndpointRepositoryStub.updated).toStrictEqual(newEndpoint);
    expect(monitorServiceStub.updated).toStrictEqual(expected);
});
test('monitored-endpoint-service: update endpoint, invalid user', async (): Promise<void> => {
        const newEndpoint: Partial<MonitoredEndpoint> = {monitoredInterval: 4, name: 'update', url: 'updated url'};
        await expect(service.update(1, newEndpoint, 'invalid')).rejects.toStrictEqual(new NotAuthorizedError());
});
test('monitored-endpoint-service: update endpoint, not found', async (): Promise<void> => {
    const newEndpoint: Partial<MonitoredEndpoint> = {monitoredInterval: 4, name: 'update', url: 'updated url'};
    await expect(service.update(0, newEndpoint, 'valid')).rejects.toStrictEqual(new NotFoundError( 'Monitored endpoint with id: 0 not found'));
});
test('monitored-endpoint-service: delete endpoint, successful', async (): Promise<void> => {
    const user: User = {id: 'valid', email: 'test@email.com', accessToken: 'token', endpoints: [], name: 'test'};
    const expected: MonitoredEndpoint =  {id: 1, name: 'test', url: 'test.com', monitoredInterval: 1, owner: user, lastChecked: date, created: date, monitoringResults: []};
    await service.delete(1, 'valid' );
    expect(monitoredEndpointRepositoryStub.deleted).toStrictEqual(expected);
    expect(monitorServiceStub.deletedId).toEqual(1);
});
test('monitored-endpoint-service: delete endpoint, invalid user', async (): Promise<void> => {
    await expect(service.delete(1, 'invalid')).rejects.toStrictEqual(new NotAuthorizedError());
});
test('monitored-endpoint-service: delete endpoint, not found', async (): Promise<void> => {
    await expect(service.delete(0,'valid')).rejects.toStrictEqual(new NotFoundError( 'Monitored endpoint with id: 0 not found'));
});

afterAll((): void => {
    global.Date = realDate;
});

