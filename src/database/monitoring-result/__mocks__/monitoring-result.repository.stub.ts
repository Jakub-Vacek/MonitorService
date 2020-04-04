import { MonitoringResult } from '../monitoring-result.model';

export class MonitoringResultRepositoryStub {
    public saved: MonitoringResult;
    // @ts-ignore
    public async getResults(endpointId: number): Promise<MonitoringResult[]> {
        return [{monitoredEndpoint: undefined, checked: new Date(), id: 1, payload: 'test', statusCode: 200}];
    }
    public async save(monitoringResult: MonitoringResult): Promise<void> {
        this.saved = monitoringResult;
    }
}
