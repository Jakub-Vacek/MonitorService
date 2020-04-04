import { MonitoringResult } from '../database/monitoring-result';
import { injectable } from 'inversify';
import { DatabaseProvider, MonitoredEndpoint } from '../database';
import { NotAuthorizedError, NotFoundError } from 'restify-errors';
import logger from '../logger/logger.model';
@injectable()
export class MonitoringResultService {

    public constructor(private readonly database: DatabaseProvider) {}
    public async getEndpointResults(id: number, userId: string): Promise<MonitoringResult[]> {
        logger.debug(`Getting monitoring results of endpoint with id ${id} for user with id: ${userId}`);
        const monitoredEndpoint: MonitoredEndpoint | undefined = await this.database.getMonitoredEndpointRepository().get(id);
        if(!monitoredEndpoint) {
            throw new NotFoundError(`Monitored endpoint with id: ${id} not found`);
        }
        if(monitoredEndpoint.owner.id !== userId) {
            throw new NotAuthorizedError();
        }
        return this.database.getMonitoringResultRepository().getResults(id);
    }
}
