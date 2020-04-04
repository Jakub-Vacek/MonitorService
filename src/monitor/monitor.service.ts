import { MonitoredEndpoint } from '../database/monitored-endpoint';
import { MonitorJob } from './monitor-job.model';
import { HttpService } from '../http';
import { injectable } from 'inversify';
import { DatabaseProvider } from '../database';
/**
 * Class handles monitoring of monitored endpoints
 */
@injectable()
export class MonitorService {
    private readonly jobs: MonitorJob [];
    public constructor(private readonly database: DatabaseProvider,
                       private readonly httpService: HttpService) {
        this.jobs = [];
    }
    public async start(): Promise<void> {
        const endpoints: MonitoredEndpoint [] = await this.database.getMonitoredEndpointRepository().getAll();
        let job: MonitorJob;
        for(const endpoint of endpoints) {
            job = new MonitorJob(endpoint, this.database, this.httpService);
            this.jobs.push(job);
        }
    }
    public addEndpoint(endpoint: MonitoredEndpoint): void {
        this.jobs.push(new MonitorJob(endpoint, this.database, this.httpService));
    }
    public deleteEndpoint(id: number): void {
        const monitorJob: MonitorJob | undefined = this.jobs.find((job: MonitorJob): boolean => job.getId() === id);
        if(monitorJob) {
            monitorJob.stop();
            const index: number = this.jobs.indexOf(monitorJob, 0);
            this.jobs.splice(index,1);
        }
    }
    public updateEndpoint(endpoint: MonitoredEndpoint): void {
        const monitorJob: MonitorJob | undefined = this.jobs.find((job: MonitorJob): boolean => job.getId() === endpoint.id);
        if(monitorJob) {
            monitorJob.update(endpoint);
        }
    }
}
