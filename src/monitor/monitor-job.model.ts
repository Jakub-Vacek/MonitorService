import { MonitoredEndpoint } from '../database/monitored-endpoint';
import logger from '../logger/logger.model';
import { HttpService, IHttpResponse } from '../http';
import { DatabaseProvider, MonitoringResult } from '../database';
import {  } from 'inversify';
/**
 * Class represents monitoring job for one monitored endpoint
 */
export class MonitorJob {
    private readonly boundTask: () => Promise<void>;
    private timeout: NodeJS.Timer | null = null;
    public constructor(private monitoredEndpoint: MonitoredEndpoint,
                       private readonly databaseProvider: DatabaseProvider,
                       private readonly httpService: HttpService) {
        this.boundTask = this.monitor.bind(this);
        // tslint:disable-next-line: no-floating-promises
        this.monitor();
    }
    private async monitor(): Promise<void> {
        try {
            logger.debug(`Monitoring endpoint with id ${this.monitoredEndpoint.id} at interval ${this.monitoredEndpoint.monitoredInterval} s`);
            const response: IHttpResponse = await this.httpService.getResponse(this.monitoredEndpoint.url);
            await this.databaseProvider.getMonitoringResultRepository().save(new MonitoringResult(response.checked, response.status, response.payload, this.monitoredEndpoint));
        } catch (e) {
            logger.error('Failed to process task', e);
        } finally {
            this.timeout = setTimeout(this.boundTask, this.monitoredEndpoint.monitoredInterval * 1000);
        }
    }
    public getId(): number {
        return this.monitoredEndpoint.id;
    }
    public update(newMonitoredEndpoint: MonitoredEndpoint): void {
        this.monitoredEndpoint = newMonitoredEndpoint;
        clearTimeout(this.timeout);
        // tslint:disable-next-line: no-floating-promises
        this.monitor();
    }
    public stop(): void {
        clearTimeout(this.timeout);
    }
}
