import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MonitoredEndpoint } from '../monitored-endpoint';

/**
 * Class represents monitoring result database model.
 */

@Entity({ name: 'monitoring_results' })
export class MonitoringResult {
    @PrimaryGeneratedColumn({ name: 'id'})
    public readonly id!: number;
    @Column({ name: 'checked', type: 'datetime', precision: 3, nullable: false })
    public readonly checked: Date;
    @Column({ name: 'status_code', type: 'integer', nullable: false })
    public readonly statusCode: number;
    @Column({ name: 'payload', nullable: false })
    public readonly payload: string;
    @JoinColumn({ referencedColumnName: 'id', name: 'endpoint_id' })
    @ManyToOne(
        (): typeof MonitoredEndpoint => MonitoredEndpoint,
        (entity: MonitoredEndpoint): MonitoringResult[] => entity.monitoringResults
    )
    public readonly monitoredEndpoint: MonitoredEndpoint;

    public constructor(checked: Date, statusCode: number, payload: string, monitoredEndpoint: MonitoredEndpoint) {
        this.checked = checked;
        this.statusCode = statusCode;
        this.payload = payload;
        this.monitoredEndpoint = monitoredEndpoint;
    }
}
