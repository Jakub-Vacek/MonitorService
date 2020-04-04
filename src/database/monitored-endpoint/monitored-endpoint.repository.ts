import { AbstractRepository, EntityRepository } from 'typeorm';
import { MonitoredEndpoint } from './monitored-endpoint.model';
@EntityRepository(MonitoredEndpoint)
export class MonitoredEndpointRepository extends AbstractRepository<MonitoredEndpoint>{
    public async getAll(): Promise<MonitoredEndpoint[]> {
        return this.repository.find();
    }
    public async getUserEndpoints(userId: string): Promise<MonitoredEndpoint[]> {
        return this.repository.createQueryBuilder('endpoint')
            .where('endpoint.user_id = :id', { id: userId })
            .getMany();
    }
    public async get(id: number): Promise<MonitoredEndpoint | undefined> {
        return this.repository.findOne({ where: {id}, relations: ['owner']});
    }
    public async save(monitoredEndpoint: MonitoredEndpoint): Promise<MonitoredEndpoint> {
        return  this.repository.save(monitoredEndpoint);
    }
    public async delete(monitoredEndpoint: MonitoredEndpoint): Promise<void> {
        await this.repository.delete(monitoredEndpoint);
    }
    public async update(id: number, entity: Partial<MonitoredEndpoint>): Promise<void> {
        await this.repository.update( id , entity);
    }
}
