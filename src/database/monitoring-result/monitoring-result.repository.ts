import { AbstractRepository, EntityRepository } from 'typeorm';
import { MonitoringResult } from './monitoring-result.model';

@EntityRepository(MonitoringResult)
export class MonitoringResultRepository extends AbstractRepository<MonitoringResult>{
    public static NUMBER_OF_MONITORING_RESULTS: number = 10;
    public async getResults(endpointId: number): Promise<MonitoringResult[]> {
        return this.repository.createQueryBuilder('result')
            .where('result.endpoint_id = :id', { id: endpointId })
            .orderBy('result.checked', 'DESC')
            .limit(MonitoringResultRepository.NUMBER_OF_MONITORING_RESULTS)
            .getMany();
    }
    public async save(monitoringResult: MonitoringResult): Promise<void> {
        await this.repository.save(monitoringResult);
    }
}
