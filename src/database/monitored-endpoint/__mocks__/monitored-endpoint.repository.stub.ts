import { User } from '../../user';
import { MonitoredEndpoint } from '../monitored-endpoint.model';

export class MonitoredEndpointRepositoryStub {
    private readonly user: User = {id: 'valid', email: 'test@email.com', accessToken: 'token', endpoints: [], name: 'test'};
    public saved: MonitoredEndpoint;
    public deleted: MonitoredEndpoint;
    public updated: Partial<MonitoredEndpoint>;

    public async getAll(): Promise<MonitoredEndpoint[]> {
        return [{id: 1, monitoredInterval: 1, url: 'test.com', lastChecked: new Date(), created: new Date(), monitoringResults: [], owner: this.user, name: 'test'}];
    }
    // @ts-ignore
    public async getUserEndpoints(userId: string): Promise<MonitoredEndpoint[]> {
        return [{id: 1, monitoredInterval: 1, url: 'test.com', lastChecked: new Date(), created: new Date(), monitoringResults: [], owner: this.user, name: 'test'}];
    }
    public async get(id: number): Promise<MonitoredEndpoint | undefined> {
        if(id === 0) {
            return undefined;
        }
        return {id, monitoredInterval: 1, url: 'test.com', lastChecked: new Date(), created: new Date(), monitoringResults: [], owner: this.user, name: 'test'};
    }
    public async save(monitoredEndpoint: MonitoredEndpoint): Promise<MonitoredEndpoint> {
        this.saved = monitoredEndpoint;
        return monitoredEndpoint;
    }
    public async delete(monitoredEndpoint: MonitoredEndpoint): Promise<void> {
        this.deleted = monitoredEndpoint;
    }
    // @ts-ignore
    public async update(id: number, entity: Partial<MonitoredEndpoint>): Promise<void> {
        this.updated = entity;
    }
}
