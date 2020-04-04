import { MonitoringResultService } from './monitoring-result.service';
import { DatabaseProviderStub } from '../database/__mocks__/database.provider.stub';
import { DatabaseProvider, MonitoringResult } from '../database';
import { UserRepositoryStub } from '../database/user/__mocks__/user-repository.stub';
import { MonitoredEndpointRepositoryStub } from '../database/monitored-endpoint/__mocks__/monitored-endpoint.repository.stub';
import { MonitoringResultRepositoryStub } from '../database/monitoring-result/__mocks__/monitoring-result.repository.stub';
import { NotAuthorizedError, NotFoundError } from 'restify-errors';

let service: MonitoringResultService;
const realDate: DateConstructor = Date;
const date: Date = new Date();
// @ts-ignore
global.Date = jest.fn((): Date => date);

beforeEach((): void => {
    const userRepositoryStub: UserRepositoryStub = new UserRepositoryStub();
    const monitoredEndpointRepositoryStub: MonitoredEndpointRepositoryStub = new MonitoredEndpointRepositoryStub();
    const monitoringResultRepositoryStub: MonitoringResultRepositoryStub = new MonitoringResultRepositoryStub();
    service = new MonitoringResultService((new DatabaseProviderStub(monitoredEndpointRepositoryStub, monitoringResultRepositoryStub, userRepositoryStub)) as unknown as DatabaseProvider);
});
test('monitoring-result-service: get endpoint results, valid user', async (): Promise<void> => {
    expect.assertions(1);
    const expected: MonitoringResult[] = [{monitoredEndpoint: undefined, checked: date, id: 1, payload: 'test', statusCode: 200}];
    const data: MonitoringResult[] = await service.getEndpointResults(1, 'valid');
    expect(data).toStrictEqual(expected);
});
test('monitoring-result-service: get endpoint results, invalid user', async (): Promise<void> => {
    expect.assertions(1);
    await expect(service.getEndpointResults(1, 'invalid')).rejects.toStrictEqual(new NotAuthorizedError());
});
test('monitoring-result-service: get endpoint results, endpoint not found', async (): Promise<void> => {
    expect.assertions(1);
    await expect(service.getEndpointResults(0, 'valid')).rejects.toStrictEqual(new NotFoundError(`Monitored endpoint with id: ${0} not found`));
});

afterAll((): void => {
    global.Date = realDate;
});
