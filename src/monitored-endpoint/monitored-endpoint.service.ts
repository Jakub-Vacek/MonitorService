import { User } from '../database/user';
import { injectable } from 'inversify';
import { NotAuthorizedError, NotFoundError } from 'restify-errors';
import logger from '../logger/logger.model';
import { MonitorService } from '../monitor';
import { DatabaseProvider, MonitoredEndpoint } from '../database';
@injectable()
export class MonitoredEndpointService {
    public constructor(private readonly database: DatabaseProvider, private readonly monitorService: MonitorService) {
    }
    public async getUserEndpoints(userId: string): Promise<MonitoredEndpoint[]> {
        logger.debug(`Getting monitored endpoints for user with id: ${userId}`);
        return this.database.getMonitoredEndpointRepository().getUserEndpoints(userId);
    }
    public async create(user: User, name: string, url: string, monitoredInterval: number): Promise<void> {
        logger.debug(`Creating new monitored endpoint ${name} for user with id: ${user.id}`);
        const savedMonitoredEndpoint: MonitoredEndpoint = await this.database.getMonitoredEndpointRepository().save(new MonitoredEndpoint(name, url, monitoredInterval, user));
        this.monitorService.addEndpoint(savedMonitoredEndpoint);
    }

    public async update(id: number, newEndpoint: Partial<MonitoredEndpoint>, userId: string): Promise<void> {
        logger.debug(`Updating monitored endpoint with id: ${id}`);
        const oldEndpoint: MonitoredEndpoint | undefined = await this.database.getMonitoredEndpointRepository().get(id);
        if(!oldEndpoint) {
            throw new NotFoundError(`Monitored endpoint with id: ${id} not found`);
        }
        if(oldEndpoint.owner.id !== userId) {
            throw new NotAuthorizedError();
        }
        this.monitorService.updateEndpoint({id,
            monitoredInterval: newEndpoint.monitoredInterval,
            name: newEndpoint.name,
            url: newEndpoint.url,
            owner: oldEndpoint.owner,
            monitoringResults: oldEndpoint.monitoringResults,
            created: oldEndpoint.created,
            lastChecked: oldEndpoint.lastChecked
        });
        await this.database.getMonitoredEndpointRepository().update(id, newEndpoint);
    }
    public async delete(id: number, userId: string): Promise<void> {
        logger.debug(`Deleting monitored endpoint with id: ${id}`);
        const monitoredEndpoint: MonitoredEndpoint | undefined = await this.database.getMonitoredEndpointRepository().get(id);
        if(!monitoredEndpoint) {
            throw new NotFoundError(`Monitored endpoint with id: ${id} not found`);
        }
        if(monitoredEndpoint.owner.id !== userId) {
            throw new NotAuthorizedError();
        }
        this.monitorService.deleteEndpoint(id);
        return this.database.getMonitoredEndpointRepository().delete(monitoredEndpoint);
    }
}
