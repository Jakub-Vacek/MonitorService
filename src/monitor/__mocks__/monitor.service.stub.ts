import { MonitoredEndpoint } from '../../database/monitored-endpoint';

export class MonitorServiceStub {
    public added: MonitoredEndpoint;
    public deletedId: number;
    public updated: MonitoredEndpoint;
    public addEndpoint(endpoint: MonitoredEndpoint): void {
        this.added = endpoint;
    }
    public deleteEndpoint(id: number): void {
        this.deletedId = id;
    }
    public updateEndpoint(endpoint: MonitoredEndpoint): void {
        this.updated = endpoint;
    }
}
